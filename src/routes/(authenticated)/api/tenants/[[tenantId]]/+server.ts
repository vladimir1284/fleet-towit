import type { RequestHandler } from '@sveltejs/kit';
import { actionResult } from 'sveltekit-superforms/server';
import { listTenants, deleteTenant, updateTenant, createTenant } from '$lib/actions/admin';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';

const fixSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	id: z.string().optional()
});

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
	const tenants = await listTenants();
	return new Response(JSON.stringify(tenants), { status: 200 });
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

	if (params.tenantId) {
		await updateTenant({ tenantId: params.tenantId, name: form.data.name, email: form.data.email });
	} else {
		await createTenant({ name: form.data.name, email: form.data.email });
	}
	return actionResult('success', { form }, { status: 200 });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
	try {
		await deleteTenant({ tenantId: params.tenantId || '' });
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response('Deletion failed', { status: 400 });
	}
};
