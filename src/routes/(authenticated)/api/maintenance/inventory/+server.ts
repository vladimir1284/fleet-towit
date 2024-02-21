import { json } from '@sveltejs/kit';
import {
	// Functions.
	buildPrismaSearchInput,
	// Constants.
	SUCCESSFUL_REQUEST_STATUS,
	FORBIDDEN_ACCESS_RESPONSE
} from '$lib/shared/helpers';

import type { RequestHandler } from '@sveltejs/kit';

// GET: /api/maintenance/inventory/parts
export const GET: RequestHandler = async ({ locals, request, url }): Promise<Response> => {
	try {
		if (locals.inventoryActionObject) {
			const { currentPrismaClient } = locals.inventoryActionObject;

			const partSearchInput = buildPrismaSearchInput({
				query: url,
				model: currentPrismaClient.part
			});

			const tenantParts = await currentPrismaClient.part.findMany(partSearchInput);
			// Return json response to client.
			return json({
				acknowledged: true,
				status: SUCCESSFUL_REQUEST_STATUS,
				data: tenantParts,
				method: request.method
			});
		} else {
			return new Response(FORBIDDEN_ACCESS_RESPONSE, { status: 403 });
		}
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
