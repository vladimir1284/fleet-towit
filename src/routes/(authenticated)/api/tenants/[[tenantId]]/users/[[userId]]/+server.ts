
import type { RequestHandler } from '@sveltejs/kit';
import { createTenantUser, deleteUser, getAdminTenant, updateTenantUser } from '$lib/actions/admin';
import { bypassPrisma, tenantPrisma } from '$lib/prisma';
import { superValidate } from 'sveltekit-superforms/server';
import { actionResult } from 'sveltekit-superforms/server';
import { Role } from '@prisma/client';
import { z } from 'zod';

let currentPrisma;
const fixSchema = z.object({
    role: z.enum(['STAFF', 'ADMIN', 'OWNER']),
    email: z.string().email(),
    tenantId: z.string(),
    id: z.string().optional()
})

export const GET: RequestHandler = async ({ params, locals, request }) => {
    const session = await locals.getSession();
    if (!session?.user) {
        return new Response('Forbidden', { status: 403 })
    }

    //@ts-expect-error Error on tenantUser wich exists but is not detected
    const currentUserData = session.user.tenantUsers.find(_user => _user.id === request.headers.get('X-User-Tenant'));
    const adminTenant = await getAdminTenant();
    if (currentUserData.tenant.id === adminTenant?.id) {
        currentPrisma = bypassPrisma;
    } else {
        currentPrisma = tenantPrisma(currentUserData.tenant.id);
    }

    const users = await currentPrisma.tenantUser.findMany({
        where: { tenantId: params.tenantId },
        select: {
            role: true,
            id: true,
            tenant: true,
            user: true
        }
    })
    if (currentUserData.role === Role.STAFF && !(currentUserData.tenant.id === adminTenant?.id)) {
        return new Response('Forbiden', {status: 403})
    } else {
        return new Response(JSON.stringify(users), { status: 200 })
    }
}

export const POST: RequestHandler = async ({ params, locals, request }) => {
    const formData = await request.formData();
    console.log(params.userId)
    const session = await locals.getSession();
    if (!session?.user) {
        return new Response('Forbidden', { status: 403 })
    };

    //@ts-expect-error Error on tenantUser wich exists but is not detected
    const currentUserData = session.user.tenantUsers.find(_user => _user.id === request.headers.get('X-User-Tenant'));
    const adminTenant = await getAdminTenant();
    if (currentUserData.tenant.id === adminTenant?.id) {
        console.log('Using admin prisma')
        currentPrisma = bypassPrisma;
    } else {
        console.log('Using normal prisma')
        currentPrisma = tenantPrisma(currentUserData.tenant.id);
    }

    const form = await superValidate(formData, fixSchema);
    if (!form.valid) {
        console.log('validation fail')
        return actionResult('failure', { form }, { status: 400 })
    }

    if (!params.userId) {
        await createTenantUser({
            tenantId: form.data.tenantId,
            email: form.data.email,
            userRole: Role[form.data.role]
        })
    } else {
        await updateTenantUser({
            tenantUserId: params.userId,
            tenantId: form.data.tenantId,
            email: form.data.email,
            userRole: Role[form.data.role]
        })
    }
    return actionResult('success', {form}, {status: 200})
}

export const DELETE: RequestHandler = async ({ params, locals }) => {
    const session = await locals.getSession()
    if (!session?.user) {
        return new Response('Forbidden', { status: 403 });
    }
    try {
        await deleteUser({ tenantUserId: params.userId || '' });
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        return new Response('Deletion failed', { status: 400 });
    }
};