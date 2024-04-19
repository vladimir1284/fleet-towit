import { z } from 'zod';
import {
	listTenantUsers,
	createTenantUser,
	updateTenantUser,
	updateDefaultTenantUser,
	deleteTenantUser
} from '$lib/actions/tenantUsers';
import { Role } from '@prisma/client';
import { bypassPrisma } from '$lib/prisma';
import { zod } from 'sveltekit-superforms/adapters';
import type { RequestHandler } from '@sveltejs/kit';
import { sendWelcomeEmail } from '$lib/actions/emails';
import { actionResult } from 'sveltekit-superforms/server';
import { superValidate } from 'sveltekit-superforms/server';

const fixSchema = z.object({
	role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
	email: z.string().email(),
	tenantId: z.number(),
	id: z.number().optional()
});

export const GET: RequestHandler = async ({ locals, params }) => {
	const users = await listTenantUsers(locals.currentInstance.currentPrismaClient, {
		tenantId: parseInt(params.tenantId)
	});
	return new Response(JSON.stringify(users), { status: 200 });
};

export const POST: RequestHandler = async ({ locals, params, request, url }) => {
	const formData = await request.formData();
	const form = await superValidate(formData, zod(fixSchema));
	if (!form.valid) {
		console.log('validation fail');
		return actionResult('failure', { form }, { status: 400 });
	}

	if (!params.userId) {
		await createTenantUser(locals.currentInstance.currentPrismaClient, {
			tenantId: form.data.tenantId,
			email: form.data.email,
			role: Role[form.data.role]
		});

		const tenant = await bypassPrisma.tenant.findUnique({ where: { id: form.data.tenantId } });
		await sendWelcomeEmail(form.data.email, tenant?.name ?? '', form.data.role, url.origin);
	} else {
		await updateTenantUser(locals.currentInstance.currentPrismaClient, {
			id: parseInt(params.userId, 10),
			tenantId: form.data.tenantId,
			email: form.data.email,
			role: Role[form.data.role]
		});
	}
	return actionResult('success', { form }, { status: 200 });
};

export const PATCH: RequestHandler = async ({ locals, request }) => {
	const formData = await request.formData();
	const currentUserData = locals.currentInstance.currentTenantUser;
	const tenantUserId = parseInt(formData.get('tenantUserId') as string, 10);
	const isDefault = formData.get('is_default') === 'true';

	const tenantUser = await updateDefaultTenantUser(locals.currentInstance.currentPrismaClient, {
		id: tenantUserId,
		//@ts-expect-error currenUserData is not string
		tenantId: currentUserData?.tenant.id,
		isDefault
	});
	return new Response(JSON.stringify(tenantUser), { status: 200 });
};

export const DELETE: RequestHandler = async ({ locals, params }) => {
	if (params.userId) {
		await deleteTenantUser(locals.currentInstance.currentPrismaClient, {
			id: parseInt(params.userId)
		});
		return new Response('Success', { status: 200 });
	} else {
		return new Response('Invalid userId', { status: 400 });
	}
};
