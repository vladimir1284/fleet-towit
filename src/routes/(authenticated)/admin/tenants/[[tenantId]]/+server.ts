import type { RequestHandler } from '@sveltejs/kit';
import { deleteTenant } from '$lib/actions/admin';

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        await deleteTenant({ tenantId: params.tenantId || '' });
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        return new Response('Deletion failed', { status: 400 });
    }
};

