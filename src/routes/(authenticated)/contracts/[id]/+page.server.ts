import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { getContract } from '$lib/actions/contracts';

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

export const load = (async ({ locals, params }) => {
	const contract = await getContract(locals.currentInstance.currentPrismaClient, {
		contractId: parseInt(params.id)
	});

	const form = await superValidate(zod(fixSchema));
	const stageForm = await superValidate(zod(stageSchema));
	const clientForm = await superValidate(zod(clientSchema));

	return {
		form,
		stageForm,
		clientForm,
		contract
	};
}) satisfies PageServerLoad;
