/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import type { RequestHandler } from "@sveltejs/kit";
import { zod } from "sveltekit-superforms/adapters";
import { actionResult } from "sveltekit-superforms";
import { superValidate } from "sveltekit-superforms/server";
import { getAllContracts, getContract, createContract, updateContract, deleteContract, getContractByDateRange } from "$lib/actions/contracts";

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

	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
	if ((session?.user as any)?.defaultTenantUser?.role == 'ADMIN') {
		isAdmin = true
	}

	const searchDate = url.searchParams.get('search_date') || 'undefined';
	const _vehicleId = url.searchParams.get('vehicle_id') || 'undefined';

	if (params.contractId) {
		response = await getContract({ contractId: parseInt(params.contractId) });
	} else if (searchDate !== 'undefined' && _vehicleId !== 'undefined' ) {

        const date = new Date(searchDate);
        const vehicleId = parseInt(_vehicleId)
        const contract = await getContractByDateRange({vehicleId, date})

		if (contract == null){
			return new Response(JSON.stringify({message: 'no_data'}), {status: 404})
		}else{
			return new Response(JSON.stringify(contract), {status: 200})
		}
	} else {
		response = await getAllContracts(isAdmin);
	}

	return new Response(JSON.stringify(response), { status: 200 })
}


export const POST: RequestHandler = async ({ locals, request, params }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}

	const form = await superValidate(request, zod(fixSchema));
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
		})
	} else {
		await createContract({
			clientId: form.data.clientId,
			rentalPlanId: form.data.rentalPlanId,
			vehicleId: form.data.vehicleId
		})
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