import { z } from "zod";
import { minioClient } from "$lib/minio";
import type { $Enums } from "@prisma/client";
import { zod } from "sveltekit-superforms/adapters";
import { actionResult } from "sveltekit-superforms";
import type { RequestHandler } from "@sveltejs/kit";
import { getContractByDateRange } from "$lib/actions/contracts";
import { setError, superValidate } from "sveltekit-superforms/server";
import { createToll, deleteToll, listTollsByContractId, updateToll, listTolls } from "$lib/actions/tolls";
import { getPlateById } from "$lib/actions/plates";

const tollSchema = z.object({
    amount: z.number().gte(0),
    plateId: z.number(),
    contractId: z.number(),
    stage: z.enum(['PAID', 'UNPAID']),
    invoice: z.string().optional(),
    invoiceNumber: z.string().min(1),
    createDate: z.date(),
    note: z.string().optional()
})


export const GET: RequestHandler = async ({ locals, params }) => {
    const session = await locals.getSession();
    if (!session?.user) {
        return new Response('Forbidden', { status: 403 });
    }
    let contractId

    if (!params.contractId) {
        const tolls = await listTolls();
        return new Response(JSON.stringify(tolls), { status: 200 })
    } else {
        try {
            contractId = parseInt(params?.contractId || '')
        } catch {
            return new Response('invalid contractId', { status: 400 })
        }
        const tolls = await listTollsByContractId({ contractId })
        return new Response(JSON.stringify(tolls), { status: 200 })

    }
}

export const POST: RequestHandler = async ({ locals, request, params }) => {
    const session = await locals.getSession();
    if (!session?.user) {
        return new Response('Forbidden', { status: 403 });
    }
    const formData = await request.formData();
    console.log('FORMDATA', formData)
    const form = await superValidate(formData, zod(tollSchema));
    const file = formData.get('fileData');
    console.log('FORM', form)
    if (form.valid) {
        let toll: { contractId: number; id: number; plateId: number; note: string | null; amount: number; stage: $Enums.TollDueStage; invoice: string | null; invoiceNumber: string | null; createDate: Date; };
        const plate = await getPlateById({id: form.data.plateId});
        const contract = await getContractByDateRange({vehicleId: plate?.vehicleId || 0, date: form.data.createDate})
        form.data.contractId = contract?.id || NaN
        if (!params.tollId) {
            toll = await createToll({
                amount: form.data.amount,
                plateId: form.data.plateId,
                contractId: form.data.contractId,
                stage: form.data.stage,
                createDate: form.data.createDate,
                invoice: form.data.invoice,
                invoiceNumber: form.data.invoiceNumber,
                note: form.data.note
            })

        } else {
            toll = await updateToll({
                id: parseInt(params.tollId),
                amount: form.data.amount,
                plateId: form.data.plateId,
                contractId: form.data.contractId,
                stage: form.data.stage,
                createDate: form.data.createDate,
                invoice: form.data.invoice,
                invoiceNumber: form.data.invoiceNumber,
                note: form.data.note,
            })
        }

        try{

            if (file instanceof File) {
                const buff = Buffer.from(await file.arrayBuffer());
                if (file.size) {
                    console.log('start upload');
                    await minioClient
                    .putObject('develop', `/contracts/${form.data.contractId}/tolls/${toll.id}/${file.name}`, buff);
                    return actionResult('success', { form }, { status: 200 })
                }else {
                    return actionResult('success', { form }, { status: 200 })
                }
            } else {
                return actionResult('success', { form }, { status: 200 })
            }
        }catch {
            await deleteToll({id: toll.id});
            setError(form, 'Error sending the file')
            form.valid = false
            return actionResult('failure', { form }, {status: 400})
        }

    } else {
        return actionResult('failure', { form }, {status: 400})
    }
}

export const DELETE: RequestHandler = async ({ locals, params }) => {
    const session = await locals.getSession();
    if (!session?.user) {
        return new Response('Forbidden', { status: 403 });
    }
    if (!params.tollId) {
        return new Response('Invalid tollId', { status: 400 });
    }
    await deleteToll({ id: parseInt(params.tollId) })
    return new Response('sucess', { status: 200 })
}