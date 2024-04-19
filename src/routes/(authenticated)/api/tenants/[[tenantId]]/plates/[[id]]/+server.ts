import { getAllPlates } from '$lib/actions/plates';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const plates = await getAllPlates(locals.currentInstance.currentPrismaClient);
	return new Response(JSON.stringify(plates));
};
