import { PartSchema } from '$lib/zod';
import { message, superValidate } from 'sveltekit-superforms/server';
// import { buildQueryParams } from './helpers';

import { USER_TENANT_HEADER } from '$lib/shared/helpers';
import {
	// PART_RETRIEVAL_CONSTRAINTS,
	FAILED_PART_RECORD_CREATION,
	ZOD_ECLUDED_VALIDATION_PROPERTIES,
	PART_SCHEMA_CREATION_ACTION_ROUTE,
	INVALID_PART_SCHEMA_VALIDATION_MESSAGE
} from './helpers';

import type { RequestEvent } from './$types';

export async function load(event) {
	// // Untain zod schema validation.
	// const omittedPartValidationSchema = PartSchema.omit(ZOD_ECLUDED_VALIDATION_PROPERTIES);
	// const superValidatedProduct = await superValidate(omittedPartValidationSchema);
	// const queryContraints = buildQueryParams(PART_RETRIEVAL_CONSTRAINTS);
	// // Fetch part records.
	// const productResponse = await event.fetch(
	// 	`${partSchemaActionRoutes.RETRIEVAL}${queryContraints}`,
	// 	{
	// 		method: 'GET'
	// 	}
	// );
	// // Destructure parts from response.
	// const { data: initialParts } = await productResponse.json();
	// // Fetch categories.
	// const categoryReponse = await event.fetch('/api/v1/category');
	// // Destructure categories from response.
	// const { data: categories } = await categoryReponse.json();
	// const initialCategories: CategorySelectOption[] = [];
	// categories.forEach((category: Category, index: number) => {
	// 	initialCategories.push({
	// 		value: index + 1,
	// 		name: category.name
	// 	});
	// });
	// return {
	// 	initialProducts,
	// 	initialCategories,
	// 	superValidatedProduct
	// };
	return {};
}

export const actions = {
	create: async (event: RequestEvent) => {
		const untainedPartValidationSchema = PartSchema.omit(ZOD_ECLUDED_VALIDATION_PROPERTIES);

		const superValidatedPart = await superValidate(event.request, untainedPartValidationSchema);
		if (!superValidatedPart.valid) {
			return message(superValidatedPart, INVALID_PART_SCHEMA_VALIDATION_MESSAGE);
		}
		// Request to create a new part into the database.
		const creationResponse = await event.fetch(PART_SCHEMA_CREATION_ACTION_ROUTE, {
			method: 'POST',
			body: JSON.stringify(superValidatedPart.data)
		});

		if (!creationResponse.ok) {
			return message(superValidatedPart, FAILED_PART_RECORD_CREATION);
		}
		const { data: createdPart } = await creationResponse.json();
		return {
			superValidatedPart,
			createdPart
		};
	}
};
