/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import type { RequestHandler } from '@sveltejs/kit';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import {
	getAllContracts,
	getContract,
	createContract,
	updateContract,
	deleteContract
} from '$lib/actions/contracts';

const fixSchema = z.object({
	clientId: z.number(),
	rentalPlanId: z.number(),
	vehicleId: z.number(),
	id: z.number().optional()
});

export const GET: RequestHandler = async ({ locals, params }) => {
	let response: any;
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
	if (params.contractId) {
		response = await getContract({ contractId: parseInt(params.contractId) });
	} else {
		response = await getAllContracts();
	}

	return new Response(JSON.stringify(response), { status: 200 });
};

export const POST: RequestHandler = async ({ locals, request, params }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}

	const form = await superValidate(request, fixSchema);
	if (!form.valid) {
		console.log('validation fail');
		return actionResult('failure', { form }, { status: 400 });
	}

	if (params.contractId) {
		await updateContract({
			id: parseInt(params.contractId || '0', 10),
			clientId: form.data.clientId,
			rentalPlanId: form.data.rentalPlanId,
			vehicleId: form.data.vehicleId
		});
	} else {
		await createContract({
			clientId: form.data.clientId,
			rentalPlanId: form.data.rentalPlanId,
			vehicleId: form.data.vehicleId
		});
	}
	return actionResult('success', { form }, { status: 200 });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
	try {
		await deleteContract({ id: parseInt(params.contractId || '0', 10) });
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response('Deletion failed', { status: 400 });
	}
};
