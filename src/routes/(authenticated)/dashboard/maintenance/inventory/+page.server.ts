import { zod } from 'sveltekit-superforms/adapters';
import { message, superValidate } from 'sveltekit-superforms/server';

import {
	// Constants.
	FAILED_PART_RECORD_CREATION,
	PART_SCHEMA_CREATION_ACTION_ROUTE,
	PART_SCHEMA_RETRIEVAL_ACTION_ROUTE,
	INVALID_PART_SCHEMA_VALIDATION_MESSAGE
} from '$lib/shared';

import { PartCustomizationSchema } from '$lib/features/create-part/zod';

import type { RequestEvent } from './$types';
import type { Category, Location, Vendor } from '@prisma/client';

export async function load(event) {
	// Create the form with the last step, to get all default values.
	const superValidatedPartWizard = await superValidate(zod(PartCustomizationSchema));

	// Part retrieval management.
	const partRetrievalResponse = await event.fetch(PART_SCHEMA_RETRIEVAL_ACTION_ROUTE);

	const { data: initialParts } = await partRetrievalResponse.json();

	// Build categories, vendors and locations via part retrieval data.
	const initialVendors: Vendor[] = [];
	const initialLocations: Location[] = [];
	const initialCategories: Category[] = [];

	return {
		initialParts,
		initialVendors,
		initialLocations,
		initialCategories,
		superValidatedPartWizard
	};
}

export const actions = {
	create: async (event: RequestEvent) => {
		const superValidatedPartWizard = await superValidate(
			// Validate part wizard data.
			event.request,
			zod(PartCustomizationSchema)
		);
		if (!superValidatedPartWizard.valid) {
			return message(superValidatedPartWizard, INVALID_PART_SCHEMA_VALIDATION_MESSAGE);
		}
		// Request to create a new part into the database.
		const partCreationResponse = await event.fetch(PART_SCHEMA_CREATION_ACTION_ROUTE, {
			method: 'POST',
			body: JSON.stringify(superValidatedPartWizard.data)
		});

		if (!partCreationResponse.ok) {
			return message(superValidatedPartWizard, FAILED_PART_RECORD_CREATION);
		}
		const { data: createdPart } = await partCreationResponse.json();
		return {
			superValidatedPartWizard,
			createdPart
		};
	}
};
