import type { RequestHandler } from '@sveltejs/kit';
import { listTenants, deleteTenant } from '$lib/actions/admin';

export const GET: RequestHandler = async({ locals }) => {
    const session = await locals.getSession()
    if (!session?.user) {
        return new Response('Forbidden', {status: 403})
    }
    const tenants = await listTenants()
    return new Response(JSON.stringify(tenants), {status: 200})
} 

export const DELETE: RequestHandler = async ({ params, locals }) => {
    const session = await locals.getSession()
    if (!session?.user) {
        return new Response('Forbidden', {status: 403})
    }
    try {
        await deleteTenant({ tenantId: params.tenantId || '' });
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        return new Response('Deletion failed', { status: 400 });
    }
};
