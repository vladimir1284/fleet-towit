import { z } from 'zod';
import type { RequestHandler } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';
import { actionResult } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms/server';
import { updateContractStage, getPreviousStage } from '$lib/actions/contracts';

const stageSchema = z.object({
	date: z.date().optional(),
	reason: z.string().optional(),
	comments: z.string().optional(),
	stage: z.enum(['PENDING', 'ACTIVE', 'ENDED', 'DISMISS']),
	id: z.number().optional()
});

export const GET: RequestHandler = async ({ locals, params }) => {
	if (params.contractId) {
		const stages = await getPreviousStage(locals.currentInstance.currentPrismaClient, {
			contractId: parseInt(params.contractId)
		});
		return new Response(JSON.stringify(stages));
	} else {
		return new Response('Invalid contractId', { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request, params, locals }) => {
	const form = await superValidate(request, zod(stageSchema));
	if (!form.valid) {
		console.log('validation fail', form);
		return actionResult('failure', { form }, { status: 400 });
	}
	if (params.contractId) {
		await updateContractStage(locals.currentInstance.currentPrismaClient, {
			id: parseInt(params.contractId || '0', 10),
			date: new Date(Date.now()),
			reason: form.data.reason,
			comments: form.data.comments,
			stage: form.data.stage
		});
	}
	return actionResult('success', { form }, { status: 200 });
};
