export const // HTTP request constants.

	USER_TENANT_HEADER = 'X-User-Tenant',
	// Status.
	FORBIDDEN_ACCESS_STATUS = 403,
	INVALID_FORM_DATA_STATUS = 400,
	SUCCESSFUL_REQUEST_STATUS = 200,
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
	TAKE_PAGINATION_PARAMETER = 10;
