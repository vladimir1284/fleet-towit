/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from 'zod';
import { getPlateById } from '$lib/actions/plates';
import type { RequestHandler } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms/server';
import {
	getAllContracts,
	getContract,
	createContract,
	updateContract,
	deleteContract,
	getContractByDateRange
} from '$lib/actions/contracts';

const fixSchema = z.object({
	clientId: z.number(),
	rentalPlanId: z.number(),
	vehicleId: z.number(),
	id: z.number().optional()
});

export const GET: RequestHandler = async ({ locals, params, url }) => {
	let response: any;
	let isAdmin: boolean = false;
	const session = await locals.getSession();

	if ((session?.user as any)?.defaultTenantUser?.role == 'ADMIN') {
		isAdmin = true;
	}

	const searchDate = url.searchParams.get('search_date') || 'undefined';
	const _plateId = url.searchParams.get('plate_id') || 'undefined';

	if (params.contractId) {
		response = await getContract(locals.currentInstance.currentPrismaClient, {
			contractId: parseInt(params.contractId)
		});
	} else if (searchDate !== 'undefined' && _plateId !== 'undefined') {
		const date = new Date(searchDate);
		const plateId = parseInt(_plateId);
		const plate = await getPlateById(locals.currentInstance.currentPrismaClient, { id: plateId });
		let contract = null;
		if (plate) {
			contract = await getContractByDateRange(locals.currentInstance.currentPrismaClient, {
				vehicleId: plate.vehicle.id,
				date
			});
		}

		if (contract == null) {
			return new Response(JSON.stringify({ message: 'no_data' }), { status: 404 });
		} else {
			return new Response(JSON.stringify(contract), { status: 200 });
		}
	} else {
		response = await getAllContracts(locals.currentInstance.currentPrismaClient, isAdmin);
	}

	return new Response(JSON.stringify(response), { status: 200 });
};

export const POST: RequestHandler = async ({ locals, request, params }) => {
	const form = await superValidate(request, zod(fixSchema));
	if (!form.valid) {
		console.log('validation fail');
		return actionResult('failure', { form }, { status: 400 });
	}

	if (params.contractId) {
		await updateContract(locals.currentInstance.currentPrismaClient, {
			id: parseInt(params.contractId || '0', 10),
			clientId: form.data.clientId,
			rentalPlanId: form.data.rentalPlanId,
			vehicleId: form.data.vehicleId
		});
	} else {
		await createContract(locals.currentInstance.currentPrismaClient, {
			clientId: form.data.clientId,
			rentalPlanId: form.data.rentalPlanId,
			vehicleId: form.data.vehicleId
		});
	}
	return actionResult('success', { form }, { status: 200 });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	try {
		await deleteContract(locals.currentInstance.currentPrismaClient, {
			id: parseInt(params.contractId || '0', 10)
		});
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response('Deletion failed', { status: 400 });
	}
};