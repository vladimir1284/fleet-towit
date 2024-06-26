import { json } from '@sveltejs/kit';
import {
	// Constants.
	SUCCESSFUL_REQUEST_STATUS,
	// FORBIDDEN_ACCESS_RESPONSE,
	PART_EXCLUDED_PROPERTIES
} from '$lib/shared';

import queryString from 'query-string';
import { bypassPrisma } from '$lib/prisma';

import { prismaHelpers } from '$lib/shared';

import type { partLocationType, partVendorType } from '$lib/types';
import type { RequestHandler } from '@sveltejs/kit';

// GET: /api/maintenance/inventory/parts
export const GET: RequestHandler = async ({ url, request }): Promise<Response> => {
	try {
		// if (locals.currentInstance) {
		// const { currentPrismaClient } = locals.currentInstance

		// Parameters management.
		const constraints = queryString.parseUrl(url.toString());

		const currentPrismaClient = bypassPrisma;
		const tainedTenantParts = await currentPrismaClient.part.findMany({
			where: {
				name: {
					contains: <string>constraints.query.name
				}
			}
		});
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
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 400 });
	}
};


// POST: /api/maintenance/inventory/parts
export const POST: RequestHandler = async ({ request }): Promise<Response> => {
	try {
		// Test data, POST method above must be used instead on production evironment.
		const currentPrismaClient = bypassPrisma;
		const currentTenant = 1; // or 2 whatever.

		// Part properties retrieval.
		const partWizardEntries = await request.json();

		// Temporal.
		delete partWizardEntries.categories;

		const { vendors, locations } = partWizardEntries;
		const bulkCreateVendorEntries = vendors.map((vendor: partVendorType) => ({
			cost: vendor.cost,
			vendor: {
				create: {
					name: vendor.name,
					tenantId: currentTenant
				}
			}
		}));
		const bulkCreateLocationEntries = locations.map((location: partLocationType) => ({
			quantity: location.quantity,
			unit: location.unit,
			Location: {
				create: {
					name: location.name,
					tenantId: currentTenant
				}
			}
		}));

		const partCreateEntries = {
			...partWizardEntries,
			vendors: { create: bulkCreateVendorEntries },
			locations: { create: bulkCreateLocationEntries }
		};

		const newClientSidePart = await currentPrismaClient.part.create({
			data: {
				...partCreateEntries,
				createdBy: currentTenant,
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
	} catch (error) {
		return new Response(JSON.stringify(error), { status: 400 });
	}
};
