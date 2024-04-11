import { getAllVehicles } from '$lib/actions/vehicles';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	const vehicles = await getAllVehicles(locals.currentInstance.currentPrismaClient);
	return new Response(JSON.stringify(vehicles));
};
