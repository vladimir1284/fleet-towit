// import axios from 'axios'
import { json } from '@sveltejs/kit';
import { tenantPrisma } from '$lib/prisma';

import {
	// Functions.
	exclude,
	buildFindManyInput,
	// Constants.
	SUCCESSFUL_REQUEST_STATUS,
	TRAILER_EXCLUDED_PROPERTIES
} from '$lib/shared/helpers';

import type { ExtendedTenantPrismaClient } from '$lib/prisma';
import type { SuccessfulVehicleBodyResponse } from '$lib/types.js';

// GET: /api/vehicles
export const GET = async ({ request, url }): Promise<Response> => {
	const tenant = 'clss8k69h0000uz4dqqyi3lic'; // Temporal.
	try {
		const currentPrismaClient: ExtendedTenantPrismaClient = tenantPrisma(tenant);

		const vehicleFindManyInput = buildFindManyInput({
			query: url,
			model: currentPrismaClient.vehicle
		});
		const taintedVehicles = await currentPrismaClient.vehicle.findMany(vehicleFindManyInput);
		const untaintedVehicles = taintedVehicles.map((taintedVehicle) =>
			exclude(taintedVehicle, TRAILER_EXCLUDED_PROPERTIES)
		);

		// Return json response to client.
		return json({
			acknowledged: true,
			status: SUCCESSFUL_REQUEST_STATUS,
			data: untaintedVehicles,
			method: request.method
		} satisfies SuccessfulVehicleBodyResponse);
	} catch (error) {
		return json(error);
	}
};
