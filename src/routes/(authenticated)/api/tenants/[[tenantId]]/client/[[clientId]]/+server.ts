import { z } from 'zod';
import type { RequestHandler } from '@sveltejs/kit';
import { actionResult } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import { listClients, createClient, updateClient, deleteClient } from '$lib/actions/clients';

const fixSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phoneNumber: z.string(),
	tenantId: z.number(),
	id: z.number().optional()
});

export const GET: RequestHandler = async ({ locals }) => {
	const clients = await listClients(locals.currentInstance.currentPrismaClient);

	return new Response(JSON.stringify(clients), { status: 200 });
};

export const POST: RequestHandler = async ({ locals, request, params }) => {

	const form = await superValidate(request, zod(fixSchema));
	if (!form.valid) {
		console.log('validation fail');
		return actionResult('failure', { form }, { status: 400 });
	}

	if (params.clientId) {
		await updateClient(locals.currentInstance.currentPrismaClient, {
			id: parseInt(params.clientId || '0', 10),
			name: form.data.name,
			email: form.data.email,
			tenantId: form.data.tenantId,
			phoneNumber: form.data.phoneNumber
		});
	} else {
		await createClient(locals.currentInstance.currentPrismaClient, {
			name: form.data.name,
			email: form.data.email,
			tenantId: parseInt(params.tenantId || '0', 10),
			phoneNumber: form.data.phoneNumber
		});
	}
	return actionResult('success', { form }, { status: 200 });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	try {
		await deleteClient(locals.currentInstance.currentPrismaClient, {
			id: parseInt(params.clientId || '0', 10)
		});
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response('Deletion failed', { status: 400 });
	}
};
