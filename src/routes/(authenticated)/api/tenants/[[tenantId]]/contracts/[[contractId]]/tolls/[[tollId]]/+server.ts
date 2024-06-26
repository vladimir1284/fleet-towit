import { z } from 'zod';
import { minioClient } from '$lib/minio';
import type { $Enums } from '@prisma/client';
import { getPlateById } from '$lib/actions/plates';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult } from 'sveltekit-superforms';
import type { RequestHandler } from '@sveltejs/kit';
import { getContractByDateRange } from '$lib/actions/contracts';
import { setError, superValidate } from 'sveltekit-superforms/server';
import {
	createToll,
	deleteToll,
	listTollsByContractId,
	updateToll,
	listTolls
} from '$lib/actions/tolls';

const tollSchema = z.object({
	amount: z.number().gte(0),
	plateId: z.number(),
	contractId: z.number(),
	stage: z.enum(['PAID', 'UNPAID']),
	invoice: z.string().optional(),
	invoiceNumber: z.string().min(1),
	createDate: z.date(),
	note: z.string().optional()
});

export const GET: RequestHandler = async ({ locals, params }) => {
	let contractId;

	if (!params.contractId) {
		const tolls = await listTolls(locals.currentInstance.currentPrismaClient);
		return new Response(JSON.stringify(tolls), { status: 200 });
	} else {
		try {
			contractId = parseInt(params?.contractId || '');
		} catch {
			return new Response('invalid contractId', { status: 400 });
		}
		const tolls = await listTollsByContractId(locals.currentInstance.currentPrismaClient, {
			contractId
		});
		return new Response(JSON.stringify(tolls), { status: 200 });
	}
};

export const POST: RequestHandler = async ({ locals, request, params }) => {
	const formData = await request.formData();
	const form = await superValidate(formData, zod(tollSchema));
	const file = formData.get('fileData');
	if (form.valid) {
		let toll: {
			contractId: number;
			id: number;
			plateId: number;
			note: string | null;
			amount: number;
			stage: $Enums.TollDueStage;
			invoice: string | null;
			invoiceNumber: string | null;
			createDate: Date;
		};
		const plate = await getPlateById(locals.currentInstance.currentPrismaClient, {
			id: form.data.plateId
		});
		const contract = await getContractByDateRange(locals.currentInstance.currentPrismaClient, {
			vehicleId: plate?.vehicleId || 0,
			date: form.data.createDate
		});
		form.data.contractId = contract?.id || NaN;
		if (!params.tollId) {
			toll = await createToll(locals.currentInstance.currentPrismaClient, {
				amount: form.data.amount,
				plateId: form.data.plateId,
				contractId: form.data.contractId,
				stage: form.data.stage,
				createDate: form.data.createDate,
				invoice: form.data.invoice,
				invoiceNumber: form.data.invoiceNumber,
				note: form.data.note
			});
		} else {
			toll = await updateToll(locals.currentInstance.currentPrismaClient, {
				id: parseInt(params.tollId),
				amount: form.data.amount,
				plateId: form.data.plateId,
				contractId: form.data.contractId,
				stage: form.data.stage,
				createDate: form.data.createDate,
				invoice: form.data.invoice,
				invoiceNumber: form.data.invoiceNumber,
				note: form.data.note
			});
		}

		try {
			if (file instanceof File) {
				const buff = Buffer.from(await file.arrayBuffer());
				if (file.size) {
					console.log('start upload');
					await minioClient.putObject(
						'develop',
						`/contracts/${form.data.contractId}/tolls/${toll.id}/${file.name}`,
						buff
					);
					return actionResult('success', { form }, { status: 200 });
				} else {
					return actionResult('success', { form }, { status: 200 });
				}
			} else {
				return actionResult('success', { form }, { status: 200 });
			}
		} catch {
			await deleteToll(locals.currentInstance.currentPrismaClient, { id: toll.id });
			setError(form, 'Error sending the file');
			form.valid = false;
			return actionResult('failure', { form }, { status: 400 });
		}
	} else {
		return actionResult('failure', { form }, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (!params.tollId) {
		return new Response('Invalid tollId', { status: 400 });
	}
	await deleteToll(locals.currentInstance.currentPrismaClient, { id: parseInt(params.tollId) });
	return new Response('sucess', { status: 200 });
};