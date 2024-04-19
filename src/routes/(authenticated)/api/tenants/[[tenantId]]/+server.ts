import { z } from 'zod';
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
import { Role } from '@prisma/client';
import { zod } from 'sveltekit-superforms/adapters';
import type { RequestHandler } from '@sveltejs/kit';
import { actionResult } from 'sveltekit-superforms';
import { superValidate } from 'sveltekit-superforms/server';

const fixSchema = z.object({
	ownerId: z.number().optional(),
	name: z.string(),
	email: z.string().email(),
	id: z.number().optional()
});

export const GET: RequestHandler = async () => {
	const tenants = await listTenants();
	return new Response(JSON.stringify(tenants), { status: 200 });
};

export const POST: RequestHandler = async ({ request, params }) => {
	const adminTenant = await getAdminTenant();
	const allAdminTenantUsers = adminTenant
		? await listTenantUsersOnTenant({ tenantId: adminTenant.id })
		: [];
	
	const form = await superValidate(request, zod(fixSchema));
	if (!form.valid) {
		console.log('validation fail');
		return actionResult('failure', { form }, { status: 400 });
	}

	if (params.tenantId) {
		await updateTenant({
			tenantId: parseInt(params.tenantId),
			name: form.data.name,
			email: form.data.email
		});
		const oldOwner = await getTenantOwner({ tenantId: parseInt(params.tenantId) });
		const tenantUserToBeOwner = await getTenantUser({ tenantUserId: form.data.ownerId });
		if (oldOwner?.id !== tenantUserToBeOwner?.id) {
			await updateTenantUser({
				//@ts-expect-error It's detecting it as undefined
				tenantUserId: oldOwner?.id,
				//@ts-expect-error It's detecting it as undefined
				email: oldOwner?.user.email,
				userRole: Role.ADMIN
			});
		}
		await updateTenantUser({
			//@ts-expect-error It's detecting it as undefined
			tenantUserId: tenantUserToBeOwner?.id,
			//@ts-expect-error It's detecting it as undefined
			email: tenantUserToBeOwner?.user.email,
			userRole: Role.OWNER
		});
	} else {
		const newTenant = await createTenant({ name: form.data.name, email: form.data.email });
		for (const user of allAdminTenantUsers) {
			if (user.user.email !== null) {
				await createTenantUser({
					tenantId: newTenant.id,
					email: user.user.email,
					userRole: Role.ADMIN
				});
			}
		}
	}
	return actionResult('success', { form }, { status: 200 });
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		await deleteTenant({ tenantId: parseInt(params.tenantId || '0', 10) });
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response('Deletion failed', { status: 400 });
	}
};