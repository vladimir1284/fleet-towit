import type { RequestHandler } from '@sveltejs/kit';
import { listCompanies, deleteCompany } from '$lib/actions/admin';

export const GET: RequestHandler = async({ locals }) => {
    const session = await locals.getSession()
    if (!session?.user) {
        return new Response('Forbidden', {status: 403})
    }
    const companies = await listCompanies()
    return new Response(JSON.stringify(companies), {status: 200})
} 

export const DELETE: RequestHandler = async ({ params, locals }) => {
    const session = await locals.getSession()
    if (!session?.user) {
        return new Response('Forbidden', {status: 403})
    }
    try {
        await deleteCompany({ companyId: params.companyId || '' });
        return new Response(null, { status: 204 });
    } catch (error) {
        console.error(error);
        return new Response('Deletion failed', { status: 400 });
    }
};
