import { json } from '@sveltejs/kit';
import {
	SUCCESSFUL_REQUEST_STATUS,
	TAKE_PAGINATION_PARAMETER,
	FORBIDDEN_ACCESS_RESPONSE,
	SKIP_PAGINATION_PARAMETER
} from '$lib/shared';

import type { Prisma } from '@prisma/client';
import type { RequestHandler } from '@sveltejs/kit';

// GET: /api/maintenance/inventory/parts
export const GET: RequestHandler = async ({ locals, request, url }): Promise<Response> => {
	try {
		if (locals.inventoryActionObject) {
			const { currentPrismaClient } = locals.inventoryActionObject;

			// Generic part retrieval.
			const partWhereInput = {
				// Pagination params.
				skip: SKIP_PAGINATION_PARAMETER,
				take: TAKE_PAGINATION_PARAMETER,
				orderBy: [],
				// Constraint params.
				where: {},
				select: {}
			} satisfies Prisma.PartFindManyArgs;

			for (const [key, value] of url.searchParams.entries()) {
				const parsedSearchParam = JSON.parse(value);
				const isSafePositiveNumber = /^(0|[1-9]\d*)$/.test(value);

				if (key in partWhereInput) {
					const literalKey = key as keyof typeof partWhereInput;

					// Conditional assignment.
					switch (partWhereInput[literalKey].constructor) {
						case Number:
							if (isSafePositiveNumber) {
								partWhereInput[literalKey] = parsedSearchParam;
							}
							break;
						case Array:
							(partWhereInput[literalKey] as object[]).push(parsedSearchParam);
							break;
						default:
							partWhereInput[literalKey] = {
								...(partWhereInput[literalKey] as object),
								...parsedSearchParam
							};
							break;
					}
				}
			}

			const tenantParts = await currentPrismaClient.part.findMany(partWhereInput);
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
