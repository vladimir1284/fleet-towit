import type { RequestHandler } from '@sveltejs/kit';
import { deleteUser } from '$lib/actions/admin';

export const DELETE: RequestHandler = async ({ params, locals }) => {
    const session = await locals.getSession()
    if (!session?.user) {
        return new Response('Forbidden', {status: 403})
    }
    try {
        await deleteUser({ companyUserId: params.userId || '' });
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        // Optionally, you can provide more information in the response body
        return new Response('Deletion failed', { status: 400 });
    }
};


