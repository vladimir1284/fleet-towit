import type { RequestHandler } from '@sveltejs/kit';
import { deleteUser } from '$lib/actions/admin';
import { bypassPrisma } from '$lib/prisma';

export const DELETE: RequestHandler = async ({ params, locals}) => {
    const session = await locals.getSession()
    if (!session?.user) {
        return new Response('Forbidden', {status: 403})
    }
    try {
        await deleteUser({ tenantUserId: params.userId || '' });
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        return new Response('Deletion failed', { status: 400 });
    }
};

export const GET: RequestHandler = async({ params, locals }) =>  {
    const session = await locals.getSession()
    if (!session?.user) {
        return new Response('Forbidden', {status: 403})
    }
    const users = await bypassPrisma.tenantUser.findMany({where: {tenantId: params.tenantId},
    select:{
        role:true,
        id: true,
        tenant:true,
        user: true
    }
})
    return new Response( JSON.stringify(users), {status: 200})
}

