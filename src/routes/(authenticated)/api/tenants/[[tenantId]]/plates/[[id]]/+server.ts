import { getAllPlates } from '$lib/actions/plates';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const session = await locals.getSession();
	if (!session?.user) {
		return new Response('Forbidden', { status: 403 });
	}

	const plates = await getAllPlates();
	return new Response(JSON.stringify(plates));
};
