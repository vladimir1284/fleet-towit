import { z } from 'zod';
import type { RequestHandler } from '@sveltejs/kit';
import { actionResult, superValidate } from 'sveltekit-superforms/server';
import {
	listRentalPlans,
	createRentalPlan,
	updateRentalPlan,
	deleteRentalPlan
} from '$lib/actions/rental-plans';

const fixSchema = z.object({
	name: z.string(),
	amount: z.number(),
	periodicity: z.enum(['WEEKLY', 'BIWEEKLY', 'MONTHLY']),
	id: z.number().optional()
});

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
	const rentalPlans = await listRentalPlans();

	return new Response(JSON.stringify(rentalPlans), { status: 200 });
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

	if (params.rentalPlanId) {
		await updateRentalPlan({
			id: parseInt(params.rentalPlanId || '0', 10),
			name: form.data.name,
			amount: form.data.amount,
			periodicity: form.data.periodicity
		});
	} else {
		await createRentalPlan({
			name: form.data.name,
			amount: form.data.amount,
			periodicity: form.data.periodicity
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
		await deleteRentalPlan({ id: parseInt(params.rentalPlanId || '0', 10) });
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response('Deletion failed', { status: 400 });
	}
};
