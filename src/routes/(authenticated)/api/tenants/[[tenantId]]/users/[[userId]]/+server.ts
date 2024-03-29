import { createTenantUser, deleteUser, getAdminTenant, updateTenantUser } from '$lib/actions/admin';
import { superValidate } from 'sveltekit-superforms/server';
import { actionResult } from 'sveltekit-superforms/server';
import { bypassPrisma, tenantPrisma } from '$lib/prisma';
import { sendWelcomeEmail } from '$lib/actions/emails';
import type { RequestHandler } from '@sveltejs/kit';
import { Role } from '@prisma/client';
import { z } from 'zod';

let currentPrisma;
const fixSchema = z.object({
	role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
	email: z.string().email(),
	tenantId: z.number(),
	id: z.number().optional()
});

export const GET: RequestHandler = async ({ params, locals, request }) => {
	let users;
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}

	//@ts-expect-error Error on tenantUser wich exists but is not detected
	const currentUserData = session.user.tenantUsers.find(
		//@ts-expect-error _user is a tenantUser instance
		(_user) => _user.id == request.headers.get('X-User-Tenant')
	);
	const adminTenant = await getAdminTenant();
	if (currentUserData.tenant.id == adminTenant?.id) {
		currentPrisma = bypassPrisma;
		users = await currentPrisma.tenantUser.findMany({
			include: {
				tenant: true,
				user: true
			}
		});
	} else {
		currentPrisma = tenantPrisma(currentUserData.tenant.id);
		users = await currentPrisma.tenantUser.findMany({
			where: { tenantId: parseInt(params.tenantId || '0', 10) },
			include: {
				tenant: true,
				user: true
			}
		});
	}

	if (currentUserData.role === Role.STAFF && !(currentUserData.tenant.id == adminTenant?.id)) {
		return new Response('Forbiden', { status: 403 });
	} else {
		return new Response(JSON.stringify(users), { status: 200 });
	}
};

export const POST: RequestHandler = async ({ params, locals, request }) => {
	const formData = await request.formData();
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}

	//@ts-expect-error Error on tenantUser wich exists but is not detected
	const currentUserData = session.user.tenantUsers.find(
		(_user: { id: number | null }) => _user.id == request.headers.get('X-User-Tenant')
	);
	const adminTenant = await getAdminTenant();
	if (currentUserData.tenant.id == adminTenant?.id) {
		console.log('Using admin prisma');
		currentPrisma = bypassPrisma;
	} else {
		console.log('Using normal prisma');
		currentPrisma = tenantPrisma(currentUserData.tenant.id);
	}

	const form = await superValidate(formData, fixSchema);
	if (!form.valid) {
		console.log('validation fail');
		return actionResult('failure', { form }, { status: 400 });
	}

	if (!params.userId) {
		await createTenantUser({
			tenantId: form.data.tenantId,
			email: form.data.email,
			userRole: Role[form.data.role]
		});
		const tenant = await bypassPrisma.tenant.findUnique({ where: { id: form.data.tenantId } });
		await sendWelcomeEmail(form.data.email, tenant?.name ?? '', form.data.role);
	} else {
		await updateTenantUser({
			tenantUserId: parseInt(params.userId, 10),
			tenantId: form.data.tenantId,
			email: form.data.email,
			userRole: Role[form.data.role]
		});
	}
	return actionResult('success', { form }, { status: 200 });
};

export const PATCH: RequestHandler = async ({ locals, request }) => {
	const formData = await request.formData();
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
	//@ts-expect-error Error on tenantUser wich exists but is not detected
	const currentUserData = session.user.tenantUsers.find(
		(_user: { id: number | null }) => _user.id == request.headers.get('X-User-Tenant')
	);
	const adminTenant = await getAdminTenant();
	if (currentUserData.tenant.id == adminTenant?.id) {
		console.log('Using admin prisma');
		currentPrisma = bypassPrisma;
	} else {
		console.log('Using normal prisma');
		currentPrisma = tenantPrisma(currentUserData.tenant.id);
	}
	const tenantUserId = parseInt(formData.get('tenantUserId') as string, 10) || undefined;
	const isDefault = formData.get('is_default') === 'true';
	if (isDefault) {
		// Set all other tenantUsers to is_default: false
		await currentPrisma.tenantUser.updateMany({
			where: { tenantId: currentUserData.tenant.id, id: { not: tenantUserId } },
			data: { is_default: false }
		});
	}
	// Update the specified tenantUser
	const tenantUser = await currentPrisma.tenantUser.update({
		where: { id: tenantUserId },
		data: { is_default: isDefault }
	});

	return new Response(JSON.stringify(tenantUser), { status: 200 });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}
	try {
		//@ts-expect-error Need to check this weird error
		await deleteUser({ tenantUserId: params.userId || 0 });
		return new Response(null, { status: 204 });
	} catch (error) {
		console.error(error);
		return new Response('Deletion failed', { status: 400 });
	}
};
