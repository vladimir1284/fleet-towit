import type { Part } from '@prisma/client';
import type { QueryStringifyContraint } from '../types';

export const // HTTP request constants.

	USER_TENANT_HEADER = 'X-User-Tenant',
	// Status.
	INTERNAL_ERROR_STATUS = 500,
	FORBIDDEN_ACCESS_STATUS = 403,
	INVALID_FORM_DATA_STATUS = 400,
	SUCCESSFUL_REQUEST_STATUS = 200,
	PERMANENT_REDIRECT_STATUS = 301,
	TEMPORARY_REDIRECT_STATUS = 307,
	MISSING_SECURITY_HEADER_STATUS = 400,
	// Responses.
	FORBIDDEN_ACCESS_RESPONSE = 'FORBIDDEN_RESOURCE_ACCESS',
	BAD_REQUEST_RESPONSE = 'BAD_REQUEST',
	MISSING_SECURITY_HEADER_RESPONSE = 'NO X-User-Tenant FOUND',
	SUCCESSFUL_ACTION_RESPONSE = {
		POST: 'RECORD_CREATION_SUCCEEDED',
		PATCH: 'RECORD_UPDATE_SUCCEEDED',
		DELETE: 'RECORD_DELETION_SUCCEEDED'
	};

export const // Prisma constants.

	SKIP_PAGINATION_PARAMETER = 0,
	TAKE_PAGINATION_PARAMETER = 10,
	// API-related constants.
	PART_EXCLUDED_PROPERTIES: (keyof Part)[] = [
		// Properties to exclude to.
		'createdAt',
		'updatedAt',
		'deletedAt',
		'updatedBy',
		'createdBy',
		'deletedBy'
	] as const;

export const // SuperForm-zod related constants.

	ZOD_EXCLUDED_VALIDATION_PROPERTIES = {
		// CUID property.
		id: true,

		// Timestamp properties.
		createdAt: true,
		updatedAt: true,
		deletedAt: true,

		// Action-control properties.
		createdBy: true,
		updatedBy: true,
		deletedBy: true
	} as const,
	//  Part-related custom messages.
	FAILED_PART_RECORD_CREATION = 'PART_REGISTER_FAILED',
	INVALID_PART_SCHEMA_VALIDATION_MESSAGE = 'INVALID_PART_FORM_DATA';

export const // Actions related constants.

	PART_SCHEMA_CREATION_ACTION_ROUTE = '/api/maintenance/inventory/parts',
	PART_SCHEMA_RETRIEVAL_ACTION_ROUTE = '/api/maintenance/inventory/parts',
	PART_SCHEMA_UPDATE_ACTION_ROUTE = '/api/maintenance/inventory/parts',
	PART_SCHEMA_DELETION_ACTION_ROUTE = '/api/maintenance/inventory/parts';

export const PART_RETRIEVAL_CONSTRAINTS: QueryStringifyContraint = {
	// Workaround to retrieve it once the query paramers are used.
	deletedAt: JSON.stringify({
		not: null
	})
} as const;
