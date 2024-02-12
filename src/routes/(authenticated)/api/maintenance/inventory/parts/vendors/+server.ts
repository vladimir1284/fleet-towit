import { json } from '@sveltejs/kit';
import {
	SUCCESSFUL_REQUEST_STATUS,
	TAKE_PAGINATION_PARAMETER
} from '../../../../../dashboard/maintenance/inventory/helpers';

import type { RequestHandler } from '@sveltejs/kit';

// GET: /api/maintenance/inventory/parts/categories
export const GET: RequestHandler = async ({ request, locals }): Promise<Response> => {
	const currentPrismaClient = locals.currentPrismaClient;

	const categories = currentPrismaClient.vendor.findMany({
		take: TAKE_PAGINATION_PARAMETER
	});

	// Return json response to client.
	return json({
		acknowledged: true,
		status: SUCCESSFUL_REQUEST_STATUS,
		data: categories,
		method: request.method
	});
};