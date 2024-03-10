import { fail } from '@sveltejs/kit';
import { PartSchema } from '$lib/zod';
import { message, superValidate } from 'sveltekit-superforms/server';

import {
	// Constants.
	FAILED_PART_RECORD_CREATION,
	ZOD_ECLUDED_VALIDATION_PROPERTIES,
	PART_SCHEMA_CREATION_ACTION_ROUTE,
	PART_SCHEMA_RETRIEVAL_ACTION_ROUTE,
	INVALID_PART_SCHEMA_VALIDATION_MESSAGE
} from '$lib/shared';
import {
	// Constants.
	INTERNAL_ERROR_STATUS
} from '$lib/shared';

import type { RequestEvent } from './$types';

export async function load(event) {
	const partRetrievalResponse = await event.fetch(PART_SCHEMA_RETRIEVAL_ACTION_ROUTE);
	if (partRetrievalResponse.ok) {
		const { data: initialParts } = await partRetrievalResponse.json();
		return {
			initialParts
		};
	} else {
		const error = await partRetrievalResponse.text();
		return fail(INTERNAL_ERROR_STATUS, { error });
	}
}

export const actions = {
	create: async (event: RequestEvent) => {
		const untainedPartValidationSchema = PartSchema.omit(ZOD_ECLUDED_VALIDATION_PROPERTIES);

		const superValidatedPart = await superValidate(event.request, untainedPartValidationSchema);
		if (!superValidatedPart.valid) {
			return message(superValidatedPart, INVALID_PART_SCHEMA_VALIDATION_MESSAGE);
		}
		// Request to create a new part into the database.
		const partCreationResponse = await event.fetch(PART_SCHEMA_CREATION_ACTION_ROUTE, {
			method: 'POST',
			body: JSON.stringify(superValidatedPart.data)
		});

		if (!partCreationResponse.ok) {
			return message(superValidatedPart, FAILED_PART_RECORD_CREATION);
		}
		const { data: createdPart } = await partCreationResponse.json();
		return {
			superValidatedPart,
			createdPart
		};
	}
};
