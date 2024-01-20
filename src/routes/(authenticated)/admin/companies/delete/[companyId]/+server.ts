import type { RequestHandler } from '@sveltejs/kit';
import { deleteCompany } from '$lib/actions/admin';

export const DELETE: RequestHandler = async ({ params }) => {
    try {
        await deleteCompany({ companyId: params.companyId || '' });
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        // Optionally, you can provide more information in the response body
        return new Response('Deletion failed', { status: 400 });
    }
};

