import { json } from '@sveltejs/kit';
// import { PartSchema } from '$lib/zod';
// import { superValidate, actionResult } from 'sveltekit-superforms/server';

import {
	// INVALID_FORM_DATA_STATUS,
	SUCCESSFUL_REQUEST_STATUS,
	TAKE_PAGINATION_PARAMETER
} from '../../../dashboard/maintenance/inventory/helpers';

import type { RequestHandler } from '@sveltejs/kit';

import { bypassPrisma, tenantPrisma } from '$lib/prisma';

// GET: /api/inventory/parts
export const GET: RequestHandler = async ({ locals, request }): Promise<Response> => {
	try {
		const currentPrismaClient = locals.currentPrismaClient;

		const userParts = await currentPrismaClient.part.findMany({
			take: TAKE_PAGINATION_PARAMETER
		});

		// Return json response to client.
		return json({
			acknowledged: true,
			status: SUCCESSFUL_REQUEST_STATUS,
			data: userParts,
			method: request.method
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), { status: 400 });
	}
};

// POST: /api/inventory/parts
export const POST: RequestHandler = async ({ request, locals }): Promise<Response> => {
	// const partFormData = await request.json();
	// const currentPrismaClient = locals.currentPrismaClient;

	// const superValidatedPart = await superValidate(partFormData, PartSchema);
	// if (!superValidatedPart.valid) {
	// 	return actionResult('failure', { superValidatedPart }, { status: INVALID_FORM_DATA_STATUS });
	// }
	// console.log(partFormData);
	const asdasd = await request.json();
	asdasd.createdBy = 'clsghkutn000otudq8br7oyzz';
	asdasd.updatedBy = 'clsghkutn000otudq8br7oyzz';
	asdasd.deletedBy = 'clsghkutn000otudq8br7oyzz';
	console.log(asdasd);
	await bypassPrisma.part.create({
		data: asdasd
	});
	return new Response('OKOK', { status: 200 });
	// return actionResult('success', { superValidatedPart }, { status: SUCCESSFUL_REQUEST_STATUS });
};
