import { error } from '@sveltejs/kit';
import { loadFromSessionStorage } from '$lib/store/context-store';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const fixSchema = z.object({
	clientId: z.number(),
	rentalPlanId: z.number(),
	vehicleId: z.number(),
	id: z.number().optional()
});

const stageSchema = z.object({
	date: z.date(),
	reason: z.string().optional(),
	comments: z.string().optional(),
	stage: z.enum(['PENDING', 'ACTIVE', 'ENDED', 'DISMISS']),
	id: z.number().optional()
});

const clientSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phoneNumber: z.string(),
	tenantId: z.number(),
	id: z.number().optional()
});

export const load = (async ({ params, fetch }) => {
	const currentTenant = loadFromSessionStorage('currentTenant');
	const headers = { 'X-User-Tenant': currentTenant.currentUserTenant.id };
	const contract_id = params.id;
	let contract;

	const form = await superValidate(zod(fixSchema));
	const stageForm = await superValidate(zod(stageSchema));
	const clientform = await superValidate(zod(clientSchema));

	if (!contract_id) throw error(404, { message: 'Contract not found' });

	try {
		const response = await fetch(`/api/tenants/${currentTenant.id}/contracts/${contract_id}`, {
			headers
		});

		if (!response.ok) throw new Error('Invalid Contract');

		const { client, vehicle, stage, rentalPlan } = await response.json();
		contract = {
			client,
			vehicle,
			stage,
			rentalPlan
		};
	} catch (e) {
		throw error(404, { message: 'Contract not found' });
	}

	return {
		params: {
			id: params.id
		},
		contract: {
			id: params.id,
			...contract
		},
		form,
		stageForm,
		clientform
	};
}) satisfies PageServerLoad;
