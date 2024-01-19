import type { RequestHandler } from '@sveltejs/kit';
import { deleteUser, getCompanyUser } from '$lib/actions/admin';
import { json } from '@sveltejs/kit';

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        await deleteUser({ companyUserId: params.userId || '' });
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        // Optionally, you can provide more information in the response body
        return new Response('Deletion failed', { status: 400 });
    }
};


