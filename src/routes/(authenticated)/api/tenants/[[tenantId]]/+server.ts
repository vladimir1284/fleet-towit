import type { RequestHandler } from '@sveltejs/kit';
import { actionResult } from 'sveltekit-superforms/server';
import {
	listTenants,
	deleteTenant,
	updateTenant,
	createTenant,
	getAdminTenant,
	listTenantUsersOnTenant,
	createTenantUser,
	updateTenantUser,
	getTenantUser,
	getTenantOwner
} from '$lib/actions/admin';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { Role } from '@prisma/client';

const fixSchema = z.object({
	ownerId: z.string().optional(),
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
	const adminTenant = await getAdminTenant();
	const allAdminTenantUsers = adminTenant ? await listTenantUsersOnTenant({ tenantId: adminTenant.id }) : [];
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
		const oldOwner = await getTenantOwner({ tenantId: params.tenantId })
		const tenantUserToBeOwner = await getTenantUser({ tenantUserId: form.data.ownerId });
		console.log(oldOwner)
		if (oldOwner?.id !== tenantUserToBeOwner?.id) {
			//@ts-expect-error It's detecting it as undefined
			await updateTenantUser({ tenantUserId: oldOwner?.id, email: oldOwner?.user.email, userRole: Role.ADMIN })
		}
		//@ts-expect-error It's detecting it as undefined
		await updateTenantUser({ tenantUserId: tenantUserToBeOwner?.id, email: tenantUserToBeOwner?.user.email, userRole: Role.OWNER })
	} else {
		const newTenant = await createTenant({ name: form.data.name, email: form.data.email });
		for (const user of allAdminTenantUsers) {
			if (user.user.email !== null) {
				await createTenantUser({ tenantId: newTenant.id, email: user.user.email, userRole: Role.ADMIN });
			}
		}
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
