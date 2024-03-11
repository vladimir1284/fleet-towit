import { z } from "zod";
import type { RequestHandler } from "@sveltejs/kit";
import { actionResult, superValidate } from "sveltekit-superforms/server";
import { createToll, deleteToll, listTollsByContractId, updateToll, listTolls } from "$lib/actions/tolls";
import { getContractByDateRange } from "$lib/actions/contracts";
import { minioClient } from "$lib/minio";

const tollSchema = z.object({
    amount: z.number().gte(0),
    vehicleId: z.number(),
    contractId: z.number(),
    stage: z.enum(['PAID', 'UNPAID']),
    invoice: z.string().optional(),
    invoiceNumber: z.string().optional(),
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
    const form = await superValidate(formData, tollSchema);
    const file = formData.get('fileData');
    console.log('FORM ON SERVER: ', form)
    if (form.valid) {
        let toll
        const contract = await getContractByDateRange({vehicleId: form.data.vehicleId, date: form.data.createDate})
        form.data.contractId = contract?.id || NaN
        if (!params.tollId) {
            toll = await createToll({
                amount: form.data.amount,
                vehicleId: form.data.vehicleId,
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
                vehicleId: form.data.vehicleId,
                contractId: form.data.contractId,
                stage: form.data.stage,
                createDate: form.data.createDate,
                invoice: form.data.invoice,
                invoiceNumber: form.data.invoiceNumber,
                note: form.data.note,
            })
        }
        if (file instanceof File) {
            const buff = Buffer.from(await file.arrayBuffer());
            if (file.size) {
                console.log('start upload');
                await minioClient
                    .putObject('develop', `/contracts/${form.data.contractId}/tolls/${toll.id}/${file.name}`, buff)
                    .catch((e) => {
                        console.log('error re loco', e);
                    })
                    .finally(async () => {
                        console.log('finished');
                    });
            }
        }
        return actionResult('success', { form }, { status: 200 })
    } else {
        return actionResult('failure', { form }, { status: 400 })
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