import { PartSchema } from '$lib/zod';
import { superValidate, actionResult } from 'sveltekit-superforms/server';

import type { RequestHandler } from '@sveltejs/kit';

// GET: /api/inventory/parts
export const GET: RequestHandler = async ({ locals }): Promise<Response> => {
	const currentPrismaClient = locals.currentPrismaClient;
	// Retrieve all user parts related.
	const userParts = await currentPrismaClient.part.findMany({
		// Filters must be included to untained and paginate output, yet theses ones will be added over time.
	});

	return new Response(JSON.stringify(userParts), { status: 200 });
};

// POST: /api/inventory/parts
export const POST: RequestHandler = async ({ request, locals }): Promise<Response> => {
	const partFormData = await request.json();
	const currentPrismaClient = locals.currentPrismaClient;

	const superValidatedPart = await superValidate(partFormData, PartSchema);
	if (!superValidatedPart.valid) {
		return actionResult('failure', { superValidatedPart }, { status: 400 });
	}
	await currentPrismaClient.part.create({
		data: partFormData
	});

	return actionResult('success', { superValidatedPart }, { status: 200 });
};
