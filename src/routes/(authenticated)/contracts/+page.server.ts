import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types.js';
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

export const load = (async () => {
	const form = await superValidate(zod(fixSchema));
	const stageForm = await superValidate(zod(stageSchema));
	const clientform = await superValidate(zod(clientSchema));

	return { form: form, stageForm: stageForm, clientForm: clientform };
}) satisfies PageServerLoad;
