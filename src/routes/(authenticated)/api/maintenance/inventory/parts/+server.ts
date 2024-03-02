import { json } from '@sveltejs/kit';
import {
	// Constants.
	SUCCESSFUL_REQUEST_STATUS,
	FORBIDDEN_ACCESS_RESPONSE,
	PART_EXCLUDED_PROPERTIES
} from '$lib/shared';

import { prismaHelpers } from '$lib/shared';

import type { RequestHandler } from '@sveltejs/kit';
import { bypassPrisma } from '$lib/prisma';

// GET: /api/maintenance/inventory/parts
export const GET: RequestHandler = async ({ request }): Promise<Response> => {
	try {
		// if (locals.inventoryActionObject) {
		// const { currentPrismaClient } = locals.inventoryActionObject;

		const currentPrismaClient = bypassPrisma;
		const tainedTenantParts = await currentPrismaClient.part.findMany({});

		const untainedTenantParts = tainedTenantParts.map((tainedTenantPart) =>
			prismaHelpers.exclude(tainedTenantPart, PART_EXCLUDED_PROPERTIES)
		);

		// Return json response to client.
		return json({
			acknowledged: true,
			status: SUCCESSFUL_REQUEST_STATUS,
			data: untainedTenantParts,
			method: request.method
		});
		// } else {
		// 	return new Response(FORBIDDEN_ACCESS_RESPONSE, { status: 403 });
		// }
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 400 });
	}
};

// POST: /api/maintenance/inventory/parts
export const POST: RequestHandler = async ({ request, locals }): Promise<Response> => {
	try {
		if (locals.inventoryActionObject) {
			const { currentTenant, currentTenantUser, currentPrismaClient } =
				locals.inventoryActionObject;

			// Part properties retrieval.
			const partCreateInput = await request.json();
			const newClientSidePart = await currentPrismaClient.part.create({
				data: {
					...partCreateInput,
					createdBy: currentTenantUser,
					tenantId: currentTenant
				}
			});

			// Return json response to client.
			return json({
				acknowledged: true,
				status: SUCCESSFUL_REQUEST_STATUS,
				data: newClientSidePart,
				method: request.method
			});
		} else {
			return new Response(FORBIDDEN_ACCESS_RESPONSE, { status: 403 });
		}
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), { status: 400 });
	}
};
