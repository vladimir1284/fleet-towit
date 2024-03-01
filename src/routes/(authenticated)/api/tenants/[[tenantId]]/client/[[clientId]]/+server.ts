import { z } from "zod";
import type { RequestHandler } from "@sveltejs/kit";
import { actionResult, superValidate } from "sveltekit-superforms/server";
import { listClients, createClient, updateClient, deleteClient } from "$lib/actions/clients";

const fixSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	phoneNumber: z.string(),
	tenantId: z.number(),
	id: z.number().optional()
});


export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
	const clients = await listClients();

	return new Response(JSON.stringify(clients), { status: 200 })
}


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

	if (params.clientId) {
		await updateClient({
			id: parseInt(params.clientId || '0', 10),
			name: form.data.name,
			email: form.data.email,
			tenantId: form.data.tenantId,
			phoneNumber: form.data.phoneNumber
		})
	} else {
		await createClient({
			name: form.data.name,
			email: form.data.email,
			tenantId: parseInt(params.tenantId || '0', 10),
			phoneNumber: form.data.phoneNumber
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
		await deleteClient({ id: parseInt(params.clientId || '0', 10) });
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response('Deletion failed', { status: 400 });
	}
};