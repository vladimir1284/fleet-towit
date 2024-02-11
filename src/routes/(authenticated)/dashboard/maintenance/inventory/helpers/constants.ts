import type { QueryContraint } from '../@types/types';

export const // SuperForm-zod related constants.

	ZOD_ECLUDED_VALIDATION_PROPERTIES = {
		// CUID property.
		id: true,

		// Timestamp properties.
		createdAt: true,
		updatedAt: true,
		deletedAt: true,

		// Action-control properties.
		createdBy: true,
		updatedBy: true,
		deletedBy: true,

		// Temporal.
		extendedPartData: true
	} as const,
	//  Part-related custom messages.
	FAILED_PART_RECORD_CREATION = 'PART_REGISTER_FAILED',
	INVALID_PART_SCHEMA_VALIDATION_MESSAGE = 'INVALID_PART_FORM_DATA';

export const // Actions related constants.

	PART_SCHEMA_CREATION_ACTION_ROUTE = '/api/inventory/parts',
	PART_SCHEMA_RETRIEVAL_ACTION_ROUTE = '/api/inventory/parts',
	PART_SCHEMA_UPDATE_ACTION_ROUTE = '/api/inventory/parts',
	PART_SCHEMA_DELETION_ACTION_ROUTE = '/api/inventory/parts';

export const PART_RETRIEVAL_CONSTRAINTS: QueryContraint = {
	// Workaround to retrieve it once the query paramers are used.
	deletedAt: JSON.stringify({
		not: null
	})
} as const;
