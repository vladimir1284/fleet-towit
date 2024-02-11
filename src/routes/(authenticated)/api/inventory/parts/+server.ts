import { json } from '@sveltejs/kit';
import {
	SUCCESSFUL_REQUEST_STATUS,
	// TAKE_PAGINATION_PARAMETER,
	FORBIDDEN_ACCESS_RESPONSE
} from '$lib/shared';

import type { RequestHandler } from '@sveltejs/kit';

// GET: /api/inventory/parts
// export const GET: RequestHandler = async ({ locals, request }): Promise<Response> => {
// 	try {
// 		if (locals.currentPrismaClient) {
// 			const { currentTenant, currentTenantUser, currentPrismaClient } =
// 				locals.inventoryActionObject;

// 			const userParts = await currentPrismaClient.part.findMany({
// 				take: TAKE_PAGINATION_PARAMETER
// 			});

// 			// Return json response to client.
// 			return json({
// 				acknowledged: true,
// 				status: SUCCESSFUL_REQUEST_STATUS,
// 				data: userParts,
// 				method: request.method
// 			});
// 		} else {
// 			return new Response(FORBIDDEN_ACCESS_RESPONSE, { status: 403 });
// 		}
// 	} catch (error) {
// 		return new Response(JSON.stringify(error), { status: 400 });
// 	}
// };

// POST: /api/inventory/parts
export const POST: RequestHandler = async ({ request, locals }): Promise<Response> => {
	try {
		if (locals.inventoryActionObject) {
			const { currentTenant, currentTenantUser, currentPrismaClient } =
				locals.inventoryActionObject;

			// Part properties retrieval.
			const part = await request.json();
			const newClientSidePart = await currentPrismaClient.part.create({
				data: {
					...part,
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
