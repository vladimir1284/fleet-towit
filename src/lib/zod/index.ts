import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
	'ReadUncommitted',
	'ReadCommitted',
	'RepeatableRead',
	'Serializable'
]);

export const AccountScalarFieldEnumSchema = z.enum([
	'id',
	'userId',
	'type',
	'provider',
	'providerAccountId',
	'refresh_token',
	'access_token',
	'expires_at',
	'token_type',
	'scope',
	'id_token',
	'session_state'
]);

export const SessionScalarFieldEnumSchema = z.enum(['id', 'sessionToken', 'userId', 'expires']);

export const UserScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'emailVerified', 'image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier', 'token', 'expires']);

export const TenantUserScalarFieldEnumSchema = z.enum(['id', 'role', 'tenantId', 'userId']);

export const ClientScalarFieldEnumSchema = z.enum([
	'id',
	'name',
	'email',
	'phoneNumber',
	'avatar',
	'tenantId'
]);

export const TenantScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'isAdmin']);

export const CustomFormScalarFieldEnumSchema = z.enum(['id', 'name', 'tenantUserId', 'createdAt']);

export const CustomFieldScalarFieldEnumSchema = z.enum([
	'id',
	'name',
	'type',
	'required',
	'formId'
]);

export const CustomFieldResponseScalarFieldEnumSchema = z.enum([
	'id',
	'content',
	'tenantUserId',
	'fieldId',
	'createdAt'
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const NullsOrderSchema = z.enum(['first', 'last']);

export const RoleSchema = z.enum(['STAFF', 'ADMIN', 'OWNER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`;

export const FormFieldTypeSchema = z.enum(['TEXT', 'NUMBER', 'RADIO', 'CHECKBOX']);

export type FormFieldTypeType = `${z.infer<typeof FormFieldTypeSchema>}`;

/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
	id: z.string().cuid(),
	userId: z.string(),
	type: z.string(),
	provider: z.string(),
	providerAccountId: z.string(),
	refresh_token: z.string().nullable(),
	access_token: z.string().nullable(),
	expires_at: z.number().int().nullable(),
	token_type: z.string().nullable(),
	scope: z.string().nullable(),
	id_token: z.string().nullable(),
	session_state: z.string().nullable()
});

export type Account = z.infer<typeof AccountSchema>;

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
	id: z.string().cuid(),
	sessionToken: z.string(),
	userId: z.string(),
	expires: z.coerce.date()
});

export type Session = z.infer<typeof SessionSchema>;

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
	/**
	 * .omit([model, input])
	 */
	id: z.string().cuid(),
	name: z.string().nullable(),
	email: z.string().nullable(),
	emailVerified: z.coerce.date().nullable(),
	image: z.string().nullable()
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
	identifier: z.string(),
	token: z.string(),
	expires: z.coerce.date()
});

export type VerificationToken = z.infer<typeof VerificationTokenSchema>;

/////////////////////////////////////////
// TENANT USER SCHEMA
/////////////////////////////////////////

export const TenantUserSchema = z.object({
	role: RoleSchema,
	id: z.string().cuid(),
	tenantId: z.string(),
	userId: z.string()
});

export type TenantUser = z.infer<typeof TenantUserSchema>;

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
	id: z.string().cuid(),
	name: z.string(),
	email: z.string(),
	phoneNumber: z
		.string()
		.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
			message: 'Invalid Number!'
		}),
	avatar: z.string().nullable(),
	tenantId: z.string()
});

export type Client = z.infer<typeof ClientSchema>;

/////////////////////////////////////////
// TENANT SCHEMA
/////////////////////////////////////////

export const TenantSchema = z.object({
	id: z.string().cuid(),
	name: z.string(),
	email: z.string().nullable(),
	isAdmin: z.boolean()
});

export type Tenant = z.infer<typeof TenantSchema>;

/////////////////////////////////////////
// CUSTOM FORM SCHEMA
/////////////////////////////////////////

export const CustomFormSchema = z.object({
	id: z.number().int(),
	name: z.string(),
	tenantUserId: z.string(),
	createdAt: z.coerce.date()
});

export type CustomForm = z.infer<typeof CustomFormSchema>;

/////////////////////////////////////////
// CUSTOM FIELD SCHEMA
/////////////////////////////////////////

export const CustomFieldSchema = z.object({
	type: FormFieldTypeSchema,
	id: z.number().int(),
	name: z.string(),
	required: z.boolean().nullable(),
	formId: z.number().int()
});

export type CustomField = z.infer<typeof CustomFieldSchema>;

/////////////////////////////////////////
// CUSTOM FIELD RESPONSE SCHEMA
/////////////////////////////////////////

export const CustomFieldResponseSchema = z.object({
	id: z.number().int(),
	content: z.string(),
	tenantUserId: z.string(),
	fieldId: z.number().int(),
	createdAt: z.coerce.date()
});

export type CustomFieldResponse = z.infer<typeof CustomFieldResponseSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
	})
	.strict();

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z
	.object({
		select: z.lazy(() => AccountSelectSchema).optional(),
		include: z.lazy(() => AccountIncludeSchema).optional()
	})
	.strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
	.object({
		id: z.boolean().optional(),
		userId: z.boolean().optional(),
		type: z.boolean().optional(),
		provider: z.boolean().optional(),
		providerAccountId: z.boolean().optional(),
		refresh_token: z.boolean().optional(),
		access_token: z.boolean().optional(),
		expires_at: z.boolean().optional(),
		token_type: z.boolean().optional(),
		scope: z.boolean().optional(),
		id_token: z.boolean().optional(),
		session_state: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
	})
	.strict();

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
	})
	.strict();

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z
	.object({
		select: z.lazy(() => SessionSelectSchema).optional(),
		include: z.lazy(() => SessionIncludeSchema).optional()
	})
	.strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z
	.object({
		id: z.boolean().optional(),
		sessionToken: z.boolean().optional(),
		userId: z.boolean().optional(),
		expires: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
	})
	.strict();

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
	.object({
		accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
		sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
		tenantUsers: z.union([z.boolean(), z.lazy(() => TenantUserFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
	.object({
		select: z.lazy(() => UserSelectSchema).optional(),
		include: z.lazy(() => UserIncludeSchema).optional()
	})
	.strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z
	.object({
		select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish()
	})
	.strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z
	.object({
		accounts: z.boolean().optional(),
		sessions: z.boolean().optional(),
		tenantUsers: z.boolean().optional()
	})
	.strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		email: z.boolean().optional(),
		emailVerified: z.boolean().optional(),
		image: z.boolean().optional(),
		accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
		sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
		tenantUsers: z.union([z.boolean(), z.lazy(() => TenantUserFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z
	.object({
		identifier: z.boolean().optional(),
		token: z.boolean().optional(),
		expires: z.boolean().optional()
	})
	.strict();

// TENANT USER
//------------------------------------------------------

export const TenantUserIncludeSchema: z.ZodType<Prisma.TenantUserInclude> = z
	.object({
		tenant: z.union([z.boolean(), z.lazy(() => TenantArgsSchema)]).optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		customForms: z.union([z.boolean(), z.lazy(() => CustomFormFindManyArgsSchema)]).optional(),
		customFieldResponses: z
			.union([z.boolean(), z.lazy(() => CustomFieldResponseFindManyArgsSchema)])
			.optional(),
		_count: z.union([z.boolean(), z.lazy(() => TenantUserCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

export const TenantUserArgsSchema: z.ZodType<Prisma.TenantUserDefaultArgs> = z
	.object({
		select: z.lazy(() => TenantUserSelectSchema).optional(),
		include: z.lazy(() => TenantUserIncludeSchema).optional()
	})
	.strict();

export const TenantUserCountOutputTypeArgsSchema: z.ZodType<Prisma.TenantUserCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => TenantUserCountOutputTypeSelectSchema).nullish()
		})
		.strict();

export const TenantUserCountOutputTypeSelectSchema: z.ZodType<Prisma.TenantUserCountOutputTypeSelect> =
	z
		.object({
			customForms: z.boolean().optional(),
			customFieldResponses: z.boolean().optional()
		})
		.strict();

export const TenantUserSelectSchema: z.ZodType<Prisma.TenantUserSelect> = z
	.object({
		id: z.boolean().optional(),
		role: z.boolean().optional(),
		tenantId: z.boolean().optional(),
		userId: z.boolean().optional(),
		tenant: z.union([z.boolean(), z.lazy(() => TenantArgsSchema)]).optional(),
		user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
		customForms: z.union([z.boolean(), z.lazy(() => CustomFormFindManyArgsSchema)]).optional(),
		customFieldResponses: z
			.union([z.boolean(), z.lazy(() => CustomFieldResponseFindManyArgsSchema)])
			.optional(),
		_count: z.union([z.boolean(), z.lazy(() => TenantUserCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

// CLIENT
//------------------------------------------------------

export const ClientIncludeSchema: z.ZodType<Prisma.ClientInclude> = z
	.object({
		tenant: z.union([z.boolean(), z.lazy(() => TenantArgsSchema)]).optional()
	})
	.strict();

export const ClientArgsSchema: z.ZodType<Prisma.ClientDefaultArgs> = z
	.object({
		select: z.lazy(() => ClientSelectSchema).optional(),
		include: z.lazy(() => ClientIncludeSchema).optional()
	})
	.strict();

export const ClientSelectSchema: z.ZodType<Prisma.ClientSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		email: z.boolean().optional(),
		phoneNumber: z.boolean().optional(),
		avatar: z.boolean().optional(),
		tenantId: z.boolean().optional(),
		tenant: z.union([z.boolean(), z.lazy(() => TenantArgsSchema)]).optional()
	})
	.strict();

// TENANT
//------------------------------------------------------

export const TenantIncludeSchema: z.ZodType<Prisma.TenantInclude> = z
	.object({
		clients: z.union([z.boolean(), z.lazy(() => ClientFindManyArgsSchema)]).optional(),
		tenantUsers: z.union([z.boolean(), z.lazy(() => TenantUserFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => TenantCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

export const TenantArgsSchema: z.ZodType<Prisma.TenantDefaultArgs> = z
	.object({
		select: z.lazy(() => TenantSelectSchema).optional(),
		include: z.lazy(() => TenantIncludeSchema).optional()
	})
	.strict();

export const TenantCountOutputTypeArgsSchema: z.ZodType<Prisma.TenantCountOutputTypeDefaultArgs> = z
	.object({
		select: z.lazy(() => TenantCountOutputTypeSelectSchema).nullish()
	})
	.strict();

export const TenantCountOutputTypeSelectSchema: z.ZodType<Prisma.TenantCountOutputTypeSelect> = z
	.object({
		clients: z.boolean().optional(),
		tenantUsers: z.boolean().optional()
	})
	.strict();

export const TenantSelectSchema: z.ZodType<Prisma.TenantSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		email: z.boolean().optional(),
		isAdmin: z.boolean().optional(),
		clients: z.union([z.boolean(), z.lazy(() => ClientFindManyArgsSchema)]).optional(),
		tenantUsers: z.union([z.boolean(), z.lazy(() => TenantUserFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => TenantCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

// CUSTOM FORM
//------------------------------------------------------

export const CustomFormIncludeSchema: z.ZodType<Prisma.CustomFormInclude> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => TenantUserArgsSchema)]).optional(),
		fields: z.union([z.boolean(), z.lazy(() => CustomFieldFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => CustomFormCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

export const CustomFormArgsSchema: z.ZodType<Prisma.CustomFormDefaultArgs> = z
	.object({
		select: z.lazy(() => CustomFormSelectSchema).optional(),
		include: z.lazy(() => CustomFormIncludeSchema).optional()
	})
	.strict();

export const CustomFormCountOutputTypeArgsSchema: z.ZodType<Prisma.CustomFormCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => CustomFormCountOutputTypeSelectSchema).nullish()
		})
		.strict();

export const CustomFormCountOutputTypeSelectSchema: z.ZodType<Prisma.CustomFormCountOutputTypeSelect> =
	z
		.object({
			fields: z.boolean().optional()
		})
		.strict();

export const CustomFormSelectSchema: z.ZodType<Prisma.CustomFormSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		tenantUserId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => TenantUserArgsSchema)]).optional(),
		fields: z.union([z.boolean(), z.lazy(() => CustomFieldFindManyArgsSchema)]).optional(),
		_count: z.union([z.boolean(), z.lazy(() => CustomFormCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

// CUSTOM FIELD
//------------------------------------------------------

export const CustomFieldIncludeSchema: z.ZodType<Prisma.CustomFieldInclude> = z
	.object({
		form: z.union([z.boolean(), z.lazy(() => CustomFormArgsSchema)]).optional(),
		responses: z
			.union([z.boolean(), z.lazy(() => CustomFieldResponseFindManyArgsSchema)])
			.optional(),
		_count: z.union([z.boolean(), z.lazy(() => CustomFieldCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

export const CustomFieldArgsSchema: z.ZodType<Prisma.CustomFieldDefaultArgs> = z
	.object({
		select: z.lazy(() => CustomFieldSelectSchema).optional(),
		include: z.lazy(() => CustomFieldIncludeSchema).optional()
	})
	.strict();

export const CustomFieldCountOutputTypeArgsSchema: z.ZodType<Prisma.CustomFieldCountOutputTypeDefaultArgs> =
	z
		.object({
			select: z.lazy(() => CustomFieldCountOutputTypeSelectSchema).nullish()
		})
		.strict();

export const CustomFieldCountOutputTypeSelectSchema: z.ZodType<Prisma.CustomFieldCountOutputTypeSelect> =
	z
		.object({
			responses: z.boolean().optional()
		})
		.strict();

export const CustomFieldSelectSchema: z.ZodType<Prisma.CustomFieldSelect> = z
	.object({
		id: z.boolean().optional(),
		name: z.boolean().optional(),
		type: z.boolean().optional(),
		required: z.boolean().optional(),
		formId: z.boolean().optional(),
		form: z.union([z.boolean(), z.lazy(() => CustomFormArgsSchema)]).optional(),
		responses: z
			.union([z.boolean(), z.lazy(() => CustomFieldResponseFindManyArgsSchema)])
			.optional(),
		_count: z.union([z.boolean(), z.lazy(() => CustomFieldCountOutputTypeArgsSchema)]).optional()
	})
	.strict();

// CUSTOM FIELD RESPONSE
//------------------------------------------------------

export const CustomFieldResponseIncludeSchema: z.ZodType<Prisma.CustomFieldResponseInclude> = z
	.object({
		user: z.union([z.boolean(), z.lazy(() => TenantUserArgsSchema)]).optional(),
		field: z.union([z.boolean(), z.lazy(() => CustomFieldArgsSchema)]).optional()
	})
	.strict();

export const CustomFieldResponseArgsSchema: z.ZodType<Prisma.CustomFieldResponseDefaultArgs> = z
	.object({
		select: z.lazy(() => CustomFieldResponseSelectSchema).optional(),
		include: z.lazy(() => CustomFieldResponseIncludeSchema).optional()
	})
	.strict();

export const CustomFieldResponseSelectSchema: z.ZodType<Prisma.CustomFieldResponseSelect> = z
	.object({
		id: z.boolean().optional(),
		content: z.boolean().optional(),
		tenantUserId: z.boolean().optional(),
		fieldId: z.boolean().optional(),
		createdAt: z.boolean().optional(),
		user: z.union([z.boolean(), z.lazy(() => TenantUserArgsSchema)]).optional(),
		field: z.union([z.boolean(), z.lazy(() => CustomFieldArgsSchema)]).optional()
	})
	.strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z
	.object({
		AND: z
			.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()])
			.optional(),
		OR: z
			.lazy(() => AccountWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		providerAccountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		refresh_token: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		access_token: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		expires_at: z
			.union([z.lazy(() => IntNullableFilterSchema), z.number()])
			.optional()
			.nullable(),
		token_type: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		scope: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		id_token: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		session_state: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		user: z
			.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
			.optional()
	})
	.strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			refresh_token: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			access_token: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			expires_at: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			token_type: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			scope: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			id_token: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			session_state: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
		})
		.strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z
	.union([
		z.object({
			id: z.string().cuid(),
			provider_providerAccountId: z.lazy(
				() => AccountProviderProviderAccountIdCompoundUniqueInputSchema
			)
		}),
		z.object({
			id: z.string().cuid()
		}),
		z.object({
			provider_providerAccountId: z.lazy(
				() => AccountProviderProviderAccountIdCompoundUniqueInputSchema
			)
		})
	])
	.and(
		z
			.object({
				id: z.string().cuid().optional(),
				provider_providerAccountId: z
					.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
					.optional(),
				AND: z
					.union([
						z.lazy(() => AccountWhereInputSchema),
						z.lazy(() => AccountWhereInputSchema).array()
					])
					.optional(),
				OR: z
					.lazy(() => AccountWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => AccountWhereInputSchema),
						z.lazy(() => AccountWhereInputSchema).array()
					])
					.optional(),
				userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				providerAccountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				refresh_token: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				access_token: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				expires_at: z
					.union([z.lazy(() => IntNullableFilterSchema), z.number().int()])
					.optional()
					.nullable(),
				token_type: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				scope: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				id_token: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				session_state: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				user: z
					.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
					.optional()
			})
			.strict()
	);

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			refresh_token: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			access_token: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			expires_at: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			token_type: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			scope: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			id_token: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			session_state: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			_count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
			_avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
			_sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
		})
		.strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
					z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => AccountScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
					z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			type: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			provider: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			providerAccountId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			refresh_token: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable(),
			access_token: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable(),
			expires_at: z
				.union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()])
				.optional()
				.nullable(),
			token_type: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable(),
			scope: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable(),
			id_token: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable(),
			session_state: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable()
		})
		.strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z
	.object({
		AND: z
			.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()])
			.optional(),
		OR: z
			.lazy(() => SessionWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		sessionToken: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
		user: z
			.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
			.optional()
	})
	.strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			sessionToken: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional(),
			user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
		})
		.strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z
	.union([
		z.object({
			id: z.string().cuid(),
			sessionToken: z.string()
		}),
		z.object({
			id: z.string().cuid()
		}),
		z.object({
			sessionToken: z.string()
		})
	])
	.and(
		z
			.object({
				id: z.string().cuid().optional(),
				sessionToken: z.string().optional(),
				AND: z
					.union([
						z.lazy(() => SessionWhereInputSchema),
						z.lazy(() => SessionWhereInputSchema).array()
					])
					.optional(),
				OR: z
					.lazy(() => SessionWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => SessionWhereInputSchema),
						z.lazy(() => SessionWhereInputSchema).array()
					])
					.optional(),
				userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
				user: z
					.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
					.optional()
			})
			.strict()
	);

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			sessionToken: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
		})
		.strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
					z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => SessionScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
					z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			sessionToken: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			expires: z
				.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()])
				.optional()
		})
		.strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z
	.object({
		AND: z
			.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
			.optional(),
		OR: z
			.lazy(() => UserWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		email: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		emailVerified: z
			.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
			.optional()
			.nullable(),
		image: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
		sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
		tenantUsers: z.lazy(() => TenantUserListRelationFilterSchema).optional()
	})
	.strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
		email: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
		emailVerified: z
			.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
			.optional(),
		image: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
		accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
		sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
		tenantUsers: z.lazy(() => TenantUserOrderByRelationAggregateInputSchema).optional()
	})
	.strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z
	.union([
		z.object({
			id: z.string().cuid(),
			email: z.string()
		}),
		z.object({
			id: z.string().cuid()
		}),
		z.object({
			email: z.string()
		})
	])
	.and(
		z
			.object({
				id: z.string().cuid().optional(),
				email: z.string().optional(),
				AND: z
					.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
					.optional(),
				OR: z
					.lazy(() => UserWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()])
					.optional(),
				name: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				emailVerified: z
					.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
					.optional()
					.nullable(),
				image: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
				sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
				tenantUsers: z.lazy(() => TenantUserListRelationFilterSchema).optional()
			})
			.strict()
	);

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
			email: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			emailVerified: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			image: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			_count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
		})
		.strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => UserScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
					z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			name: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable(),
			email: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable(),
			emailVerified: z
				.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()])
				.optional()
				.nullable(),
			image: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable()
		})
		.strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => VerificationTokenWhereInputSchema),
				z.lazy(() => VerificationTokenWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => VerificationTokenWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => VerificationTokenWhereInputSchema),
				z.lazy(() => VerificationTokenWhereInputSchema).array()
			])
			.optional(),
		identifier: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
	})
	.strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> =
	z
		.object({
			identifier: z.lazy(() => SortOrderSchema).optional(),
			token: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> =
	z
		.union([
			z.object({
				token: z.string(),
				identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
			}),
			z.object({
				token: z.string()
			}),
			z.object({
				identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
			})
		])
		.and(
			z
				.object({
					token: z.string().optional(),
					identifier_token: z
						.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
						.optional(),
					AND: z
						.union([
							z.lazy(() => VerificationTokenWhereInputSchema),
							z.lazy(() => VerificationTokenWhereInputSchema).array()
						])
						.optional(),
					OR: z
						.lazy(() => VerificationTokenWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => VerificationTokenWhereInputSchema),
							z.lazy(() => VerificationTokenWhereInputSchema).array()
						])
						.optional(),
					identifier: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
					expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
				})
				.strict()
		);

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> =
	z
		.object({
			identifier: z.lazy(() => SortOrderSchema).optional(),
			token: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
		})
		.strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
					z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),
					z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			identifier: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			token: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			expires: z
				.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()])
				.optional()
		})
		.strict();

export const TenantUserWhereInputSchema: z.ZodType<Prisma.TenantUserWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => TenantUserWhereInputSchema),
				z.lazy(() => TenantUserWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => TenantUserWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TenantUserWhereInputSchema),
				z.lazy(() => TenantUserWhereInputSchema).array()
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
		tenantId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		tenant: z
			.union([z.lazy(() => TenantRelationFilterSchema), z.lazy(() => TenantWhereInputSchema)])
			.optional(),
		user: z
			.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
			.optional(),
		customForms: z.lazy(() => CustomFormListRelationFilterSchema).optional(),
		customFieldResponses: z.lazy(() => CustomFieldResponseListRelationFilterSchema).optional()
	})
	.strict();

export const TenantUserOrderByWithRelationInputSchema: z.ZodType<Prisma.TenantUserOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			tenant: z.lazy(() => TenantOrderByWithRelationInputSchema).optional(),
			user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
			customForms: z.lazy(() => CustomFormOrderByRelationAggregateInputSchema).optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseOrderByRelationAggregateInputSchema)
				.optional()
		})
		.strict();

export const TenantUserWhereUniqueInputSchema: z.ZodType<Prisma.TenantUserWhereUniqueInput> = z
	.object({
		id: z.string().cuid()
	})
	.and(
		z
			.object({
				id: z.string().cuid().optional(),
				AND: z
					.union([
						z.lazy(() => TenantUserWhereInputSchema),
						z.lazy(() => TenantUserWhereInputSchema).array()
					])
					.optional(),
				OR: z
					.lazy(() => TenantUserWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => TenantUserWhereInputSchema),
						z.lazy(() => TenantUserWhereInputSchema).array()
					])
					.optional(),
				role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
				tenantId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				tenant: z
					.union([z.lazy(() => TenantRelationFilterSchema), z.lazy(() => TenantWhereInputSchema)])
					.optional(),
				user: z
					.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)])
					.optional(),
				customForms: z.lazy(() => CustomFormListRelationFilterSchema).optional(),
				customFieldResponses: z.lazy(() => CustomFieldResponseListRelationFilterSchema).optional()
			})
			.strict()
	);

export const TenantUserOrderByWithAggregationInputSchema: z.ZodType<Prisma.TenantUserOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => TenantUserCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => TenantUserMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => TenantUserMinOrderByAggregateInputSchema).optional()
		})
		.strict();

export const TenantUserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TenantUserScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => TenantUserScalarWhereWithAggregatesInputSchema),
					z.lazy(() => TenantUserScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => TenantUserScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => TenantUserScalarWhereWithAggregatesInputSchema),
					z.lazy(() => TenantUserScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			role: z
				.union([z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema)])
				.optional(),
			tenantId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional()
		})
		.strict();

export const ClientWhereInputSchema: z.ZodType<Prisma.ClientWhereInput> = z
	.object({
		AND: z
			.union([z.lazy(() => ClientWhereInputSchema), z.lazy(() => ClientWhereInputSchema).array()])
			.optional(),
		OR: z
			.lazy(() => ClientWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => ClientWhereInputSchema), z.lazy(() => ClientWhereInputSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		phoneNumber: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		avatar: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		tenantId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		tenant: z
			.union([z.lazy(() => TenantRelationFilterSchema), z.lazy(() => TenantWhereInputSchema)])
			.optional()
	})
	.strict();

export const ClientOrderByWithRelationInputSchema: z.ZodType<Prisma.ClientOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			phoneNumber: z.lazy(() => SortOrderSchema).optional(),
			avatar: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional(),
			tenant: z.lazy(() => TenantOrderByWithRelationInputSchema).optional()
		})
		.strict();

export const ClientWhereUniqueInputSchema: z.ZodType<Prisma.ClientWhereUniqueInput> = z
	.union([
		z.object({
			id: z.string().cuid(),
			phoneNumber: z
				.string()
				.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
					message: 'Invalid Number!'
				})
		}),
		z.object({
			id: z.string().cuid()
		}),
		z.object({
			phoneNumber: z
				.string()
				.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
					message: 'Invalid Number!'
				})
		})
	])
	.and(
		z
			.object({
				id: z.string().cuid().optional(),
				phoneNumber: z
					.string()
					.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
						message: 'Invalid Number!'
					})
					.optional(),
				AND: z
					.union([
						z.lazy(() => ClientWhereInputSchema),
						z.lazy(() => ClientWhereInputSchema).array()
					])
					.optional(),
				OR: z
					.lazy(() => ClientWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => ClientWhereInputSchema),
						z.lazy(() => ClientWhereInputSchema).array()
					])
					.optional(),
				name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				avatar: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				tenantId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				tenant: z
					.union([z.lazy(() => TenantRelationFilterSchema), z.lazy(() => TenantWhereInputSchema)])
					.optional()
			})
			.strict()
	);

export const ClientOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClientOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			phoneNumber: z.lazy(() => SortOrderSchema).optional(),
			avatar: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => ClientCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => ClientMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => ClientMinOrderByAggregateInputSchema).optional()
		})
		.strict();

export const ClientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClientScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),
					z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => ClientScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),
					z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			phoneNumber: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			avatar: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable(),
			tenantId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional()
		})
		.strict();

export const TenantWhereInputSchema: z.ZodType<Prisma.TenantWhereInput> = z
	.object({
		AND: z
			.union([z.lazy(() => TenantWhereInputSchema), z.lazy(() => TenantWhereInputSchema).array()])
			.optional(),
		OR: z
			.lazy(() => TenantWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([z.lazy(() => TenantWhereInputSchema), z.lazy(() => TenantWhereInputSchema).array()])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		email: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		isAdmin: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
		clients: z.lazy(() => ClientListRelationFilterSchema).optional(),
		tenantUsers: z.lazy(() => TenantUserListRelationFilterSchema).optional()
	})
	.strict();

export const TenantOrderByWithRelationInputSchema: z.ZodType<Prisma.TenantOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			isAdmin: z.lazy(() => SortOrderSchema).optional(),
			clients: z.lazy(() => ClientOrderByRelationAggregateInputSchema).optional(),
			tenantUsers: z.lazy(() => TenantUserOrderByRelationAggregateInputSchema).optional()
		})
		.strict();

export const TenantWhereUniqueInputSchema: z.ZodType<Prisma.TenantWhereUniqueInput> = z
	.object({
		id: z.string().cuid()
	})
	.and(
		z
			.object({
				id: z.string().cuid().optional(),
				AND: z
					.union([
						z.lazy(() => TenantWhereInputSchema),
						z.lazy(() => TenantWhereInputSchema).array()
					])
					.optional(),
				OR: z
					.lazy(() => TenantWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => TenantWhereInputSchema),
						z.lazy(() => TenantWhereInputSchema).array()
					])
					.optional(),
				name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				email: z
					.union([z.lazy(() => StringNullableFilterSchema), z.string()])
					.optional()
					.nullable(),
				isAdmin: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
				clients: z.lazy(() => ClientListRelationFilterSchema).optional(),
				tenantUsers: z.lazy(() => TenantUserListRelationFilterSchema).optional()
			})
			.strict()
	);

export const TenantOrderByWithAggregationInputSchema: z.ZodType<Prisma.TenantOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			isAdmin: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => TenantCountOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => TenantMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => TenantMinOrderByAggregateInputSchema).optional()
		})
		.strict();

export const TenantScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TenantScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => TenantScalarWhereWithAggregatesInputSchema),
					z.lazy(() => TenantScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => TenantScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => TenantScalarWhereWithAggregatesInputSchema),
					z.lazy(() => TenantScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			email: z
				.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()])
				.optional()
				.nullable(),
			isAdmin: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional()
		})
		.strict();

export const CustomFormWhereInputSchema: z.ZodType<Prisma.CustomFormWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => CustomFormWhereInputSchema),
				z.lazy(() => CustomFormWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => CustomFormWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CustomFormWhereInputSchema),
				z.lazy(() => CustomFormWhereInputSchema).array()
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
		name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		tenantUserId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
		user: z
			.union([
				z.lazy(() => TenantUserRelationFilterSchema),
				z.lazy(() => TenantUserWhereInputSchema)
			])
			.optional(),
		fields: z.lazy(() => CustomFieldListRelationFilterSchema).optional()
	})
	.strict();

export const CustomFormOrderByWithRelationInputSchema: z.ZodType<Prisma.CustomFormOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			user: z.lazy(() => TenantUserOrderByWithRelationInputSchema).optional(),
			fields: z.lazy(() => CustomFieldOrderByRelationAggregateInputSchema).optional()
		})
		.strict();

export const CustomFormWhereUniqueInputSchema: z.ZodType<Prisma.CustomFormWhereUniqueInput> = z
	.object({
		id: z.number().int()
	})
	.and(
		z
			.object({
				id: z.number().int().optional(),
				AND: z
					.union([
						z.lazy(() => CustomFormWhereInputSchema),
						z.lazy(() => CustomFormWhereInputSchema).array()
					])
					.optional(),
				OR: z
					.lazy(() => CustomFormWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => CustomFormWhereInputSchema),
						z.lazy(() => CustomFormWhereInputSchema).array()
					])
					.optional(),
				name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				tenantUserId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
				user: z
					.union([
						z.lazy(() => TenantUserRelationFilterSchema),
						z.lazy(() => TenantUserWhereInputSchema)
					])
					.optional(),
				fields: z.lazy(() => CustomFieldListRelationFilterSchema).optional()
			})
			.strict()
	);

export const CustomFormOrderByWithAggregationInputSchema: z.ZodType<Prisma.CustomFormOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => CustomFormCountOrderByAggregateInputSchema).optional(),
			_avg: z.lazy(() => CustomFormAvgOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => CustomFormMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => CustomFormMinOrderByAggregateInputSchema).optional(),
			_sum: z.lazy(() => CustomFormSumOrderByAggregateInputSchema).optional()
		})
		.strict();

export const CustomFormScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CustomFormScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => CustomFormScalarWhereWithAggregatesInputSchema),
					z.lazy(() => CustomFormScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => CustomFormScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => CustomFormScalarWhereWithAggregatesInputSchema),
					z.lazy(() => CustomFormScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
			name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			tenantUserId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()])
				.optional()
		})
		.strict();

export const CustomFieldWhereInputSchema: z.ZodType<Prisma.CustomFieldWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => CustomFieldWhereInputSchema),
				z.lazy(() => CustomFieldWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => CustomFieldWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CustomFieldWhereInputSchema),
				z.lazy(() => CustomFieldWhereInputSchema).array()
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
		name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		type: z
			.union([z.lazy(() => EnumFormFieldTypeFilterSchema), z.lazy(() => FormFieldTypeSchema)])
			.optional(),
		required: z
			.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
			.optional()
			.nullable(),
		formId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
		form: z
			.union([
				z.lazy(() => CustomFormRelationFilterSchema),
				z.lazy(() => CustomFormWhereInputSchema)
			])
			.optional(),
		responses: z.lazy(() => CustomFieldResponseListRelationFilterSchema).optional()
	})
	.strict();

export const CustomFieldOrderByWithRelationInputSchema: z.ZodType<Prisma.CustomFieldOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			required: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			formId: z.lazy(() => SortOrderSchema).optional(),
			form: z.lazy(() => CustomFormOrderByWithRelationInputSchema).optional(),
			responses: z.lazy(() => CustomFieldResponseOrderByRelationAggregateInputSchema).optional()
		})
		.strict();

export const CustomFieldWhereUniqueInputSchema: z.ZodType<Prisma.CustomFieldWhereUniqueInput> = z
	.object({
		id: z.number().int()
	})
	.and(
		z
			.object({
				id: z.number().int().optional(),
				AND: z
					.union([
						z.lazy(() => CustomFieldWhereInputSchema),
						z.lazy(() => CustomFieldWhereInputSchema).array()
					])
					.optional(),
				OR: z
					.lazy(() => CustomFieldWhereInputSchema)
					.array()
					.optional(),
				NOT: z
					.union([
						z.lazy(() => CustomFieldWhereInputSchema),
						z.lazy(() => CustomFieldWhereInputSchema).array()
					])
					.optional(),
				name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
				type: z
					.union([z.lazy(() => EnumFormFieldTypeFilterSchema), z.lazy(() => FormFieldTypeSchema)])
					.optional(),
				required: z
					.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
					.optional()
					.nullable(),
				formId: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
				form: z
					.union([
						z.lazy(() => CustomFormRelationFilterSchema),
						z.lazy(() => CustomFormWhereInputSchema)
					])
					.optional(),
				responses: z.lazy(() => CustomFieldResponseListRelationFilterSchema).optional()
			})
			.strict()
	);

export const CustomFieldOrderByWithAggregationInputSchema: z.ZodType<Prisma.CustomFieldOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			required: z
				.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)])
				.optional(),
			formId: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => CustomFieldCountOrderByAggregateInputSchema).optional(),
			_avg: z.lazy(() => CustomFieldAvgOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => CustomFieldMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => CustomFieldMinOrderByAggregateInputSchema).optional(),
			_sum: z.lazy(() => CustomFieldSumOrderByAggregateInputSchema).optional()
		})
		.strict();

export const CustomFieldScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CustomFieldScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => CustomFieldScalarWhereWithAggregatesInputSchema),
					z.lazy(() => CustomFieldScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => CustomFieldScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => CustomFieldScalarWhereWithAggregatesInputSchema),
					z.lazy(() => CustomFieldScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
			name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			type: z
				.union([
					z.lazy(() => EnumFormFieldTypeWithAggregatesFilterSchema),
					z.lazy(() => FormFieldTypeSchema)
				])
				.optional(),
			required: z
				.union([z.lazy(() => BoolNullableWithAggregatesFilterSchema), z.boolean()])
				.optional()
				.nullable(),
			formId: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional()
		})
		.strict();

export const CustomFieldResponseWhereInputSchema: z.ZodType<Prisma.CustomFieldResponseWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => CustomFieldResponseWhereInputSchema),
					z.lazy(() => CustomFieldResponseWhereInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => CustomFieldResponseWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => CustomFieldResponseWhereInputSchema),
					z.lazy(() => CustomFieldResponseWhereInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
			content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			tenantUserId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			fieldId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
			createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
			user: z
				.union([
					z.lazy(() => TenantUserRelationFilterSchema),
					z.lazy(() => TenantUserWhereInputSchema)
				])
				.optional(),
			field: z
				.union([
					z.lazy(() => CustomFieldRelationFilterSchema),
					z.lazy(() => CustomFieldWhereInputSchema)
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseOrderByWithRelationInputSchema: z.ZodType<Prisma.CustomFieldResponseOrderByWithRelationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			fieldId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			user: z.lazy(() => TenantUserOrderByWithRelationInputSchema).optional(),
			field: z.lazy(() => CustomFieldOrderByWithRelationInputSchema).optional()
		})
		.strict();

export const CustomFieldResponseWhereUniqueInputSchema: z.ZodType<Prisma.CustomFieldResponseWhereUniqueInput> =
	z
		.object({
			id: z.number().int()
		})
		.and(
			z
				.object({
					id: z.number().int().optional(),
					AND: z
						.union([
							z.lazy(() => CustomFieldResponseWhereInputSchema),
							z.lazy(() => CustomFieldResponseWhereInputSchema).array()
						])
						.optional(),
					OR: z
						.lazy(() => CustomFieldResponseWhereInputSchema)
						.array()
						.optional(),
					NOT: z
						.union([
							z.lazy(() => CustomFieldResponseWhereInputSchema),
							z.lazy(() => CustomFieldResponseWhereInputSchema).array()
						])
						.optional(),
					content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
					tenantUserId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
					fieldId: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
					createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
					user: z
						.union([
							z.lazy(() => TenantUserRelationFilterSchema),
							z.lazy(() => TenantUserWhereInputSchema)
						])
						.optional(),
					field: z
						.union([
							z.lazy(() => CustomFieldRelationFilterSchema),
							z.lazy(() => CustomFieldWhereInputSchema)
						])
						.optional()
				})
				.strict()
		);

export const CustomFieldResponseOrderByWithAggregationInputSchema: z.ZodType<Prisma.CustomFieldResponseOrderByWithAggregationInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			fieldId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional(),
			_count: z.lazy(() => CustomFieldResponseCountOrderByAggregateInputSchema).optional(),
			_avg: z.lazy(() => CustomFieldResponseAvgOrderByAggregateInputSchema).optional(),
			_max: z.lazy(() => CustomFieldResponseMaxOrderByAggregateInputSchema).optional(),
			_min: z.lazy(() => CustomFieldResponseMinOrderByAggregateInputSchema).optional(),
			_sum: z.lazy(() => CustomFieldResponseSumOrderByAggregateInputSchema).optional()
		})
		.strict();

export const CustomFieldResponseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CustomFieldResponseScalarWhereWithAggregatesInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => CustomFieldResponseScalarWhereWithAggregatesInputSchema),
					z.lazy(() => CustomFieldResponseScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => CustomFieldResponseScalarWhereWithAggregatesInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => CustomFieldResponseScalarWhereWithAggregatesInputSchema),
					z.lazy(() => CustomFieldResponseScalarWhereWithAggregatesInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
			content: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
			tenantUserId: z
				.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
				.optional(),
			fieldId: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
			createdAt: z
				.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()])
				.optional()
		})
		.strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		type: z.string(),
		provider: z.string(),
		providerAccountId: z.string(),
		refresh_token: z.string().optional().nullable(),
		access_token: z.string().optional().nullable(),
		expires_at: z.number().int().optional().nullable(),
		token_type: z.string().optional().nullable(),
		scope: z.string().optional().nullable(),
		id_token: z.string().optional().nullable(),
		session_state: z.string().optional().nullable(),
		user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
	})
	.strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		userId: z.string(),
		type: z.string(),
		provider: z.string(),
		providerAccountId: z.string(),
		refresh_token: z.string().optional().nullable(),
		access_token: z.string().optional().nullable(),
		expires_at: z.number().int().optional().nullable(),
		token_type: z.string().optional().nullable(),
		scope: z.string().optional().nullable(),
		id_token: z.string().optional().nullable(),
		session_state: z.string().optional().nullable()
	})
	.strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		provider: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		providerAccountId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		refresh_token: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		access_token: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		expires_at: z
			.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		token_type: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		scope: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		id_token: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		session_state: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
	})
	.strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		provider: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		providerAccountId: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		refresh_token: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		access_token: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		expires_at: z
			.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		token_type: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		scope: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		id_token: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		session_state: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z
	.object({
		id: z.string().cuid().optional(),
		userId: z.string(),
		type: z.string(),
		provider: z.string(),
		providerAccountId: z.string(),
		refresh_token: z.string().optional().nullable(),
		access_token: z.string().optional().nullable(),
		expires_at: z.number().int().optional().nullable(),
		token_type: z.string().optional().nullable(),
		scope: z.string().optional().nullable(),
		id_token: z.string().optional().nullable(),
		session_state: z.string().optional().nullable()
	})
	.strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			provider: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			providerAccountId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			refresh_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			access_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			expires_at: z
				.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			token_type: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			scope: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			id_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			session_state: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			userId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			provider: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			providerAccountId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			refresh_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			access_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			expires_at: z
				.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			token_type: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			scope: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			id_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			session_state: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		sessionToken: z.string(),
		expires: z.coerce.date(),
		user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
	})
	.strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		sessionToken: z.string(),
		userId: z.string(),
		expires: z.coerce.date()
	})
	.strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		sessionToken: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		expires: z
			.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
			.optional(),
		user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
	})
	.strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		sessionToken: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		expires: z
			.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
			.optional()
	})
	.strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z
	.object({
		id: z.string().cuid().optional(),
		sessionToken: z.string(),
		userId: z.string(),
		expires: z.coerce.date()
	})
	.strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			sessionToken: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			expires: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			sessionToken: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			userId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			expires: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string().optional().nullable(),
		email: z.string().optional().nullable(),
		emailVerified: z.coerce.date().optional().nullable(),
		image: z.string().optional().nullable(),
		accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
		sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
		tenantUsers: z.lazy(() => TenantUserCreateNestedManyWithoutUserInputSchema).optional()
	})
	.strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string().optional().nullable(),
		email: z.string().optional().nullable(),
		emailVerified: z.coerce.date().optional().nullable(),
		image: z.string().optional().nullable(),
		accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
		sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
		tenantUsers: z.lazy(() => TenantUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
	})
	.strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		email: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		emailVerified: z
			.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		image: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
		sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
		tenantUsers: z.lazy(() => TenantUserUpdateManyWithoutUserNestedInputSchema).optional()
	})
	.strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		email: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		emailVerified: z
			.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		image: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
		sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
		tenantUsers: z.lazy(() => TenantUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
	})
	.strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string().optional().nullable(),
		email: z.string().optional().nullable(),
		emailVerified: z.coerce.date().optional().nullable(),
		image: z.string().optional().nullable()
	})
	.strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		email: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		emailVerified: z
			.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		image: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		email: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		emailVerified: z
			.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		image: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z
	.object({
		identifier: z.string(),
		token: z.string(),
		expires: z.coerce.date()
	})
	.strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> =
	z
		.object({
			identifier: z.string(),
			token: z.string(),
			expires: z.coerce.date()
		})
		.strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z
	.object({
		identifier: z
			.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		expires: z
			.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
			.optional()
	})
	.strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> =
	z
		.object({
			identifier: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			expires: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> =
	z
		.object({
			identifier: z.string(),
			token: z.string(),
			expires: z.coerce.date()
		})
		.strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> =
	z
		.object({
			identifier: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			expires: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> =
	z
		.object({
			identifier: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			expires: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const TenantUserCreateInputSchema: z.ZodType<Prisma.TenantUserCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		role: z.lazy(() => RoleSchema).optional(),
		tenant: z.lazy(() => TenantCreateNestedOneWithoutTenantUsersInputSchema),
		user: z.lazy(() => UserCreateNestedOneWithoutTenantUsersInputSchema),
		customForms: z.lazy(() => CustomFormCreateNestedManyWithoutUserInputSchema).optional(),
		customFieldResponses: z
			.lazy(() => CustomFieldResponseCreateNestedManyWithoutUserInputSchema)
			.optional()
	})
	.strict();

export const TenantUserUncheckedCreateInputSchema: z.ZodType<Prisma.TenantUserUncheckedCreateInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			tenantId: z.string(),
			userId: z.string(),
			customForms: z
				.lazy(() => CustomFormUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const TenantUserUpdateInputSchema: z.ZodType<Prisma.TenantUserUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		role: z
			.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
			.optional(),
		tenant: z.lazy(() => TenantUpdateOneRequiredWithoutTenantUsersNestedInputSchema).optional(),
		user: z.lazy(() => UserUpdateOneRequiredWithoutTenantUsersNestedInputSchema).optional(),
		customForms: z.lazy(() => CustomFormUpdateManyWithoutUserNestedInputSchema).optional(),
		customFieldResponses: z
			.lazy(() => CustomFieldResponseUpdateManyWithoutUserNestedInputSchema)
			.optional()
	})
	.strict();

export const TenantUserUncheckedUpdateInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			userId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			customForms: z
				.lazy(() => CustomFormUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const TenantUserCreateManyInputSchema: z.ZodType<Prisma.TenantUserCreateManyInput> = z
	.object({
		id: z.string().cuid().optional(),
		role: z.lazy(() => RoleSchema).optional(),
		tenantId: z.string(),
		userId: z.string()
	})
	.strict();

export const TenantUserUpdateManyMutationInputSchema: z.ZodType<Prisma.TenantUserUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const TenantUserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
		})
		.strict();

export const ClientCreateInputSchema: z.ZodType<Prisma.ClientCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string(),
		email: z.string(),
		phoneNumber: z
			.string()
			.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
				message: 'Invalid Number!'
			}),
		avatar: z.string().optional().nullable(),
		tenant: z.lazy(() => TenantCreateNestedOneWithoutClientsInputSchema)
	})
	.strict();

export const ClientUncheckedCreateInputSchema: z.ZodType<Prisma.ClientUncheckedCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string(),
		email: z.string(),
		phoneNumber: z
			.string()
			.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
				message: 'Invalid Number!'
			}),
		avatar: z.string().optional().nullable(),
		tenantId: z.string()
	})
	.strict();

export const ClientUpdateInputSchema: z.ZodType<Prisma.ClientUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		phoneNumber: z
			.union([
				z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
					message: 'Invalid Number!'
				}),
				z.lazy(() => StringFieldUpdateOperationsInputSchema)
			])
			.optional(),
		avatar: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		tenant: z.lazy(() => TenantUpdateOneRequiredWithoutClientsNestedInputSchema).optional()
	})
	.strict();

export const ClientUncheckedUpdateInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		phoneNumber: z
			.union([
				z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
					message: 'Invalid Number!'
				}),
				z.lazy(() => StringFieldUpdateOperationsInputSchema)
			])
			.optional(),
		avatar: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		tenantId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
	})
	.strict();

export const ClientCreateManyInputSchema: z.ZodType<Prisma.ClientCreateManyInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string(),
		email: z.string(),
		phoneNumber: z
			.string()
			.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
				message: 'Invalid Number!'
			}),
		avatar: z.string().optional().nullable(),
		tenantId: z.string()
	})
	.strict();

export const ClientUpdateManyMutationInputSchema: z.ZodType<Prisma.ClientUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			phoneNumber: z
				.union([
					z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
						message: 'Invalid Number!'
					}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema)
				])
				.optional(),
			avatar: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const ClientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			phoneNumber: z
				.union([
					z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
						message: 'Invalid Number!'
					}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema)
				])
				.optional(),
			avatar: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			tenantId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const TenantCreateInputSchema: z.ZodType<Prisma.TenantCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string(),
		email: z.string().optional().nullable(),
		isAdmin: z.boolean().optional(),
		clients: z.lazy(() => ClientCreateNestedManyWithoutTenantInputSchema).optional(),
		tenantUsers: z.lazy(() => TenantUserCreateNestedManyWithoutTenantInputSchema).optional()
	})
	.strict();

export const TenantUncheckedCreateInputSchema: z.ZodType<Prisma.TenantUncheckedCreateInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string(),
		email: z.string().optional().nullable(),
		isAdmin: z.boolean().optional(),
		clients: z.lazy(() => ClientUncheckedCreateNestedManyWithoutTenantInputSchema).optional(),
		tenantUsers: z
			.lazy(() => TenantUserUncheckedCreateNestedManyWithoutTenantInputSchema)
			.optional()
	})
	.strict();

export const TenantUpdateInputSchema: z.ZodType<Prisma.TenantUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		email: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
		clients: z.lazy(() => ClientUpdateManyWithoutTenantNestedInputSchema).optional(),
		tenantUsers: z.lazy(() => TenantUserUpdateManyWithoutTenantNestedInputSchema).optional()
	})
	.strict();

export const TenantUncheckedUpdateInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateInput> = z
	.object({
		id: z
			.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
			.optional(),
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		email: z
			.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
		clients: z.lazy(() => ClientUncheckedUpdateManyWithoutTenantNestedInputSchema).optional(),
		tenantUsers: z
			.lazy(() => TenantUserUncheckedUpdateManyWithoutTenantNestedInputSchema)
			.optional()
	})
	.strict();

export const TenantCreateManyInputSchema: z.ZodType<Prisma.TenantCreateManyInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string(),
		email: z.string().optional().nullable(),
		isAdmin: z.boolean().optional()
	})
	.strict();

export const TenantUpdateManyMutationInputSchema: z.ZodType<Prisma.TenantUpdateManyMutationInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional()
		})
		.strict();

export const TenantUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateManyInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional()
		})
		.strict();

export const CustomFormCreateInputSchema: z.ZodType<Prisma.CustomFormCreateInput> = z
	.object({
		name: z.string(),
		createdAt: z.coerce.date().optional(),
		user: z.lazy(() => TenantUserCreateNestedOneWithoutCustomFormsInputSchema),
		fields: z.lazy(() => CustomFieldCreateNestedManyWithoutFormInputSchema).optional()
	})
	.strict();

export const CustomFormUncheckedCreateInputSchema: z.ZodType<Prisma.CustomFormUncheckedCreateInput> =
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			tenantUserId: z.string(),
			createdAt: z.coerce.date().optional(),
			fields: z.lazy(() => CustomFieldUncheckedCreateNestedManyWithoutFormInputSchema).optional()
		})
		.strict();

export const CustomFormUpdateInputSchema: z.ZodType<Prisma.CustomFormUpdateInput> = z
	.object({
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		createdAt: z
			.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
			.optional(),
		user: z.lazy(() => TenantUserUpdateOneRequiredWithoutCustomFormsNestedInputSchema).optional(),
		fields: z.lazy(() => CustomFieldUpdateManyWithoutFormNestedInputSchema).optional()
	})
	.strict();

export const CustomFormUncheckedUpdateInputSchema: z.ZodType<Prisma.CustomFormUncheckedUpdateInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			tenantUserId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional(),
			fields: z.lazy(() => CustomFieldUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
		})
		.strict();

export const CustomFormCreateManyInputSchema: z.ZodType<Prisma.CustomFormCreateManyInput> = z
	.object({
		id: z.number().int().optional(),
		name: z.string(),
		tenantUserId: z.string(),
		createdAt: z.coerce.date().optional()
	})
	.strict();

export const CustomFormUpdateManyMutationInputSchema: z.ZodType<Prisma.CustomFormUpdateManyMutationInput> =
	z
		.object({
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFormUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CustomFormUncheckedUpdateManyInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			tenantUserId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFieldCreateInputSchema: z.ZodType<Prisma.CustomFieldCreateInput> = z
	.object({
		name: z.string(),
		type: z.lazy(() => FormFieldTypeSchema),
		required: z.boolean().optional().nullable(),
		form: z.lazy(() => CustomFormCreateNestedOneWithoutFieldsInputSchema),
		responses: z.lazy(() => CustomFieldResponseCreateNestedManyWithoutFieldInputSchema).optional()
	})
	.strict();

export const CustomFieldUncheckedCreateInputSchema: z.ZodType<Prisma.CustomFieldUncheckedCreateInput> =
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			type: z.lazy(() => FormFieldTypeSchema),
			required: z.boolean().optional().nullable(),
			formId: z.number().int(),
			responses: z
				.lazy(() => CustomFieldResponseUncheckedCreateNestedManyWithoutFieldInputSchema)
				.optional()
		})
		.strict();

export const CustomFieldUpdateInputSchema: z.ZodType<Prisma.CustomFieldUpdateInput> = z
	.object({
		name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
		type: z
			.union([
				z.lazy(() => FormFieldTypeSchema),
				z.lazy(() => EnumFormFieldTypeFieldUpdateOperationsInputSchema)
			])
			.optional(),
		required: z
			.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
			.optional()
			.nullable(),
		form: z.lazy(() => CustomFormUpdateOneRequiredWithoutFieldsNestedInputSchema).optional(),
		responses: z.lazy(() => CustomFieldResponseUpdateManyWithoutFieldNestedInputSchema).optional()
	})
	.strict();

export const CustomFieldUncheckedUpdateInputSchema: z.ZodType<Prisma.CustomFieldUncheckedUpdateInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			type: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => EnumFormFieldTypeFieldUpdateOperationsInputSchema)
				])
				.optional(),
			required: z
				.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			formId: z
				.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
				.optional(),
			responses: z
				.lazy(() => CustomFieldResponseUncheckedUpdateManyWithoutFieldNestedInputSchema)
				.optional()
		})
		.strict();

export const CustomFieldCreateManyInputSchema: z.ZodType<Prisma.CustomFieldCreateManyInput> = z
	.object({
		id: z.number().int().optional(),
		name: z.string(),
		type: z.lazy(() => FormFieldTypeSchema),
		required: z.boolean().optional().nullable(),
		formId: z.number().int()
	})
	.strict();

export const CustomFieldUpdateManyMutationInputSchema: z.ZodType<Prisma.CustomFieldUpdateManyMutationInput> =
	z
		.object({
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			type: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => EnumFormFieldTypeFieldUpdateOperationsInputSchema)
				])
				.optional(),
			required: z
				.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const CustomFieldUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CustomFieldUncheckedUpdateManyInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			type: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => EnumFormFieldTypeFieldUpdateOperationsInputSchema)
				])
				.optional(),
			required: z
				.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			formId: z
				.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFieldResponseCreateInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateInput> =
	z
		.object({
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			user: z.lazy(() => TenantUserCreateNestedOneWithoutCustomFieldResponsesInputSchema),
			field: z.lazy(() => CustomFieldCreateNestedOneWithoutResponsesInputSchema)
		})
		.strict();

export const CustomFieldResponseUncheckedCreateInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedCreateInput> =
	z
		.object({
			id: z.number().int().optional(),
			content: z.string(),
			tenantUserId: z.string(),
			fieldId: z.number().int(),
			createdAt: z.coerce.date().optional()
		})
		.strict();

export const CustomFieldResponseUpdateInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateInput> =
	z
		.object({
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional(),
			user: z
				.lazy(() => TenantUserUpdateOneRequiredWithoutCustomFieldResponsesNestedInputSchema)
				.optional(),
			field: z.lazy(() => CustomFieldUpdateOneRequiredWithoutResponsesNestedInputSchema).optional()
		})
		.strict();

export const CustomFieldResponseUncheckedUpdateInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedUpdateInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantUserId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			fieldId: z
				.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFieldResponseCreateManyInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateManyInput> =
	z
		.object({
			id: z.number().int().optional(),
			content: z.string(),
			tenantUserId: z.string(),
			fieldId: z.number().int(),
			createdAt: z.coerce.date().optional()
		})
		.strict();

export const CustomFieldResponseUpdateManyMutationInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateManyMutationInput> =
	z
		.object({
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFieldResponseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedUpdateManyInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantUserId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			fieldId: z
				.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
	.object({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional()
	})
	.strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z
	.object({
		equals: z.string().optional().nullable(),
		in: z.string().array().optional().nullable(),
		notIn: z.string().array().optional().nullable(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
	.object({
		equals: z.number().optional().nullable(),
		in: z.number().array().optional().nullable(),
		notIn: z.number().array().optional().nullable(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z
	.object({
		is: z.lazy(() => UserWhereInputSchema).optional(),
		isNot: z.lazy(() => UserWhereInputSchema).optional()
	})
	.strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z
	.object({
		sort: z.lazy(() => SortOrderSchema),
		nulls: z.lazy(() => NullsOrderSchema).optional()
	})
	.strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> =
	z
		.object({
			provider: z.string(),
			providerAccountId: z.string()
		})
		.strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			refresh_token: z.lazy(() => SortOrderSchema).optional(),
			access_token: z.lazy(() => SortOrderSchema).optional(),
			expires_at: z.lazy(() => SortOrderSchema).optional(),
			token_type: z.lazy(() => SortOrderSchema).optional(),
			scope: z.lazy(() => SortOrderSchema).optional(),
			id_token: z.lazy(() => SortOrderSchema).optional(),
			session_state: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> =
	z
		.object({
			expires_at: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			refresh_token: z.lazy(() => SortOrderSchema).optional(),
			access_token: z.lazy(() => SortOrderSchema).optional(),
			expires_at: z.lazy(() => SortOrderSchema).optional(),
			token_type: z.lazy(() => SortOrderSchema).optional(),
			scope: z.lazy(() => SortOrderSchema).optional(),
			id_token: z.lazy(() => SortOrderSchema).optional(),
			session_state: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			provider: z.lazy(() => SortOrderSchema).optional(),
			providerAccountId: z.lazy(() => SortOrderSchema).optional(),
			refresh_token: z.lazy(() => SortOrderSchema).optional(),
			access_token: z.lazy(() => SortOrderSchema).optional(),
			expires_at: z.lazy(() => SortOrderSchema).optional(),
			token_type: z.lazy(() => SortOrderSchema).optional(),
			scope: z.lazy(() => SortOrderSchema).optional(),
			id_token: z.lazy(() => SortOrderSchema).optional(),
			session_state: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> =
	z
		.object({
			expires_at: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z
	.object({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		mode: z.lazy(() => QueryModeSchema).optional(),
		not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedStringFilterSchema).optional(),
		_max: z.lazy(() => NestedStringFilterSchema).optional()
	})
	.strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.string().optional().nullable(),
			in: z.string().array().optional().nullable(),
			notIn: z.string().array().optional().nullable(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			mode: z.lazy(() => QueryModeSchema).optional(),
			not: z
				.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedStringNullableFilterSchema).optional()
		})
		.strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.number().optional().nullable(),
			in: z.number().array().optional().nullable(),
			notIn: z.number().array().optional().nullable(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
			_sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedIntNullableFilterSchema).optional()
		})
		.strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
	.object({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional()
	})
	.strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			sessionToken: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			sessionToken: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			sessionToken: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z
	.object({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
		_max: z.lazy(() => NestedDateTimeFilterSchema).optional()
	})
	.strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z
	.object({
		equals: z.coerce.date().optional().nullable(),
		in: z.coerce.date().array().optional().nullable(),
		notIn: z.coerce.date().array().optional().nullable(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z
	.object({
		every: z.lazy(() => AccountWhereInputSchema).optional(),
		some: z.lazy(() => AccountWhereInputSchema).optional(),
		none: z.lazy(() => AccountWhereInputSchema).optional()
	})
	.strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z
	.object({
		every: z.lazy(() => SessionWhereInputSchema).optional(),
		some: z.lazy(() => SessionWhereInputSchema).optional(),
		none: z.lazy(() => SessionWhereInputSchema).optional()
	})
	.strict();

export const TenantUserListRelationFilterSchema: z.ZodType<Prisma.TenantUserListRelationFilter> = z
	.object({
		every: z.lazy(() => TenantUserWhereInputSchema).optional(),
		some: z.lazy(() => TenantUserWhereInputSchema).optional(),
		none: z.lazy(() => TenantUserWhereInputSchema).optional()
	})
	.strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const TenantUserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TenantUserOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			emailVerified: z.lazy(() => SortOrderSchema).optional(),
			image: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		email: z.lazy(() => SortOrderSchema).optional(),
		emailVerified: z.lazy(() => SortOrderSchema).optional(),
		image: z.lazy(() => SortOrderSchema).optional()
	})
	.strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z
	.object({
		id: z.lazy(() => SortOrderSchema).optional(),
		name: z.lazy(() => SortOrderSchema).optional(),
		email: z.lazy(() => SortOrderSchema).optional(),
		emailVerified: z.lazy(() => SortOrderSchema).optional(),
		image: z.lazy(() => SortOrderSchema).optional()
	})
	.strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.coerce.date().optional().nullable(),
			in: z.coerce.date().array().optional().nullable(),
			notIn: z.coerce.date().array().optional().nullable(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
		})
		.strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> =
	z
		.object({
			identifier: z.string(),
			token: z.string()
		})
		.strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> =
	z
		.object({
			identifier: z.lazy(() => SortOrderSchema).optional(),
			token: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> =
	z
		.object({
			identifier: z.lazy(() => SortOrderSchema).optional(),
			token: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> =
	z
		.object({
			identifier: z.lazy(() => SortOrderSchema).optional(),
			token: z.lazy(() => SortOrderSchema).optional(),
			expires: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z
	.object({
		equals: z.lazy(() => RoleSchema).optional(),
		in: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema)]).optional()
	})
	.strict();

export const TenantRelationFilterSchema: z.ZodType<Prisma.TenantRelationFilter> = z
	.object({
		is: z.lazy(() => TenantWhereInputSchema).optional(),
		isNot: z.lazy(() => TenantWhereInputSchema).optional()
	})
	.strict();

export const CustomFormListRelationFilterSchema: z.ZodType<Prisma.CustomFormListRelationFilter> = z
	.object({
		every: z.lazy(() => CustomFormWhereInputSchema).optional(),
		some: z.lazy(() => CustomFormWhereInputSchema).optional(),
		none: z.lazy(() => CustomFormWhereInputSchema).optional()
	})
	.strict();

export const CustomFieldResponseListRelationFilterSchema: z.ZodType<Prisma.CustomFieldResponseListRelationFilter> =
	z
		.object({
			every: z.lazy(() => CustomFieldResponseWhereInputSchema).optional(),
			some: z.lazy(() => CustomFieldResponseWhereInputSchema).optional(),
			none: z.lazy(() => CustomFieldResponseWhereInputSchema).optional()
		})
		.strict();

export const CustomFormOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CustomFormOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFieldResponseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CustomFieldResponseOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const TenantUserCountOrderByAggregateInputSchema: z.ZodType<Prisma.TenantUserCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const TenantUserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TenantUserMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const TenantUserMinOrderByAggregateInputSchema: z.ZodType<Prisma.TenantUserMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			role: z.lazy(() => SortOrderSchema).optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional(),
			userId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z
	.object({
		equals: z.lazy(() => RoleSchema).optional(),
		in: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		not: z
			.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema)])
			.optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
		_max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
	})
	.strict();

export const ClientCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClientCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			phoneNumber: z.lazy(() => SortOrderSchema).optional(),
			avatar: z.lazy(() => SortOrderSchema).optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const ClientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			phoneNumber: z.lazy(() => SortOrderSchema).optional(),
			avatar: z.lazy(() => SortOrderSchema).optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const ClientMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			phoneNumber: z.lazy(() => SortOrderSchema).optional(),
			avatar: z.lazy(() => SortOrderSchema).optional(),
			tenantId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
	.object({
		equals: z.boolean().optional(),
		not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional()
	})
	.strict();

export const ClientListRelationFilterSchema: z.ZodType<Prisma.ClientListRelationFilter> = z
	.object({
		every: z.lazy(() => ClientWhereInputSchema).optional(),
		some: z.lazy(() => ClientWhereInputSchema).optional(),
		none: z.lazy(() => ClientWhereInputSchema).optional()
	})
	.strict();

export const ClientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ClientOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const TenantCountOrderByAggregateInputSchema: z.ZodType<Prisma.TenantCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			isAdmin: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const TenantMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TenantMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			isAdmin: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const TenantMinOrderByAggregateInputSchema: z.ZodType<Prisma.TenantMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			email: z.lazy(() => SortOrderSchema).optional(),
			isAdmin: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z
	.object({
		equals: z.boolean().optional(),
		not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedBoolFilterSchema).optional(),
		_max: z.lazy(() => NestedBoolFilterSchema).optional()
	})
	.strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional()
	})
	.strict();

export const TenantUserRelationFilterSchema: z.ZodType<Prisma.TenantUserRelationFilter> = z
	.object({
		is: z.lazy(() => TenantUserWhereInputSchema).optional(),
		isNot: z.lazy(() => TenantUserWhereInputSchema).optional()
	})
	.strict();

export const CustomFieldListRelationFilterSchema: z.ZodType<Prisma.CustomFieldListRelationFilter> =
	z
		.object({
			every: z.lazy(() => CustomFieldWhereInputSchema).optional(),
			some: z.lazy(() => CustomFieldWhereInputSchema).optional(),
			none: z.lazy(() => CustomFieldWhereInputSchema).optional()
		})
		.strict();

export const CustomFieldOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CustomFieldOrderByRelationAggregateInput> =
	z
		.object({
			_count: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFormCountOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFormCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFormAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFormAvgOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFormMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFormMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFormMinOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFormMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFormSumOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFormSumOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
		_count: z.lazy(() => NestedIntFilterSchema).optional(),
		_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
		_sum: z.lazy(() => NestedIntFilterSchema).optional(),
		_min: z.lazy(() => NestedIntFilterSchema).optional(),
		_max: z.lazy(() => NestedIntFilterSchema).optional()
	})
	.strict();

export const EnumFormFieldTypeFilterSchema: z.ZodType<Prisma.EnumFormFieldTypeFilter> = z
	.object({
		equals: z.lazy(() => FormFieldTypeSchema).optional(),
		in: z
			.lazy(() => FormFieldTypeSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => FormFieldTypeSchema)
			.array()
			.optional(),
		not: z
			.union([z.lazy(() => FormFieldTypeSchema), z.lazy(() => NestedEnumFormFieldTypeFilterSchema)])
			.optional()
	})
	.strict();

export const BoolNullableFilterSchema: z.ZodType<Prisma.BoolNullableFilter> = z
	.object({
		equals: z.boolean().optional().nullable(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const CustomFormRelationFilterSchema: z.ZodType<Prisma.CustomFormRelationFilter> = z
	.object({
		is: z.lazy(() => CustomFormWhereInputSchema).optional(),
		isNot: z.lazy(() => CustomFormWhereInputSchema).optional()
	})
	.strict();

export const CustomFieldCountOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			required: z.lazy(() => SortOrderSchema).optional(),
			formId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFieldAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldAvgOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			formId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFieldMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			required: z.lazy(() => SortOrderSchema).optional(),
			formId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFieldMinOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			name: z.lazy(() => SortOrderSchema).optional(),
			type: z.lazy(() => SortOrderSchema).optional(),
			required: z.lazy(() => SortOrderSchema).optional(),
			formId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFieldSumOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldSumOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			formId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const EnumFormFieldTypeWithAggregatesFilterSchema: z.ZodType<Prisma.EnumFormFieldTypeWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => FormFieldTypeSchema).optional(),
			in: z
				.lazy(() => FormFieldTypeSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => FormFieldTypeSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => NestedEnumFormFieldTypeWithAggregatesFilterSchema)
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumFormFieldTypeFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumFormFieldTypeFilterSchema).optional()
		})
		.strict();

export const BoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.BoolNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.boolean().optional().nullable(),
			not: z
				.union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema)])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
		})
		.strict();

export const CustomFieldRelationFilterSchema: z.ZodType<Prisma.CustomFieldRelationFilter> = z
	.object({
		is: z.lazy(() => CustomFieldWhereInputSchema).optional(),
		isNot: z.lazy(() => CustomFieldWhereInputSchema).optional()
	})
	.strict();

export const CustomFieldResponseCountOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldResponseCountOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			fieldId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFieldResponseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldResponseAvgOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			fieldId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFieldResponseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldResponseMaxOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			fieldId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFieldResponseMinOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldResponseMinOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			content: z.lazy(() => SortOrderSchema).optional(),
			tenantUserId: z.lazy(() => SortOrderSchema).optional(),
			fieldId: z.lazy(() => SortOrderSchema).optional(),
			createdAt: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const CustomFieldResponseSumOrderByAggregateInputSchema: z.ZodType<Prisma.CustomFieldResponseSumOrderByAggregateInput> =
	z
		.object({
			id: z.lazy(() => SortOrderSchema).optional(),
			fieldId: z.lazy(() => SortOrderSchema).optional()
		})
		.strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutAccountsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
		})
		.strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
	z
		.object({
			set: z.string().optional()
		})
		.strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
	z
		.object({
			set: z.string().optional().nullable()
		})
		.strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
	z
		.object({
			set: z.number().optional().nullable(),
			increment: z.number().optional(),
			decrement: z.number().optional(),
			multiply: z.number().optional(),
			divide: z.number().optional()
		})
		.strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutAccountsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
			upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),
					z.lazy(() => UserUpdateWithoutAccountsInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)
				])
				.optional()
		})
		.strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutSessionsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
		})
		.strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
	z
		.object({
			set: z.coerce.date().optional()
		})
		.strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutSessionsInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
			upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),
					z.lazy(() => UserUpdateWithoutSessionsInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)
				])
				.optional()
		})
		.strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AccountCreateWithoutUserInputSchema),
					z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SessionCreateWithoutUserInputSchema),
					z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
					z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TenantUserCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutUserInputSchema),
					z.lazy(() => TenantUserCreateWithoutUserInputSchema).array(),
					z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TenantUserCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => TenantUserCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => TenantUserCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AccountCreateWithoutUserInputSchema),
					z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SessionCreateWithoutUserInputSchema),
					z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
					z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.TenantUserUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutUserInputSchema),
					z.lazy(() => TenantUserCreateWithoutUserInputSchema).array(),
					z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TenantUserCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => TenantUserCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => TenantUserCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
	z
		.object({
			set: z.coerce.date().optional().nullable()
		})
		.strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AccountCreateWithoutUserInputSchema),
					z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => AccountScalarWhereInputSchema),
					z.lazy(() => AccountScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SessionCreateWithoutUserInputSchema),
					z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
					z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => SessionScalarWhereInputSchema),
					z.lazy(() => SessionScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TenantUserUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutUserInputSchema),
					z.lazy(() => TenantUserCreateWithoutUserInputSchema).array(),
					z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TenantUserCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => TenantUserCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => TenantUserUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => TenantUserUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => TenantUserCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => TenantUserUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => TenantUserUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => TenantUserUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => TenantUserUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TenantUserScalarWhereInputSchema),
					z.lazy(() => TenantUserScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => AccountCreateWithoutUserInputSchema),
					z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => AccountWhereUniqueInputSchema),
					z.lazy(() => AccountWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => AccountScalarWhereInputSchema),
					z.lazy(() => AccountScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => SessionCreateWithoutUserInputSchema),
					z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
					z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => SessionWhereUniqueInputSchema),
					z.lazy(() => SessionWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => SessionScalarWhereInputSchema),
					z.lazy(() => SessionScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutUserInputSchema),
					z.lazy(() => TenantUserCreateWithoutUserInputSchema).array(),
					z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TenantUserCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => TenantUserCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => TenantUserUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => TenantUserUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => TenantUserCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => TenantUserUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => TenantUserUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => TenantUserUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => TenantUserUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TenantUserScalarWhereInputSchema),
					z.lazy(() => TenantUserScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantCreateNestedOneWithoutTenantUsersInputSchema: z.ZodType<Prisma.TenantCreateNestedOneWithoutTenantUsersInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantCreateWithoutTenantUsersInputSchema),
					z.lazy(() => TenantUncheckedCreateWithoutTenantUsersInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => TenantCreateOrConnectWithoutTenantUsersInputSchema).optional(),
			connect: z.lazy(() => TenantWhereUniqueInputSchema).optional()
		})
		.strict();

export const UserCreateNestedOneWithoutTenantUsersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTenantUsersInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutTenantUsersInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutTenantUsersInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTenantUsersInputSchema).optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
		})
		.strict();

export const CustomFormCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CustomFormCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFormCreateWithoutUserInputSchema),
					z.lazy(() => CustomFormCreateWithoutUserInputSchema).array(),
					z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFormCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => CustomFormCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFormCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema).array(),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldResponseCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFormUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CustomFormUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFormCreateWithoutUserInputSchema),
					z.lazy(() => CustomFormCreateWithoutUserInputSchema).array(),
					z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFormCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => CustomFormCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFormCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedCreateNestedManyWithoutUserInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema).array(),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldResponseCreateManyUserInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => RoleSchema).optional()
		})
		.strict();

export const TenantUpdateOneRequiredWithoutTenantUsersNestedInputSchema: z.ZodType<Prisma.TenantUpdateOneRequiredWithoutTenantUsersNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantCreateWithoutTenantUsersInputSchema),
					z.lazy(() => TenantUncheckedCreateWithoutTenantUsersInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => TenantCreateOrConnectWithoutTenantUsersInputSchema).optional(),
			upsert: z.lazy(() => TenantUpsertWithoutTenantUsersInputSchema).optional(),
			connect: z.lazy(() => TenantWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => TenantUpdateToOneWithWhereWithoutTenantUsersInputSchema),
					z.lazy(() => TenantUpdateWithoutTenantUsersInputSchema),
					z.lazy(() => TenantUncheckedUpdateWithoutTenantUsersInputSchema)
				])
				.optional()
		})
		.strict();

export const UserUpdateOneRequiredWithoutTenantUsersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutTenantUsersNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => UserCreateWithoutTenantUsersInputSchema),
					z.lazy(() => UserUncheckedCreateWithoutTenantUsersInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTenantUsersInputSchema).optional(),
			upsert: z.lazy(() => UserUpsertWithoutTenantUsersInputSchema).optional(),
			connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => UserUpdateToOneWithWhereWithoutTenantUsersInputSchema),
					z.lazy(() => UserUpdateWithoutTenantUsersInputSchema),
					z.lazy(() => UserUncheckedUpdateWithoutTenantUsersInputSchema)
				])
				.optional()
		})
		.strict();

export const CustomFormUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CustomFormUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFormCreateWithoutUserInputSchema),
					z.lazy(() => CustomFormCreateWithoutUserInputSchema).array(),
					z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFormCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => CustomFormCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => CustomFormUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => CustomFormUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFormCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => CustomFormUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => CustomFormUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => CustomFormUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => CustomFormUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => CustomFormScalarWhereInputSchema),
					z.lazy(() => CustomFormScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema).array(),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => CustomFieldResponseUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldResponseCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => CustomFieldResponseUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => CustomFieldResponseUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema),
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFormUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CustomFormUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFormCreateWithoutUserInputSchema),
					z.lazy(() => CustomFormCreateWithoutUserInputSchema).array(),
					z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFormCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => CustomFormCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => CustomFormUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => CustomFormUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFormCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => CustomFormWhereUniqueInputSchema),
					z.lazy(() => CustomFormWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => CustomFormUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => CustomFormUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => CustomFormUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => CustomFormUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => CustomFormScalarWhereInputSchema),
					z.lazy(() => CustomFormScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedUpdateManyWithoutUserNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema).array(),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutUserInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => CustomFieldResponseUpsertWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUpsertWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldResponseCreateManyUserInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => CustomFieldResponseUpdateWithWhereUniqueWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUpdateWithWhereUniqueWithoutUserInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => CustomFieldResponseUpdateManyWithWhereWithoutUserInputSchema),
					z.lazy(() => CustomFieldResponseUpdateManyWithWhereWithoutUserInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema),
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantCreateNestedOneWithoutClientsInputSchema: z.ZodType<Prisma.TenantCreateNestedOneWithoutClientsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantCreateWithoutClientsInputSchema),
					z.lazy(() => TenantUncheckedCreateWithoutClientsInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => TenantCreateOrConnectWithoutClientsInputSchema).optional(),
			connect: z.lazy(() => TenantWhereUniqueInputSchema).optional()
		})
		.strict();

export const TenantUpdateOneRequiredWithoutClientsNestedInputSchema: z.ZodType<Prisma.TenantUpdateOneRequiredWithoutClientsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantCreateWithoutClientsInputSchema),
					z.lazy(() => TenantUncheckedCreateWithoutClientsInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => TenantCreateOrConnectWithoutClientsInputSchema).optional(),
			upsert: z.lazy(() => TenantUpsertWithoutClientsInputSchema).optional(),
			connect: z.lazy(() => TenantWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => TenantUpdateToOneWithWhereWithoutClientsInputSchema),
					z.lazy(() => TenantUpdateWithoutClientsInputSchema),
					z.lazy(() => TenantUncheckedUpdateWithoutClientsInputSchema)
				])
				.optional()
		})
		.strict();

export const ClientCreateNestedManyWithoutTenantInputSchema: z.ZodType<Prisma.ClientCreateNestedManyWithoutTenantInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ClientCreateWithoutTenantInputSchema),
					z.lazy(() => ClientCreateWithoutTenantInputSchema).array(),
					z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema),
					z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ClientCreateOrConnectWithoutTenantInputSchema),
					z.lazy(() => ClientCreateOrConnectWithoutTenantInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => ClientCreateManyTenantInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserCreateNestedManyWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserCreateNestedManyWithoutTenantInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutTenantInputSchema),
					z.lazy(() => TenantUserCreateWithoutTenantInputSchema).array(),
					z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TenantUserCreateOrConnectWithoutTenantInputSchema),
					z.lazy(() => TenantUserCreateOrConnectWithoutTenantInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => TenantUserCreateManyTenantInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const ClientUncheckedCreateNestedManyWithoutTenantInputSchema: z.ZodType<Prisma.ClientUncheckedCreateNestedManyWithoutTenantInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ClientCreateWithoutTenantInputSchema),
					z.lazy(() => ClientCreateWithoutTenantInputSchema).array(),
					z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema),
					z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ClientCreateOrConnectWithoutTenantInputSchema),
					z.lazy(() => ClientCreateOrConnectWithoutTenantInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => ClientCreateManyTenantInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserUncheckedCreateNestedManyWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserUncheckedCreateNestedManyWithoutTenantInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutTenantInputSchema),
					z.lazy(() => TenantUserCreateWithoutTenantInputSchema).array(),
					z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TenantUserCreateOrConnectWithoutTenantInputSchema),
					z.lazy(() => TenantUserCreateOrConnectWithoutTenantInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => TenantUserCreateManyTenantInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
	z
		.object({
			set: z.boolean().optional()
		})
		.strict();

export const ClientUpdateManyWithoutTenantNestedInputSchema: z.ZodType<Prisma.ClientUpdateManyWithoutTenantNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ClientCreateWithoutTenantInputSchema),
					z.lazy(() => ClientCreateWithoutTenantInputSchema).array(),
					z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema),
					z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ClientCreateOrConnectWithoutTenantInputSchema),
					z.lazy(() => ClientCreateOrConnectWithoutTenantInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => ClientUpsertWithWhereUniqueWithoutTenantInputSchema),
					z.lazy(() => ClientUpsertWithWhereUniqueWithoutTenantInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => ClientCreateManyTenantInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => ClientUpdateWithWhereUniqueWithoutTenantInputSchema),
					z.lazy(() => ClientUpdateWithWhereUniqueWithoutTenantInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => ClientUpdateManyWithWhereWithoutTenantInputSchema),
					z.lazy(() => ClientUpdateManyWithWhereWithoutTenantInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ClientScalarWhereInputSchema),
					z.lazy(() => ClientScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserUpdateManyWithoutTenantNestedInputSchema: z.ZodType<Prisma.TenantUserUpdateManyWithoutTenantNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutTenantInputSchema),
					z.lazy(() => TenantUserCreateWithoutTenantInputSchema).array(),
					z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TenantUserCreateOrConnectWithoutTenantInputSchema),
					z.lazy(() => TenantUserCreateOrConnectWithoutTenantInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => TenantUserUpsertWithWhereUniqueWithoutTenantInputSchema),
					z.lazy(() => TenantUserUpsertWithWhereUniqueWithoutTenantInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => TenantUserCreateManyTenantInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => TenantUserUpdateWithWhereUniqueWithoutTenantInputSchema),
					z.lazy(() => TenantUserUpdateWithWhereUniqueWithoutTenantInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => TenantUserUpdateManyWithWhereWithoutTenantInputSchema),
					z.lazy(() => TenantUserUpdateManyWithWhereWithoutTenantInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TenantUserScalarWhereInputSchema),
					z.lazy(() => TenantUserScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const ClientUncheckedUpdateManyWithoutTenantNestedInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyWithoutTenantNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => ClientCreateWithoutTenantInputSchema),
					z.lazy(() => ClientCreateWithoutTenantInputSchema).array(),
					z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema),
					z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => ClientCreateOrConnectWithoutTenantInputSchema),
					z.lazy(() => ClientCreateOrConnectWithoutTenantInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => ClientUpsertWithWhereUniqueWithoutTenantInputSchema),
					z.lazy(() => ClientUpsertWithWhereUniqueWithoutTenantInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => ClientCreateManyTenantInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => ClientWhereUniqueInputSchema),
					z.lazy(() => ClientWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => ClientUpdateWithWhereUniqueWithoutTenantInputSchema),
					z.lazy(() => ClientUpdateWithWhereUniqueWithoutTenantInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => ClientUpdateManyWithWhereWithoutTenantInputSchema),
					z.lazy(() => ClientUpdateManyWithWhereWithoutTenantInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => ClientScalarWhereInputSchema),
					z.lazy(() => ClientScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserUncheckedUpdateManyWithoutTenantNestedInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateManyWithoutTenantNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutTenantInputSchema),
					z.lazy(() => TenantUserCreateWithoutTenantInputSchema).array(),
					z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => TenantUserCreateOrConnectWithoutTenantInputSchema),
					z.lazy(() => TenantUserCreateOrConnectWithoutTenantInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => TenantUserUpsertWithWhereUniqueWithoutTenantInputSchema),
					z.lazy(() => TenantUserUpsertWithWhereUniqueWithoutTenantInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => TenantUserCreateManyTenantInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => TenantUserWhereUniqueInputSchema),
					z.lazy(() => TenantUserWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => TenantUserUpdateWithWhereUniqueWithoutTenantInputSchema),
					z.lazy(() => TenantUserUpdateWithWhereUniqueWithoutTenantInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => TenantUserUpdateManyWithWhereWithoutTenantInputSchema),
					z.lazy(() => TenantUserUpdateManyWithWhereWithoutTenantInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => TenantUserScalarWhereInputSchema),
					z.lazy(() => TenantUserScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserCreateNestedOneWithoutCustomFormsInputSchema: z.ZodType<Prisma.TenantUserCreateNestedOneWithoutCustomFormsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutCustomFormsInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutCustomFormsInputSchema)
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => TenantUserCreateOrConnectWithoutCustomFormsInputSchema)
				.optional(),
			connect: z.lazy(() => TenantUserWhereUniqueInputSchema).optional()
		})
		.strict();

export const CustomFieldCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldCreateNestedManyWithoutFormInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldCreateWithoutFormInputSchema),
					z.lazy(() => CustomFieldCreateWithoutFormInputSchema).array(),
					z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema),
					z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldCreateOrConnectWithoutFormInputSchema),
					z.lazy(() => CustomFieldCreateOrConnectWithoutFormInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldCreateManyFormInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFieldUncheckedCreateNestedManyWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldUncheckedCreateNestedManyWithoutFormInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldCreateWithoutFormInputSchema),
					z.lazy(() => CustomFieldCreateWithoutFormInputSchema).array(),
					z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema),
					z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldCreateOrConnectWithoutFormInputSchema),
					z.lazy(() => CustomFieldCreateOrConnectWithoutFormInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldCreateManyFormInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserUpdateOneRequiredWithoutCustomFormsNestedInputSchema: z.ZodType<Prisma.TenantUserUpdateOneRequiredWithoutCustomFormsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutCustomFormsInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutCustomFormsInputSchema)
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => TenantUserCreateOrConnectWithoutCustomFormsInputSchema)
				.optional(),
			upsert: z.lazy(() => TenantUserUpsertWithoutCustomFormsInputSchema).optional(),
			connect: z.lazy(() => TenantUserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => TenantUserUpdateToOneWithWhereWithoutCustomFormsInputSchema),
					z.lazy(() => TenantUserUpdateWithoutCustomFormsInputSchema),
					z.lazy(() => TenantUserUncheckedUpdateWithoutCustomFormsInputSchema)
				])
				.optional()
		})
		.strict();

export const CustomFieldUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.CustomFieldUpdateManyWithoutFormNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldCreateWithoutFormInputSchema),
					z.lazy(() => CustomFieldCreateWithoutFormInputSchema).array(),
					z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema),
					z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldCreateOrConnectWithoutFormInputSchema),
					z.lazy(() => CustomFieldCreateOrConnectWithoutFormInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => CustomFieldUpsertWithWhereUniqueWithoutFormInputSchema),
					z.lazy(() => CustomFieldUpsertWithWhereUniqueWithoutFormInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldCreateManyFormInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => CustomFieldUpdateWithWhereUniqueWithoutFormInputSchema),
					z.lazy(() => CustomFieldUpdateWithWhereUniqueWithoutFormInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => CustomFieldUpdateManyWithWhereWithoutFormInputSchema),
					z.lazy(() => CustomFieldUpdateManyWithWhereWithoutFormInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => CustomFieldScalarWhereInputSchema),
					z.lazy(() => CustomFieldScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
	z
		.object({
			set: z.number().optional(),
			increment: z.number().optional(),
			decrement: z.number().optional(),
			multiply: z.number().optional(),
			divide: z.number().optional()
		})
		.strict();

export const CustomFieldUncheckedUpdateManyWithoutFormNestedInputSchema: z.ZodType<Prisma.CustomFieldUncheckedUpdateManyWithoutFormNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldCreateWithoutFormInputSchema),
					z.lazy(() => CustomFieldCreateWithoutFormInputSchema).array(),
					z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema),
					z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldCreateOrConnectWithoutFormInputSchema),
					z.lazy(() => CustomFieldCreateOrConnectWithoutFormInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => CustomFieldUpsertWithWhereUniqueWithoutFormInputSchema),
					z.lazy(() => CustomFieldUpsertWithWhereUniqueWithoutFormInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldCreateManyFormInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldWhereUniqueInputSchema),
					z.lazy(() => CustomFieldWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => CustomFieldUpdateWithWhereUniqueWithoutFormInputSchema),
					z.lazy(() => CustomFieldUpdateWithWhereUniqueWithoutFormInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => CustomFieldUpdateManyWithWhereWithoutFormInputSchema),
					z.lazy(() => CustomFieldUpdateManyWithWhereWithoutFormInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => CustomFieldScalarWhereInputSchema),
					z.lazy(() => CustomFieldScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFormCreateNestedOneWithoutFieldsInputSchema: z.ZodType<Prisma.CustomFormCreateNestedOneWithoutFieldsInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFormCreateWithoutFieldsInputSchema),
					z.lazy(() => CustomFormUncheckedCreateWithoutFieldsInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => CustomFormCreateOrConnectWithoutFieldsInputSchema).optional(),
			connect: z.lazy(() => CustomFormWhereUniqueInputSchema).optional()
		})
		.strict();

export const CustomFieldResponseCreateNestedManyWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateNestedManyWithoutFieldInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema).array(),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutFieldInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldResponseCreateManyFieldInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseUncheckedCreateNestedManyWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedCreateNestedManyWithoutFieldInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema).array(),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutFieldInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldResponseCreateManyFieldInputEnvelopeSchema).optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional()
		})
		.strict();

export const EnumFormFieldTypeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumFormFieldTypeFieldUpdateOperationsInput> =
	z
		.object({
			set: z.lazy(() => FormFieldTypeSchema).optional()
		})
		.strict();

export const NullableBoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableBoolFieldUpdateOperationsInput> =
	z
		.object({
			set: z.boolean().optional().nullable()
		})
		.strict();

export const CustomFormUpdateOneRequiredWithoutFieldsNestedInputSchema: z.ZodType<Prisma.CustomFormUpdateOneRequiredWithoutFieldsNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFormCreateWithoutFieldsInputSchema),
					z.lazy(() => CustomFormUncheckedCreateWithoutFieldsInputSchema)
				])
				.optional(),
			connectOrCreate: z.lazy(() => CustomFormCreateOrConnectWithoutFieldsInputSchema).optional(),
			upsert: z.lazy(() => CustomFormUpsertWithoutFieldsInputSchema).optional(),
			connect: z.lazy(() => CustomFormWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => CustomFormUpdateToOneWithWhereWithoutFieldsInputSchema),
					z.lazy(() => CustomFormUpdateWithoutFieldsInputSchema),
					z.lazy(() => CustomFormUncheckedUpdateWithoutFieldsInputSchema)
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseUpdateManyWithoutFieldNestedInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateManyWithoutFieldNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema).array(),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutFieldInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => CustomFieldResponseUpsertWithWhereUniqueWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUpsertWithWhereUniqueWithoutFieldInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldResponseCreateManyFieldInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => CustomFieldResponseUpdateWithWhereUniqueWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUpdateWithWhereUniqueWithoutFieldInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => CustomFieldResponseUpdateManyWithWhereWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUpdateManyWithWhereWithoutFieldInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema),
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseUncheckedUpdateManyWithoutFieldNestedInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedUpdateManyWithoutFieldNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema).array(),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema).array()
				])
				.optional(),
			connectOrCreate: z
				.union([
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseCreateOrConnectWithoutFieldInputSchema).array()
				])
				.optional(),
			upsert: z
				.union([
					z.lazy(() => CustomFieldResponseUpsertWithWhereUniqueWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUpsertWithWhereUniqueWithoutFieldInputSchema).array()
				])
				.optional(),
			createMany: z.lazy(() => CustomFieldResponseCreateManyFieldInputEnvelopeSchema).optional(),
			set: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			disconnect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			delete: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			connect: z
				.union([
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
					z.lazy(() => CustomFieldResponseWhereUniqueInputSchema).array()
				])
				.optional(),
			update: z
				.union([
					z.lazy(() => CustomFieldResponseUpdateWithWhereUniqueWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUpdateWithWhereUniqueWithoutFieldInputSchema).array()
				])
				.optional(),
			updateMany: z
				.union([
					z.lazy(() => CustomFieldResponseUpdateManyWithWhereWithoutFieldInputSchema),
					z.lazy(() => CustomFieldResponseUpdateManyWithWhereWithoutFieldInputSchema).array()
				])
				.optional(),
			deleteMany: z
				.union([
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema),
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema).array()
				])
				.optional()
		})
		.strict();

export const TenantUserCreateNestedOneWithoutCustomFieldResponsesInputSchema: z.ZodType<Prisma.TenantUserCreateNestedOneWithoutCustomFieldResponsesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutCustomFieldResponsesInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutCustomFieldResponsesInputSchema)
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => TenantUserCreateOrConnectWithoutCustomFieldResponsesInputSchema)
				.optional(),
			connect: z.lazy(() => TenantUserWhereUniqueInputSchema).optional()
		})
		.strict();

export const CustomFieldCreateNestedOneWithoutResponsesInputSchema: z.ZodType<Prisma.CustomFieldCreateNestedOneWithoutResponsesInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldCreateWithoutResponsesInputSchema),
					z.lazy(() => CustomFieldUncheckedCreateWithoutResponsesInputSchema)
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => CustomFieldCreateOrConnectWithoutResponsesInputSchema)
				.optional(),
			connect: z.lazy(() => CustomFieldWhereUniqueInputSchema).optional()
		})
		.strict();

export const TenantUserUpdateOneRequiredWithoutCustomFieldResponsesNestedInputSchema: z.ZodType<Prisma.TenantUserUpdateOneRequiredWithoutCustomFieldResponsesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => TenantUserCreateWithoutCustomFieldResponsesInputSchema),
					z.lazy(() => TenantUserUncheckedCreateWithoutCustomFieldResponsesInputSchema)
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => TenantUserCreateOrConnectWithoutCustomFieldResponsesInputSchema)
				.optional(),
			upsert: z.lazy(() => TenantUserUpsertWithoutCustomFieldResponsesInputSchema).optional(),
			connect: z.lazy(() => TenantUserWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => TenantUserUpdateToOneWithWhereWithoutCustomFieldResponsesInputSchema),
					z.lazy(() => TenantUserUpdateWithoutCustomFieldResponsesInputSchema),
					z.lazy(() => TenantUserUncheckedUpdateWithoutCustomFieldResponsesInputSchema)
				])
				.optional()
		})
		.strict();

export const CustomFieldUpdateOneRequiredWithoutResponsesNestedInputSchema: z.ZodType<Prisma.CustomFieldUpdateOneRequiredWithoutResponsesNestedInput> =
	z
		.object({
			create: z
				.union([
					z.lazy(() => CustomFieldCreateWithoutResponsesInputSchema),
					z.lazy(() => CustomFieldUncheckedCreateWithoutResponsesInputSchema)
				])
				.optional(),
			connectOrCreate: z
				.lazy(() => CustomFieldCreateOrConnectWithoutResponsesInputSchema)
				.optional(),
			upsert: z.lazy(() => CustomFieldUpsertWithoutResponsesInputSchema).optional(),
			connect: z.lazy(() => CustomFieldWhereUniqueInputSchema).optional(),
			update: z
				.union([
					z.lazy(() => CustomFieldUpdateToOneWithWhereWithoutResponsesInputSchema),
					z.lazy(() => CustomFieldUpdateWithoutResponsesInputSchema),
					z.lazy(() => CustomFieldUncheckedUpdateWithoutResponsesInputSchema)
				])
				.optional()
		})
		.strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
	.object({
		equals: z.string().optional(),
		in: z.string().array().optional(),
		notIn: z.string().array().optional(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z.union([z.string(), z.lazy(() => NestedStringFilterSchema)]).optional()
	})
	.strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z
	.object({
		equals: z.string().optional().nullable(),
		in: z.string().array().optional().nullable(),
		notIn: z.string().array().optional().nullable(),
		lt: z.string().optional(),
		lte: z.string().optional(),
		gt: z.string().optional(),
		gte: z.string().optional(),
		contains: z.string().optional(),
		startsWith: z.string().optional(),
		endsWith: z.string().optional(),
		not: z
			.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z
	.object({
		equals: z.number().optional().nullable(),
		in: z.number().array().optional().nullable(),
		notIn: z.number().array().optional().nullable(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
	z
		.object({
			equals: z.string().optional(),
			in: z.string().array().optional(),
			notIn: z.string().array().optional(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			not: z.union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)]).optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedStringFilterSchema).optional(),
			_max: z.lazy(() => NestedStringFilterSchema).optional()
		})
		.strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional()
	})
	.strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.string().optional().nullable(),
			in: z.string().array().optional().nullable(),
			notIn: z.string().array().optional().nullable(),
			lt: z.string().optional(),
			lte: z.string().optional(),
			gt: z.string().optional(),
			gte: z.string().optional(),
			contains: z.string().optional(),
			startsWith: z.string().optional(),
			endsWith: z.string().optional(),
			not: z
				.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedStringNullableFilterSchema).optional()
		})
		.strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.number().optional().nullable(),
			in: z.number().array().optional().nullable(),
			notIn: z.number().array().optional().nullable(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z
				.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
			_sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedIntNullableFilterSchema).optional()
		})
		.strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z
	.object({
		equals: z.number().optional().nullable(),
		in: z.number().array().optional().nullable(),
		notIn: z.number().array().optional().nullable(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z
			.union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z
	.object({
		equals: z.coerce.date().optional(),
		in: z.coerce.date().array().optional(),
		notIn: z.coerce.date().array().optional(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional()
	})
	.strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
	z
		.object({
			equals: z.coerce.date().optional(),
			in: z.coerce.date().array().optional(),
			notIn: z.coerce.date().array().optional(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
			_max: z.lazy(() => NestedDateTimeFilterSchema).optional()
		})
		.strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z
	.object({
		equals: z.coerce.date().optional().nullable(),
		in: z.coerce.date().array().optional().nullable(),
		notIn: z.coerce.date().array().optional().nullable(),
		lt: z.coerce.date().optional(),
		lte: z.coerce.date().optional(),
		gt: z.coerce.date().optional(),
		gte: z.coerce.date().optional(),
		not: z
			.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.coerce.date().optional().nullable(),
			in: z.coerce.date().array().optional().nullable(),
			notIn: z.coerce.date().array().optional().nullable(),
			lt: z.coerce.date().optional(),
			lte: z.coerce.date().optional(),
			gt: z.coerce.date().optional(),
			gte: z.coerce.date().optional(),
			not: z
				.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
		})
		.strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z
	.object({
		equals: z.lazy(() => RoleSchema).optional(),
		in: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		notIn: z
			.lazy(() => RoleSchema)
			.array()
			.optional(),
		not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema)]).optional()
	})
	.strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => RoleSchema).optional(),
			in: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => RoleSchema)
				.array()
				.optional(),
			not: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema)])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
		})
		.strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
	.object({
		equals: z.boolean().optional(),
		not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional()
	})
	.strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
	z
		.object({
			equals: z.boolean().optional(),
			not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedBoolFilterSchema).optional(),
			_max: z.lazy(() => NestedBoolFilterSchema).optional()
		})
		.strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
	z
		.object({
			equals: z.number().optional(),
			in: z.number().array().optional(),
			notIn: z.number().array().optional(),
			lt: z.number().optional(),
			lte: z.number().optional(),
			gt: z.number().optional(),
			gte: z.number().optional(),
			not: z.union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)]).optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_avg: z.lazy(() => NestedFloatFilterSchema).optional(),
			_sum: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedIntFilterSchema).optional(),
			_max: z.lazy(() => NestedIntFilterSchema).optional()
		})
		.strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
	.object({
		equals: z.number().optional(),
		in: z.number().array().optional(),
		notIn: z.number().array().optional(),
		lt: z.number().optional(),
		lte: z.number().optional(),
		gt: z.number().optional(),
		gte: z.number().optional(),
		not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional()
	})
	.strict();

export const NestedEnumFormFieldTypeFilterSchema: z.ZodType<Prisma.NestedEnumFormFieldTypeFilter> =
	z
		.object({
			equals: z.lazy(() => FormFieldTypeSchema).optional(),
			in: z
				.lazy(() => FormFieldTypeSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => FormFieldTypeSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => NestedEnumFormFieldTypeFilterSchema)
				])
				.optional()
		})
		.strict();

export const NestedBoolNullableFilterSchema: z.ZodType<Prisma.NestedBoolNullableFilter> = z
	.object({
		equals: z.boolean().optional().nullable(),
		not: z
			.union([z.boolean(), z.lazy(() => NestedBoolNullableFilterSchema)])
			.optional()
			.nullable()
	})
	.strict();

export const NestedEnumFormFieldTypeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumFormFieldTypeWithAggregatesFilter> =
	z
		.object({
			equals: z.lazy(() => FormFieldTypeSchema).optional(),
			in: z
				.lazy(() => FormFieldTypeSchema)
				.array()
				.optional(),
			notIn: z
				.lazy(() => FormFieldTypeSchema)
				.array()
				.optional(),
			not: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => NestedEnumFormFieldTypeWithAggregatesFilterSchema)
				])
				.optional(),
			_count: z.lazy(() => NestedIntFilterSchema).optional(),
			_min: z.lazy(() => NestedEnumFormFieldTypeFilterSchema).optional(),
			_max: z.lazy(() => NestedEnumFormFieldTypeFilterSchema).optional()
		})
		.strict();

export const NestedBoolNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolNullableWithAggregatesFilter> =
	z
		.object({
			equals: z.boolean().optional().nullable(),
			not: z
				.union([z.boolean(), z.lazy(() => NestedBoolNullableWithAggregatesFilterSchema)])
				.optional()
				.nullable(),
			_count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
			_min: z.lazy(() => NestedBoolNullableFilterSchema).optional(),
			_max: z.lazy(() => NestedBoolNullableFilterSchema).optional()
		})
		.strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string().optional().nullable(),
			email: z.string().optional().nullable(),
			emailVerified: z.coerce.date().optional().nullable(),
			image: z.string().optional().nullable(),
			sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
			tenantUsers: z.lazy(() => TenantUserCreateNestedManyWithoutUserInputSchema).optional()
		})
		.strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string().optional().nullable(),
			email: z.string().optional().nullable(),
			emailVerified: z.coerce.date().optional().nullable(),
			image: z.string().optional().nullable(),
			sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
			tenantUsers: z
				.lazy(() => TenantUserUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutAccountsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)
			])
		})
		.strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutAccountsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutAccountsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)
			]),
			where: z.lazy(() => UserWhereInputSchema).optional()
		})
		.strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutAccountsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)
			])
		})
		.strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			emailVerified: z
				.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			image: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
			tenantUsers: z.lazy(() => TenantUserUpdateManyWithoutUserNestedInputSchema).optional()
		})
		.strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			emailVerified: z
				.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			image: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
			tenantUsers: z
				.lazy(() => TenantUserUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string().optional().nullable(),
			email: z.string().optional().nullable(),
			emailVerified: z.coerce.date().optional().nullable(),
			image: z.string().optional().nullable(),
			accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
			tenantUsers: z.lazy(() => TenantUserCreateNestedManyWithoutUserInputSchema).optional()
		})
		.strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string().optional().nullable(),
			email: z.string().optional().nullable(),
			emailVerified: z.coerce.date().optional().nullable(),
			image: z.string().optional().nullable(),
			accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
			tenantUsers: z
				.lazy(() => TenantUserUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutSessionsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)
			])
		})
		.strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutSessionsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutSessionsInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)
			]),
			where: z.lazy(() => UserWhereInputSchema).optional()
		})
		.strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> =
	z
		.object({
			where: z.lazy(() => UserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutSessionsInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)
			])
		})
		.strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			emailVerified: z
				.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			image: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
			tenantUsers: z.lazy(() => TenantUserUpdateManyWithoutUserNestedInputSchema).optional()
		})
		.strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			emailVerified: z
				.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			image: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
			tenantUsers: z
				.lazy(() => TenantUserUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			type: z.string(),
			provider: z.string(),
			providerAccountId: z.string(),
			refresh_token: z.string().optional().nullable(),
			access_token: z.string().optional().nullable(),
			expires_at: z.number().int().optional().nullable(),
			token_type: z.string().optional().nullable(),
			scope: z.string().optional().nullable(),
			id_token: z.string().optional().nullable(),
			session_state: z.string().optional().nullable()
		})
		.strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			type: z.string(),
			provider: z.string(),
			providerAccountId: z.string(),
			refresh_token: z.string().optional().nullable(),
			access_token: z.string().optional().nullable(),
			expires_at: z.number().int().optional().nullable(),
			token_type: z.string().optional().nullable(),
			scope: z.string().optional().nullable(),
			id_token: z.string().optional().nullable(),
			session_state: z.string().optional().nullable()
		})
		.strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => AccountWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => AccountCreateWithoutUserInputSchema),
				z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => AccountCreateManyUserInputSchema),
				z.lazy(() => AccountCreateManyUserInputSchema).array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			sessionToken: z.string(),
			expires: z.coerce.date()
		})
		.strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			sessionToken: z.string(),
			expires: z.coerce.date()
		})
		.strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => SessionWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => SessionCreateWithoutUserInputSchema),
				z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => SessionCreateManyUserInputSchema),
				z.lazy(() => SessionCreateManyUserInputSchema).array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const TenantUserCreateWithoutUserInputSchema: z.ZodType<Prisma.TenantUserCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			tenant: z.lazy(() => TenantCreateNestedOneWithoutTenantUsersInputSchema),
			customForms: z.lazy(() => CustomFormCreateNestedManyWithoutUserInputSchema).optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const TenantUserUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.TenantUserUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			tenantId: z.string(),
			customForms: z
				.lazy(() => CustomFormUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const TenantUserCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.TenantUserCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TenantUserCreateWithoutUserInputSchema),
				z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const TenantUserCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.TenantUserCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => TenantUserCreateManyUserInputSchema),
				z.lazy(() => TenantUserCreateManyUserInputSchema).array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => AccountWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => AccountUpdateWithoutUserInputSchema),
				z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema)
			]),
			create: z.union([
				z.lazy(() => AccountCreateWithoutUserInputSchema),
				z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => AccountWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => AccountUpdateWithoutUserInputSchema),
				z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema)
			])
		})
		.strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => AccountScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => AccountUpdateManyMutationInputSchema),
				z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema)
			])
		})
		.strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => AccountScalarWhereInputSchema),
				z.lazy(() => AccountScalarWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => AccountScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => AccountScalarWhereInputSchema),
				z.lazy(() => AccountScalarWhereInputSchema).array()
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		providerAccountId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		refresh_token: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		access_token: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		expires_at: z
			.union([z.lazy(() => IntNullableFilterSchema), z.number()])
			.optional()
			.nullable(),
		token_type: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		scope: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		id_token: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		session_state: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable()
	})
	.strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => SessionWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => SessionUpdateWithoutUserInputSchema),
				z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema)
			]),
			create: z.union([
				z.lazy(() => SessionCreateWithoutUserInputSchema),
				z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => SessionWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => SessionUpdateWithoutUserInputSchema),
				z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema)
			])
		})
		.strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => SessionScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => SessionUpdateManyMutationInputSchema),
				z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema)
			])
		})
		.strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => SessionScalarWhereInputSchema),
				z.lazy(() => SessionScalarWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => SessionScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => SessionScalarWhereInputSchema),
				z.lazy(() => SessionScalarWhereInputSchema).array()
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		sessionToken: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
	})
	.strict();

export const TenantUserUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TenantUserUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => TenantUserUpdateWithoutUserInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateWithoutUserInputSchema)
			]),
			create: z.union([
				z.lazy(() => TenantUserCreateWithoutUserInputSchema),
				z.lazy(() => TenantUserUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const TenantUserUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.TenantUserUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => TenantUserUpdateWithoutUserInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateWithoutUserInputSchema)
			])
		})
		.strict();

export const TenantUserUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.TenantUserUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => TenantUserScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => TenantUserUpdateManyMutationInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateManyWithoutUserInputSchema)
			])
		})
		.strict();

export const TenantUserScalarWhereInputSchema: z.ZodType<Prisma.TenantUserScalarWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => TenantUserScalarWhereInputSchema),
				z.lazy(() => TenantUserScalarWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => TenantUserScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => TenantUserScalarWhereInputSchema),
				z.lazy(() => TenantUserScalarWhereInputSchema).array()
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
		tenantId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional()
	})
	.strict();

export const TenantCreateWithoutTenantUsersInputSchema: z.ZodType<Prisma.TenantCreateWithoutTenantUsersInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			isAdmin: z.boolean().optional(),
			clients: z.lazy(() => ClientCreateNestedManyWithoutTenantInputSchema).optional()
		})
		.strict();

export const TenantUncheckedCreateWithoutTenantUsersInputSchema: z.ZodType<Prisma.TenantUncheckedCreateWithoutTenantUsersInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			isAdmin: z.boolean().optional(),
			clients: z.lazy(() => ClientUncheckedCreateNestedManyWithoutTenantInputSchema).optional()
		})
		.strict();

export const TenantCreateOrConnectWithoutTenantUsersInputSchema: z.ZodType<Prisma.TenantCreateOrConnectWithoutTenantUsersInput> =
	z
		.object({
			where: z.lazy(() => TenantWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TenantCreateWithoutTenantUsersInputSchema),
				z.lazy(() => TenantUncheckedCreateWithoutTenantUsersInputSchema)
			])
		})
		.strict();

export const UserCreateWithoutTenantUsersInputSchema: z.ZodType<Prisma.UserCreateWithoutTenantUsersInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string().optional().nullable(),
			email: z.string().optional().nullable(),
			emailVerified: z.coerce.date().optional().nullable(),
			image: z.string().optional().nullable(),
			accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
			sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
		})
		.strict();

export const UserUncheckedCreateWithoutTenantUsersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTenantUsersInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string().optional().nullable(),
			email: z.string().optional().nullable(),
			emailVerified: z.coerce.date().optional().nullable(),
			image: z.string().optional().nullable(),
			accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
			sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
		})
		.strict();

export const UserCreateOrConnectWithoutTenantUsersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTenantUsersInput> =
	z
		.object({
			where: z.lazy(() => UserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => UserCreateWithoutTenantUsersInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTenantUsersInputSchema)
			])
		})
		.strict();

export const CustomFormCreateWithoutUserInputSchema: z.ZodType<Prisma.CustomFormCreateWithoutUserInput> =
	z
		.object({
			name: z.string(),
			createdAt: z.coerce.date().optional(),
			fields: z.lazy(() => CustomFieldCreateNestedManyWithoutFormInputSchema).optional()
		})
		.strict();

export const CustomFormUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CustomFormUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			createdAt: z.coerce.date().optional(),
			fields: z.lazy(() => CustomFieldUncheckedCreateNestedManyWithoutFormInputSchema).optional()
		})
		.strict();

export const CustomFormCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CustomFormCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => CustomFormWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => CustomFormCreateWithoutUserInputSchema),
				z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const CustomFormCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CustomFormCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => CustomFormCreateManyUserInputSchema),
				z.lazy(() => CustomFormCreateManyUserInputSchema).array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const CustomFieldResponseCreateWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateWithoutUserInput> =
	z
		.object({
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			field: z.lazy(() => CustomFieldCreateNestedOneWithoutResponsesInputSchema)
		})
		.strict();

export const CustomFieldResponseUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedCreateWithoutUserInput> =
	z
		.object({
			id: z.number().int().optional(),
			content: z.string(),
			fieldId: z.number().int(),
			createdAt: z.coerce.date().optional()
		})
		.strict();

export const CustomFieldResponseCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateOrConnectWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const CustomFieldResponseCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CustomFieldResponseCreateManyUserInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => CustomFieldResponseCreateManyUserInputSchema),
				z.lazy(() => CustomFieldResponseCreateManyUserInputSchema).array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const TenantUpsertWithoutTenantUsersInputSchema: z.ZodType<Prisma.TenantUpsertWithoutTenantUsersInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => TenantUpdateWithoutTenantUsersInputSchema),
				z.lazy(() => TenantUncheckedUpdateWithoutTenantUsersInputSchema)
			]),
			create: z.union([
				z.lazy(() => TenantCreateWithoutTenantUsersInputSchema),
				z.lazy(() => TenantUncheckedCreateWithoutTenantUsersInputSchema)
			]),
			where: z.lazy(() => TenantWhereInputSchema).optional()
		})
		.strict();

export const TenantUpdateToOneWithWhereWithoutTenantUsersInputSchema: z.ZodType<Prisma.TenantUpdateToOneWithWhereWithoutTenantUsersInput> =
	z
		.object({
			where: z.lazy(() => TenantWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => TenantUpdateWithoutTenantUsersInputSchema),
				z.lazy(() => TenantUncheckedUpdateWithoutTenantUsersInputSchema)
			])
		})
		.strict();

export const TenantUpdateWithoutTenantUsersInputSchema: z.ZodType<Prisma.TenantUpdateWithoutTenantUsersInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			isAdmin: z
				.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
				.optional(),
			clients: z.lazy(() => ClientUpdateManyWithoutTenantNestedInputSchema).optional()
		})
		.strict();

export const TenantUncheckedUpdateWithoutTenantUsersInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateWithoutTenantUsersInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			isAdmin: z
				.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
				.optional(),
			clients: z.lazy(() => ClientUncheckedUpdateManyWithoutTenantNestedInputSchema).optional()
		})
		.strict();

export const UserUpsertWithoutTenantUsersInputSchema: z.ZodType<Prisma.UserUpsertWithoutTenantUsersInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => UserUpdateWithoutTenantUsersInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutTenantUsersInputSchema)
			]),
			create: z.union([
				z.lazy(() => UserCreateWithoutTenantUsersInputSchema),
				z.lazy(() => UserUncheckedCreateWithoutTenantUsersInputSchema)
			]),
			where: z.lazy(() => UserWhereInputSchema).optional()
		})
		.strict();

export const UserUpdateToOneWithWhereWithoutTenantUsersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTenantUsersInput> =
	z
		.object({
			where: z.lazy(() => UserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => UserUpdateWithoutTenantUsersInputSchema),
				z.lazy(() => UserUncheckedUpdateWithoutTenantUsersInputSchema)
			])
		})
		.strict();

export const UserUpdateWithoutTenantUsersInputSchema: z.ZodType<Prisma.UserUpdateWithoutTenantUsersInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			emailVerified: z
				.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			image: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
			sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
		})
		.strict();

export const UserUncheckedUpdateWithoutTenantUsersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTenantUsersInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			emailVerified: z
				.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			image: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
			sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
		})
		.strict();

export const CustomFormUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CustomFormUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => CustomFormWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => CustomFormUpdateWithoutUserInputSchema),
				z.lazy(() => CustomFormUncheckedUpdateWithoutUserInputSchema)
			]),
			create: z.union([
				z.lazy(() => CustomFormCreateWithoutUserInputSchema),
				z.lazy(() => CustomFormUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const CustomFormUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CustomFormUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => CustomFormWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => CustomFormUpdateWithoutUserInputSchema),
				z.lazy(() => CustomFormUncheckedUpdateWithoutUserInputSchema)
			])
		})
		.strict();

export const CustomFormUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CustomFormUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => CustomFormScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => CustomFormUpdateManyMutationInputSchema),
				z.lazy(() => CustomFormUncheckedUpdateManyWithoutUserInputSchema)
			])
		})
		.strict();

export const CustomFormScalarWhereInputSchema: z.ZodType<Prisma.CustomFormScalarWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => CustomFormScalarWhereInputSchema),
				z.lazy(() => CustomFormScalarWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => CustomFormScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CustomFormScalarWhereInputSchema),
				z.lazy(() => CustomFormScalarWhereInputSchema).array()
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
		name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		tenantUserId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
	})
	.strict();

export const CustomFieldResponseUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseUpsertWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => CustomFieldResponseUpdateWithoutUserInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedUpdateWithoutUserInputSchema)
			]),
			create: z.union([
				z.lazy(() => CustomFieldResponseCreateWithoutUserInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedCreateWithoutUserInputSchema)
			])
		})
		.strict();

export const CustomFieldResponseUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateWithWhereUniqueWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => CustomFieldResponseUpdateWithoutUserInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedUpdateWithoutUserInputSchema)
			])
		})
		.strict();

export const CustomFieldResponseUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateManyWithWhereWithoutUserInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldResponseScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => CustomFieldResponseUpdateManyMutationInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedUpdateManyWithoutUserInputSchema)
			])
		})
		.strict();

export const CustomFieldResponseScalarWhereInputSchema: z.ZodType<Prisma.CustomFieldResponseScalarWhereInput> =
	z
		.object({
			AND: z
				.union([
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema),
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema).array()
				])
				.optional(),
			OR: z
				.lazy(() => CustomFieldResponseScalarWhereInputSchema)
				.array()
				.optional(),
			NOT: z
				.union([
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema),
					z.lazy(() => CustomFieldResponseScalarWhereInputSchema).array()
				])
				.optional(),
			id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
			content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			tenantUserId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
			fieldId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
			createdAt: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
		})
		.strict();

export const TenantCreateWithoutClientsInputSchema: z.ZodType<Prisma.TenantCreateWithoutClientsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			isAdmin: z.boolean().optional(),
			tenantUsers: z.lazy(() => TenantUserCreateNestedManyWithoutTenantInputSchema).optional()
		})
		.strict();

export const TenantUncheckedCreateWithoutClientsInputSchema: z.ZodType<Prisma.TenantUncheckedCreateWithoutClientsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string(),
			email: z.string().optional().nullable(),
			isAdmin: z.boolean().optional(),
			tenantUsers: z
				.lazy(() => TenantUserUncheckedCreateNestedManyWithoutTenantInputSchema)
				.optional()
		})
		.strict();

export const TenantCreateOrConnectWithoutClientsInputSchema: z.ZodType<Prisma.TenantCreateOrConnectWithoutClientsInput> =
	z
		.object({
			where: z.lazy(() => TenantWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TenantCreateWithoutClientsInputSchema),
				z.lazy(() => TenantUncheckedCreateWithoutClientsInputSchema)
			])
		})
		.strict();

export const TenantUpsertWithoutClientsInputSchema: z.ZodType<Prisma.TenantUpsertWithoutClientsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => TenantUpdateWithoutClientsInputSchema),
				z.lazy(() => TenantUncheckedUpdateWithoutClientsInputSchema)
			]),
			create: z.union([
				z.lazy(() => TenantCreateWithoutClientsInputSchema),
				z.lazy(() => TenantUncheckedCreateWithoutClientsInputSchema)
			]),
			where: z.lazy(() => TenantWhereInputSchema).optional()
		})
		.strict();

export const TenantUpdateToOneWithWhereWithoutClientsInputSchema: z.ZodType<Prisma.TenantUpdateToOneWithWhereWithoutClientsInput> =
	z
		.object({
			where: z.lazy(() => TenantWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => TenantUpdateWithoutClientsInputSchema),
				z.lazy(() => TenantUncheckedUpdateWithoutClientsInputSchema)
			])
		})
		.strict();

export const TenantUpdateWithoutClientsInputSchema: z.ZodType<Prisma.TenantUpdateWithoutClientsInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			isAdmin: z
				.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantUsers: z.lazy(() => TenantUserUpdateManyWithoutTenantNestedInputSchema).optional()
		})
		.strict();

export const TenantUncheckedUpdateWithoutClientsInputSchema: z.ZodType<Prisma.TenantUncheckedUpdateWithoutClientsInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			isAdmin: z
				.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantUsers: z
				.lazy(() => TenantUserUncheckedUpdateManyWithoutTenantNestedInputSchema)
				.optional()
		})
		.strict();

export const ClientCreateWithoutTenantInputSchema: z.ZodType<Prisma.ClientCreateWithoutTenantInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string(),
			email: z.string(),
			phoneNumber: z
				.string()
				.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
					message: 'Invalid Number!'
				}),
			avatar: z.string().optional().nullable()
		})
		.strict();

export const ClientUncheckedCreateWithoutTenantInputSchema: z.ZodType<Prisma.ClientUncheckedCreateWithoutTenantInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			name: z.string(),
			email: z.string(),
			phoneNumber: z
				.string()
				.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
					message: 'Invalid Number!'
				}),
			avatar: z.string().optional().nullable()
		})
		.strict();

export const ClientCreateOrConnectWithoutTenantInputSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutTenantInput> =
	z
		.object({
			where: z.lazy(() => ClientWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => ClientCreateWithoutTenantInputSchema),
				z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema)
			])
		})
		.strict();

export const ClientCreateManyTenantInputEnvelopeSchema: z.ZodType<Prisma.ClientCreateManyTenantInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => ClientCreateManyTenantInputSchema),
				z.lazy(() => ClientCreateManyTenantInputSchema).array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const TenantUserCreateWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserCreateWithoutTenantInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			user: z.lazy(() => UserCreateNestedOneWithoutTenantUsersInputSchema),
			customForms: z.lazy(() => CustomFormCreateNestedManyWithoutUserInputSchema).optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const TenantUserUncheckedCreateWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserUncheckedCreateWithoutTenantInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			userId: z.string(),
			customForms: z
				.lazy(() => CustomFormUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const TenantUserCreateOrConnectWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserCreateOrConnectWithoutTenantInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TenantUserCreateWithoutTenantInputSchema),
				z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema)
			])
		})
		.strict();

export const TenantUserCreateManyTenantInputEnvelopeSchema: z.ZodType<Prisma.TenantUserCreateManyTenantInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => TenantUserCreateManyTenantInputSchema),
				z.lazy(() => TenantUserCreateManyTenantInputSchema).array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const ClientUpsertWithWhereUniqueWithoutTenantInputSchema: z.ZodType<Prisma.ClientUpsertWithWhereUniqueWithoutTenantInput> =
	z
		.object({
			where: z.lazy(() => ClientWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => ClientUpdateWithoutTenantInputSchema),
				z.lazy(() => ClientUncheckedUpdateWithoutTenantInputSchema)
			]),
			create: z.union([
				z.lazy(() => ClientCreateWithoutTenantInputSchema),
				z.lazy(() => ClientUncheckedCreateWithoutTenantInputSchema)
			])
		})
		.strict();

export const ClientUpdateWithWhereUniqueWithoutTenantInputSchema: z.ZodType<Prisma.ClientUpdateWithWhereUniqueWithoutTenantInput> =
	z
		.object({
			where: z.lazy(() => ClientWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => ClientUpdateWithoutTenantInputSchema),
				z.lazy(() => ClientUncheckedUpdateWithoutTenantInputSchema)
			])
		})
		.strict();

export const ClientUpdateManyWithWhereWithoutTenantInputSchema: z.ZodType<Prisma.ClientUpdateManyWithWhereWithoutTenantInput> =
	z
		.object({
			where: z.lazy(() => ClientScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => ClientUpdateManyMutationInputSchema),
				z.lazy(() => ClientUncheckedUpdateManyWithoutTenantInputSchema)
			])
		})
		.strict();

export const ClientScalarWhereInputSchema: z.ZodType<Prisma.ClientScalarWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => ClientScalarWhereInputSchema),
				z.lazy(() => ClientScalarWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => ClientScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => ClientScalarWhereInputSchema),
				z.lazy(() => ClientScalarWhereInputSchema).array()
			])
			.optional(),
		id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		phoneNumber: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		avatar: z
			.union([z.lazy(() => StringNullableFilterSchema), z.string()])
			.optional()
			.nullable(),
		tenantId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional()
	})
	.strict();

export const TenantUserUpsertWithWhereUniqueWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserUpsertWithWhereUniqueWithoutTenantInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => TenantUserUpdateWithoutTenantInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateWithoutTenantInputSchema)
			]),
			create: z.union([
				z.lazy(() => TenantUserCreateWithoutTenantInputSchema),
				z.lazy(() => TenantUserUncheckedCreateWithoutTenantInputSchema)
			])
		})
		.strict();

export const TenantUserUpdateWithWhereUniqueWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserUpdateWithWhereUniqueWithoutTenantInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => TenantUserUpdateWithoutTenantInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateWithoutTenantInputSchema)
			])
		})
		.strict();

export const TenantUserUpdateManyWithWhereWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserUpdateManyWithWhereWithoutTenantInput> =
	z
		.object({
			where: z.lazy(() => TenantUserScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => TenantUserUpdateManyMutationInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateManyWithoutTenantInputSchema)
			])
		})
		.strict();

export const TenantUserCreateWithoutCustomFormsInputSchema: z.ZodType<Prisma.TenantUserCreateWithoutCustomFormsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			tenant: z.lazy(() => TenantCreateNestedOneWithoutTenantUsersInputSchema),
			user: z.lazy(() => UserCreateNestedOneWithoutTenantUsersInputSchema),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const TenantUserUncheckedCreateWithoutCustomFormsInputSchema: z.ZodType<Prisma.TenantUserUncheckedCreateWithoutCustomFormsInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			tenantId: z.string(),
			userId: z.string(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const TenantUserCreateOrConnectWithoutCustomFormsInputSchema: z.ZodType<Prisma.TenantUserCreateOrConnectWithoutCustomFormsInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TenantUserCreateWithoutCustomFormsInputSchema),
				z.lazy(() => TenantUserUncheckedCreateWithoutCustomFormsInputSchema)
			])
		})
		.strict();

export const CustomFieldCreateWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldCreateWithoutFormInput> =
	z
		.object({
			name: z.string(),
			type: z.lazy(() => FormFieldTypeSchema),
			required: z.boolean().optional().nullable(),
			responses: z.lazy(() => CustomFieldResponseCreateNestedManyWithoutFieldInputSchema).optional()
		})
		.strict();

export const CustomFieldUncheckedCreateWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldUncheckedCreateWithoutFormInput> =
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			type: z.lazy(() => FormFieldTypeSchema),
			required: z.boolean().optional().nullable(),
			responses: z
				.lazy(() => CustomFieldResponseUncheckedCreateNestedManyWithoutFieldInputSchema)
				.optional()
		})
		.strict();

export const CustomFieldCreateOrConnectWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldCreateOrConnectWithoutFormInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => CustomFieldCreateWithoutFormInputSchema),
				z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema)
			])
		})
		.strict();

export const CustomFieldCreateManyFormInputEnvelopeSchema: z.ZodType<Prisma.CustomFieldCreateManyFormInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => CustomFieldCreateManyFormInputSchema),
				z.lazy(() => CustomFieldCreateManyFormInputSchema).array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const TenantUserUpsertWithoutCustomFormsInputSchema: z.ZodType<Prisma.TenantUserUpsertWithoutCustomFormsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => TenantUserUpdateWithoutCustomFormsInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateWithoutCustomFormsInputSchema)
			]),
			create: z.union([
				z.lazy(() => TenantUserCreateWithoutCustomFormsInputSchema),
				z.lazy(() => TenantUserUncheckedCreateWithoutCustomFormsInputSchema)
			]),
			where: z.lazy(() => TenantUserWhereInputSchema).optional()
		})
		.strict();

export const TenantUserUpdateToOneWithWhereWithoutCustomFormsInputSchema: z.ZodType<Prisma.TenantUserUpdateToOneWithWhereWithoutCustomFormsInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => TenantUserUpdateWithoutCustomFormsInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateWithoutCustomFormsInputSchema)
			])
		})
		.strict();

export const TenantUserUpdateWithoutCustomFormsInputSchema: z.ZodType<Prisma.TenantUserUpdateWithoutCustomFormsInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			tenant: z.lazy(() => TenantUpdateOneRequiredWithoutTenantUsersNestedInputSchema).optional(),
			user: z.lazy(() => UserUpdateOneRequiredWithoutTenantUsersNestedInputSchema).optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const TenantUserUncheckedUpdateWithoutCustomFormsInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateWithoutCustomFormsInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			userId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const CustomFieldUpsertWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldUpsertWithWhereUniqueWithoutFormInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => CustomFieldUpdateWithoutFormInputSchema),
				z.lazy(() => CustomFieldUncheckedUpdateWithoutFormInputSchema)
			]),
			create: z.union([
				z.lazy(() => CustomFieldCreateWithoutFormInputSchema),
				z.lazy(() => CustomFieldUncheckedCreateWithoutFormInputSchema)
			])
		})
		.strict();

export const CustomFieldUpdateWithWhereUniqueWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldUpdateWithWhereUniqueWithoutFormInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => CustomFieldUpdateWithoutFormInputSchema),
				z.lazy(() => CustomFieldUncheckedUpdateWithoutFormInputSchema)
			])
		})
		.strict();

export const CustomFieldUpdateManyWithWhereWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldUpdateManyWithWhereWithoutFormInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => CustomFieldUpdateManyMutationInputSchema),
				z.lazy(() => CustomFieldUncheckedUpdateManyWithoutFormInputSchema)
			])
		})
		.strict();

export const CustomFieldScalarWhereInputSchema: z.ZodType<Prisma.CustomFieldScalarWhereInput> = z
	.object({
		AND: z
			.union([
				z.lazy(() => CustomFieldScalarWhereInputSchema),
				z.lazy(() => CustomFieldScalarWhereInputSchema).array()
			])
			.optional(),
		OR: z
			.lazy(() => CustomFieldScalarWhereInputSchema)
			.array()
			.optional(),
		NOT: z
			.union([
				z.lazy(() => CustomFieldScalarWhereInputSchema),
				z.lazy(() => CustomFieldScalarWhereInputSchema).array()
			])
			.optional(),
		id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
		name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
		type: z
			.union([z.lazy(() => EnumFormFieldTypeFilterSchema), z.lazy(() => FormFieldTypeSchema)])
			.optional(),
		required: z
			.union([z.lazy(() => BoolNullableFilterSchema), z.boolean()])
			.optional()
			.nullable(),
		formId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional()
	})
	.strict();

export const CustomFormCreateWithoutFieldsInputSchema: z.ZodType<Prisma.CustomFormCreateWithoutFieldsInput> =
	z
		.object({
			name: z.string(),
			createdAt: z.coerce.date().optional(),
			user: z.lazy(() => TenantUserCreateNestedOneWithoutCustomFormsInputSchema)
		})
		.strict();

export const CustomFormUncheckedCreateWithoutFieldsInputSchema: z.ZodType<Prisma.CustomFormUncheckedCreateWithoutFieldsInput> =
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			tenantUserId: z.string(),
			createdAt: z.coerce.date().optional()
		})
		.strict();

export const CustomFormCreateOrConnectWithoutFieldsInputSchema: z.ZodType<Prisma.CustomFormCreateOrConnectWithoutFieldsInput> =
	z
		.object({
			where: z.lazy(() => CustomFormWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => CustomFormCreateWithoutFieldsInputSchema),
				z.lazy(() => CustomFormUncheckedCreateWithoutFieldsInputSchema)
			])
		})
		.strict();

export const CustomFieldResponseCreateWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateWithoutFieldInput> =
	z
		.object({
			content: z.string(),
			createdAt: z.coerce.date().optional(),
			user: z.lazy(() => TenantUserCreateNestedOneWithoutCustomFieldResponsesInputSchema)
		})
		.strict();

export const CustomFieldResponseUncheckedCreateWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedCreateWithoutFieldInput> =
	z
		.object({
			id: z.number().int().optional(),
			content: z.string(),
			tenantUserId: z.string(),
			createdAt: z.coerce.date().optional()
		})
		.strict();

export const CustomFieldResponseCreateOrConnectWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateOrConnectWithoutFieldInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema)
			])
		})
		.strict();

export const CustomFieldResponseCreateManyFieldInputEnvelopeSchema: z.ZodType<Prisma.CustomFieldResponseCreateManyFieldInputEnvelope> =
	z
		.object({
			data: z.union([
				z.lazy(() => CustomFieldResponseCreateManyFieldInputSchema),
				z.lazy(() => CustomFieldResponseCreateManyFieldInputSchema).array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const CustomFormUpsertWithoutFieldsInputSchema: z.ZodType<Prisma.CustomFormUpsertWithoutFieldsInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => CustomFormUpdateWithoutFieldsInputSchema),
				z.lazy(() => CustomFormUncheckedUpdateWithoutFieldsInputSchema)
			]),
			create: z.union([
				z.lazy(() => CustomFormCreateWithoutFieldsInputSchema),
				z.lazy(() => CustomFormUncheckedCreateWithoutFieldsInputSchema)
			]),
			where: z.lazy(() => CustomFormWhereInputSchema).optional()
		})
		.strict();

export const CustomFormUpdateToOneWithWhereWithoutFieldsInputSchema: z.ZodType<Prisma.CustomFormUpdateToOneWithWhereWithoutFieldsInput> =
	z
		.object({
			where: z.lazy(() => CustomFormWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => CustomFormUpdateWithoutFieldsInputSchema),
				z.lazy(() => CustomFormUncheckedUpdateWithoutFieldsInputSchema)
			])
		})
		.strict();

export const CustomFormUpdateWithoutFieldsInputSchema: z.ZodType<Prisma.CustomFormUpdateWithoutFieldsInput> =
	z
		.object({
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional(),
			user: z.lazy(() => TenantUserUpdateOneRequiredWithoutCustomFormsNestedInputSchema).optional()
		})
		.strict();

export const CustomFormUncheckedUpdateWithoutFieldsInputSchema: z.ZodType<Prisma.CustomFormUncheckedUpdateWithoutFieldsInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			tenantUserId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFieldResponseUpsertWithWhereUniqueWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseUpsertWithWhereUniqueWithoutFieldInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
			update: z.union([
				z.lazy(() => CustomFieldResponseUpdateWithoutFieldInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedUpdateWithoutFieldInputSchema)
			]),
			create: z.union([
				z.lazy(() => CustomFieldResponseCreateWithoutFieldInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedCreateWithoutFieldInputSchema)
			])
		})
		.strict();

export const CustomFieldResponseUpdateWithWhereUniqueWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateWithWhereUniqueWithoutFieldInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldResponseWhereUniqueInputSchema),
			data: z.union([
				z.lazy(() => CustomFieldResponseUpdateWithoutFieldInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedUpdateWithoutFieldInputSchema)
			])
		})
		.strict();

export const CustomFieldResponseUpdateManyWithWhereWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateManyWithWhereWithoutFieldInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldResponseScalarWhereInputSchema),
			data: z.union([
				z.lazy(() => CustomFieldResponseUpdateManyMutationInputSchema),
				z.lazy(() => CustomFieldResponseUncheckedUpdateManyWithoutFieldInputSchema)
			])
		})
		.strict();

export const TenantUserCreateWithoutCustomFieldResponsesInputSchema: z.ZodType<Prisma.TenantUserCreateWithoutCustomFieldResponsesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			tenant: z.lazy(() => TenantCreateNestedOneWithoutTenantUsersInputSchema),
			user: z.lazy(() => UserCreateNestedOneWithoutTenantUsersInputSchema),
			customForms: z.lazy(() => CustomFormCreateNestedManyWithoutUserInputSchema).optional()
		})
		.strict();

export const TenantUserUncheckedCreateWithoutCustomFieldResponsesInputSchema: z.ZodType<Prisma.TenantUserUncheckedCreateWithoutCustomFieldResponsesInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			tenantId: z.string(),
			userId: z.string(),
			customForms: z
				.lazy(() => CustomFormUncheckedCreateNestedManyWithoutUserInputSchema)
				.optional()
		})
		.strict();

export const TenantUserCreateOrConnectWithoutCustomFieldResponsesInputSchema: z.ZodType<Prisma.TenantUserCreateOrConnectWithoutCustomFieldResponsesInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => TenantUserCreateWithoutCustomFieldResponsesInputSchema),
				z.lazy(() => TenantUserUncheckedCreateWithoutCustomFieldResponsesInputSchema)
			])
		})
		.strict();

export const CustomFieldCreateWithoutResponsesInputSchema: z.ZodType<Prisma.CustomFieldCreateWithoutResponsesInput> =
	z
		.object({
			name: z.string(),
			type: z.lazy(() => FormFieldTypeSchema),
			required: z.boolean().optional().nullable(),
			form: z.lazy(() => CustomFormCreateNestedOneWithoutFieldsInputSchema)
		})
		.strict();

export const CustomFieldUncheckedCreateWithoutResponsesInputSchema: z.ZodType<Prisma.CustomFieldUncheckedCreateWithoutResponsesInput> =
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			type: z.lazy(() => FormFieldTypeSchema),
			required: z.boolean().optional().nullable(),
			formId: z.number().int()
		})
		.strict();

export const CustomFieldCreateOrConnectWithoutResponsesInputSchema: z.ZodType<Prisma.CustomFieldCreateOrConnectWithoutResponsesInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldWhereUniqueInputSchema),
			create: z.union([
				z.lazy(() => CustomFieldCreateWithoutResponsesInputSchema),
				z.lazy(() => CustomFieldUncheckedCreateWithoutResponsesInputSchema)
			])
		})
		.strict();

export const TenantUserUpsertWithoutCustomFieldResponsesInputSchema: z.ZodType<Prisma.TenantUserUpsertWithoutCustomFieldResponsesInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => TenantUserUpdateWithoutCustomFieldResponsesInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateWithoutCustomFieldResponsesInputSchema)
			]),
			create: z.union([
				z.lazy(() => TenantUserCreateWithoutCustomFieldResponsesInputSchema),
				z.lazy(() => TenantUserUncheckedCreateWithoutCustomFieldResponsesInputSchema)
			]),
			where: z.lazy(() => TenantUserWhereInputSchema).optional()
		})
		.strict();

export const TenantUserUpdateToOneWithWhereWithoutCustomFieldResponsesInputSchema: z.ZodType<Prisma.TenantUserUpdateToOneWithWhereWithoutCustomFieldResponsesInput> =
	z
		.object({
			where: z.lazy(() => TenantUserWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => TenantUserUpdateWithoutCustomFieldResponsesInputSchema),
				z.lazy(() => TenantUserUncheckedUpdateWithoutCustomFieldResponsesInputSchema)
			])
		})
		.strict();

export const TenantUserUpdateWithoutCustomFieldResponsesInputSchema: z.ZodType<Prisma.TenantUserUpdateWithoutCustomFieldResponsesInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			tenant: z.lazy(() => TenantUpdateOneRequiredWithoutTenantUsersNestedInputSchema).optional(),
			user: z.lazy(() => UserUpdateOneRequiredWithoutTenantUsersNestedInputSchema).optional(),
			customForms: z.lazy(() => CustomFormUpdateManyWithoutUserNestedInputSchema).optional()
		})
		.strict();

export const TenantUserUncheckedUpdateWithoutCustomFieldResponsesInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateWithoutCustomFieldResponsesInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			userId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			customForms: z
				.lazy(() => CustomFormUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const CustomFieldUpsertWithoutResponsesInputSchema: z.ZodType<Prisma.CustomFieldUpsertWithoutResponsesInput> =
	z
		.object({
			update: z.union([
				z.lazy(() => CustomFieldUpdateWithoutResponsesInputSchema),
				z.lazy(() => CustomFieldUncheckedUpdateWithoutResponsesInputSchema)
			]),
			create: z.union([
				z.lazy(() => CustomFieldCreateWithoutResponsesInputSchema),
				z.lazy(() => CustomFieldUncheckedCreateWithoutResponsesInputSchema)
			]),
			where: z.lazy(() => CustomFieldWhereInputSchema).optional()
		})
		.strict();

export const CustomFieldUpdateToOneWithWhereWithoutResponsesInputSchema: z.ZodType<Prisma.CustomFieldUpdateToOneWithWhereWithoutResponsesInput> =
	z
		.object({
			where: z.lazy(() => CustomFieldWhereInputSchema).optional(),
			data: z.union([
				z.lazy(() => CustomFieldUpdateWithoutResponsesInputSchema),
				z.lazy(() => CustomFieldUncheckedUpdateWithoutResponsesInputSchema)
			])
		})
		.strict();

export const CustomFieldUpdateWithoutResponsesInputSchema: z.ZodType<Prisma.CustomFieldUpdateWithoutResponsesInput> =
	z
		.object({
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			type: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => EnumFormFieldTypeFieldUpdateOperationsInputSchema)
				])
				.optional(),
			required: z
				.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			form: z.lazy(() => CustomFormUpdateOneRequiredWithoutFieldsNestedInputSchema).optional()
		})
		.strict();

export const CustomFieldUncheckedUpdateWithoutResponsesInputSchema: z.ZodType<Prisma.CustomFieldUncheckedUpdateWithoutResponsesInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			type: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => EnumFormFieldTypeFieldUpdateOperationsInputSchema)
				])
				.optional(),
			required: z
				.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			formId: z
				.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z
	.object({
		id: z.string().cuid().optional(),
		type: z.string(),
		provider: z.string(),
		providerAccountId: z.string(),
		refresh_token: z.string().optional().nullable(),
		access_token: z.string().optional().nullable(),
		expires_at: z.number().int().optional().nullable(),
		token_type: z.string().optional().nullable(),
		scope: z.string().optional().nullable(),
		id_token: z.string().optional().nullable(),
		session_state: z.string().optional().nullable()
	})
	.strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z
	.object({
		id: z.string().cuid().optional(),
		sessionToken: z.string(),
		expires: z.coerce.date()
	})
	.strict();

export const TenantUserCreateManyUserInputSchema: z.ZodType<Prisma.TenantUserCreateManyUserInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			tenantId: z.string()
		})
		.strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			provider: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			providerAccountId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			refresh_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			access_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			expires_at: z
				.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			token_type: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			scope: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			id_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			session_state: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			provider: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			providerAccountId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			refresh_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			access_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			expires_at: z
				.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			token_type: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			scope: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			id_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			session_state: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			provider: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			providerAccountId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			refresh_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			access_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			expires_at: z
				.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			token_type: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			scope: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			id_token: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			session_state: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			sessionToken: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			expires: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			sessionToken: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			expires: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			sessionToken: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			expires: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const TenantUserUpdateWithoutUserInputSchema: z.ZodType<Prisma.TenantUserUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			tenant: z.lazy(() => TenantUpdateOneRequiredWithoutTenantUsersNestedInputSchema).optional(),
			customForms: z.lazy(() => CustomFormUpdateManyWithoutUserNestedInputSchema).optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const TenantUserUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			customForms: z
				.lazy(() => CustomFormUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const TenantUserUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateManyWithoutUserInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFormCreateManyUserInputSchema: z.ZodType<Prisma.CustomFormCreateManyUserInput> =
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			createdAt: z.coerce.date().optional()
		})
		.strict();

export const CustomFieldResponseCreateManyUserInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateManyUserInput> =
	z
		.object({
			id: z.number().int().optional(),
			content: z.string(),
			fieldId: z.number().int(),
			createdAt: z.coerce.date().optional()
		})
		.strict();

export const CustomFormUpdateWithoutUserInputSchema: z.ZodType<Prisma.CustomFormUpdateWithoutUserInput> =
	z
		.object({
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional(),
			fields: z.lazy(() => CustomFieldUpdateManyWithoutFormNestedInputSchema).optional()
		})
		.strict();

export const CustomFormUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CustomFormUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional(),
			fields: z.lazy(() => CustomFieldUncheckedUpdateManyWithoutFormNestedInputSchema).optional()
		})
		.strict();

export const CustomFormUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CustomFormUncheckedUpdateManyWithoutUserInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFieldResponseUpdateWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateWithoutUserInput> =
	z
		.object({
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional(),
			field: z.lazy(() => CustomFieldUpdateOneRequiredWithoutResponsesNestedInputSchema).optional()
		})
		.strict();

export const CustomFieldResponseUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedUpdateWithoutUserInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			fieldId: z
				.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFieldResponseUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedUpdateManyWithoutUserInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			fieldId: z
				.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const ClientCreateManyTenantInputSchema: z.ZodType<Prisma.ClientCreateManyTenantInput> = z
	.object({
		id: z.string().cuid().optional(),
		name: z.string(),
		email: z.string(),
		phoneNumber: z
			.string()
			.regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
				message: 'Invalid Number!'
			}),
		avatar: z.string().optional().nullable()
	})
	.strict();

export const TenantUserCreateManyTenantInputSchema: z.ZodType<Prisma.TenantUserCreateManyTenantInput> =
	z
		.object({
			id: z.string().cuid().optional(),
			role: z.lazy(() => RoleSchema).optional(),
			userId: z.string()
		})
		.strict();

export const ClientUpdateWithoutTenantInputSchema: z.ZodType<Prisma.ClientUpdateWithoutTenantInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			phoneNumber: z
				.union([
					z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
						message: 'Invalid Number!'
					}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema)
				])
				.optional(),
			avatar: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const ClientUncheckedUpdateWithoutTenantInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateWithoutTenantInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			phoneNumber: z
				.union([
					z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
						message: 'Invalid Number!'
					}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema)
				])
				.optional(),
			avatar: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const ClientUncheckedUpdateManyWithoutTenantInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyWithoutTenantInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			phoneNumber: z
				.union([
					z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), {
						message: 'Invalid Number!'
					}),
					z.lazy(() => StringFieldUpdateOperationsInputSchema)
				])
				.optional(),
			avatar: z
				.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const TenantUserUpdateWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserUpdateWithoutTenantInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			user: z.lazy(() => UserUpdateOneRequiredWithoutTenantUsersNestedInputSchema).optional(),
			customForms: z.lazy(() => CustomFormUpdateManyWithoutUserNestedInputSchema).optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const TenantUserUncheckedUpdateWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateWithoutTenantInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			userId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			customForms: z
				.lazy(() => CustomFormUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional(),
			customFieldResponses: z
				.lazy(() => CustomFieldResponseUncheckedUpdateManyWithoutUserNestedInputSchema)
				.optional()
		})
		.strict();

export const TenantUserUncheckedUpdateManyWithoutTenantInputSchema: z.ZodType<Prisma.TenantUserUncheckedUpdateManyWithoutTenantInput> =
	z
		.object({
			id: z
				.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			role: z
				.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)])
				.optional(),
			userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
		})
		.strict();

export const CustomFieldCreateManyFormInputSchema: z.ZodType<Prisma.CustomFieldCreateManyFormInput> =
	z
		.object({
			id: z.number().int().optional(),
			name: z.string(),
			type: z.lazy(() => FormFieldTypeSchema),
			required: z.boolean().optional().nullable()
		})
		.strict();

export const CustomFieldUpdateWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldUpdateWithoutFormInput> =
	z
		.object({
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			type: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => EnumFormFieldTypeFieldUpdateOperationsInputSchema)
				])
				.optional(),
			required: z
				.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			responses: z.lazy(() => CustomFieldResponseUpdateManyWithoutFieldNestedInputSchema).optional()
		})
		.strict();

export const CustomFieldUncheckedUpdateWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldUncheckedUpdateWithoutFormInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			type: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => EnumFormFieldTypeFieldUpdateOperationsInputSchema)
				])
				.optional(),
			required: z
				.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable(),
			responses: z
				.lazy(() => CustomFieldResponseUncheckedUpdateManyWithoutFieldNestedInputSchema)
				.optional()
		})
		.strict();

export const CustomFieldUncheckedUpdateManyWithoutFormInputSchema: z.ZodType<Prisma.CustomFieldUncheckedUpdateManyWithoutFormInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
			type: z
				.union([
					z.lazy(() => FormFieldTypeSchema),
					z.lazy(() => EnumFormFieldTypeFieldUpdateOperationsInputSchema)
				])
				.optional(),
			required: z
				.union([z.boolean(), z.lazy(() => NullableBoolFieldUpdateOperationsInputSchema)])
				.optional()
				.nullable()
		})
		.strict();

export const CustomFieldResponseCreateManyFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseCreateManyFieldInput> =
	z
		.object({
			id: z.number().int().optional(),
			content: z.string(),
			tenantUserId: z.string(),
			createdAt: z.coerce.date().optional()
		})
		.strict();

export const CustomFieldResponseUpdateWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseUpdateWithoutFieldInput> =
	z
		.object({
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional(),
			user: z
				.lazy(() => TenantUserUpdateOneRequiredWithoutCustomFieldResponsesNestedInputSchema)
				.optional()
		})
		.strict();

export const CustomFieldResponseUncheckedUpdateWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedUpdateWithoutFieldInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantUserId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

export const CustomFieldResponseUncheckedUpdateManyWithoutFieldInputSchema: z.ZodType<Prisma.CustomFieldResponseUncheckedUpdateManyWithoutFieldInput> =
	z
		.object({
			id: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
			content: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			tenantUserId: z
				.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
				.optional(),
			createdAt: z
				.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)])
				.optional()
		})
		.strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		where: AccountWhereInputSchema.optional(),
		orderBy: z
			.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema])
			.optional(),
		cursor: AccountWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		where: AccountWhereInputSchema.optional(),
		orderBy: z
			.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema])
			.optional(),
		cursor: AccountWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		where: AccountWhereInputSchema.optional(),
		orderBy: z
			.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema])
			.optional(),
		cursor: AccountWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z
	.object({
		where: AccountWhereInputSchema.optional(),
		orderBy: z
			.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema])
			.optional(),
		cursor: AccountWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
	.object({
		where: AccountWhereInputSchema.optional(),
		orderBy: z
			.union([
				AccountOrderByWithAggregationInputSchema.array(),
				AccountOrderByWithAggregationInputSchema
			])
			.optional(),
		by: AccountScalarFieldEnumSchema.array(),
		having: AccountScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		where: AccountWhereUniqueInputSchema
	})
	.strict();

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		where: AccountWhereUniqueInputSchema
	})
	.strict();

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z
	.object({
		select: SessionSelectSchema.optional(),
		include: SessionIncludeSchema.optional(),
		where: SessionWhereInputSchema.optional(),
		orderBy: z
			.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema])
			.optional(),
		cursor: SessionWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z
	.object({
		select: SessionSelectSchema.optional(),
		include: SessionIncludeSchema.optional(),
		where: SessionWhereInputSchema.optional(),
		orderBy: z
			.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema])
			.optional(),
		cursor: SessionWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z
	.object({
		select: SessionSelectSchema.optional(),
		include: SessionIncludeSchema.optional(),
		where: SessionWhereInputSchema.optional(),
		orderBy: z
			.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema])
			.optional(),
		cursor: SessionWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z
	.object({
		where: SessionWhereInputSchema.optional(),
		orderBy: z
			.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema])
			.optional(),
		cursor: SessionWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z
	.object({
		where: SessionWhereInputSchema.optional(),
		orderBy: z
			.union([
				SessionOrderByWithAggregationInputSchema.array(),
				SessionOrderByWithAggregationInputSchema
			])
			.optional(),
		by: SessionScalarFieldEnumSchema.array(),
		having: SessionScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z
	.object({
		select: SessionSelectSchema.optional(),
		include: SessionIncludeSchema.optional(),
		where: SessionWhereUniqueInputSchema
	})
	.strict();

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z
	.object({
		select: SessionSelectSchema.optional(),
		include: SessionIncludeSchema.optional(),
		where: SessionWhereUniqueInputSchema
	})
	.strict();

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional()
	})
	.strict();

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional()
	})
	.strict();

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional()
	})
	.strict();

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema])
			.optional(),
		cursor: UserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
	.object({
		where: UserWhereInputSchema.optional(),
		orderBy: z
			.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema])
			.optional(),
		by: UserScalarFieldEnumSchema.array(),
		having: UserScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema
	})
	.strict();

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema
	})
	.strict();

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> =
	z
		.object({
			select: VerificationTokenSelectSchema.optional(),
			where: VerificationTokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					VerificationTokenOrderByWithRelationInputSchema.array(),
					VerificationTokenOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: VerificationTokenWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					VerificationTokenScalarFieldEnumSchema,
					VerificationTokenScalarFieldEnumSchema.array()
				])
				.optional()
		})
		.strict();

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> =
	z
		.object({
			select: VerificationTokenSelectSchema.optional(),
			where: VerificationTokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					VerificationTokenOrderByWithRelationInputSchema.array(),
					VerificationTokenOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: VerificationTokenWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					VerificationTokenScalarFieldEnumSchema,
					VerificationTokenScalarFieldEnumSchema.array()
				])
				.optional()
		})
		.strict();

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> =
	z
		.object({
			select: VerificationTokenSelectSchema.optional(),
			where: VerificationTokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					VerificationTokenOrderByWithRelationInputSchema.array(),
					VerificationTokenOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: VerificationTokenWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					VerificationTokenScalarFieldEnumSchema,
					VerificationTokenScalarFieldEnumSchema.array()
				])
				.optional()
		})
		.strict();

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> =
	z
		.object({
			where: VerificationTokenWhereInputSchema.optional(),
			orderBy: z
				.union([
					VerificationTokenOrderByWithRelationInputSchema.array(),
					VerificationTokenOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: VerificationTokenWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional()
		})
		.strict();

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z
	.object({
		where: VerificationTokenWhereInputSchema.optional(),
		orderBy: z
			.union([
				VerificationTokenOrderByWithAggregationInputSchema.array(),
				VerificationTokenOrderByWithAggregationInputSchema
			])
			.optional(),
		by: VerificationTokenScalarFieldEnumSchema.array(),
		having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> =
	z
		.object({
			select: VerificationTokenSelectSchema.optional(),
			where: VerificationTokenWhereUniqueInputSchema
		})
		.strict();

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> =
	z
		.object({
			select: VerificationTokenSelectSchema.optional(),
			where: VerificationTokenWhereUniqueInputSchema
		})
		.strict();

export const TenantUserFindFirstArgsSchema: z.ZodType<Prisma.TenantUserFindFirstArgs> = z
	.object({
		select: TenantUserSelectSchema.optional(),
		include: TenantUserIncludeSchema.optional(),
		where: TenantUserWhereInputSchema.optional(),
		orderBy: z
			.union([
				TenantUserOrderByWithRelationInputSchema.array(),
				TenantUserOrderByWithRelationInputSchema
			])
			.optional(),
		cursor: TenantUserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([TenantUserScalarFieldEnumSchema, TenantUserScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const TenantUserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TenantUserFindFirstOrThrowArgs> =
	z
		.object({
			select: TenantUserSelectSchema.optional(),
			include: TenantUserIncludeSchema.optional(),
			where: TenantUserWhereInputSchema.optional(),
			orderBy: z
				.union([
					TenantUserOrderByWithRelationInputSchema.array(),
					TenantUserOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: TenantUserWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([TenantUserScalarFieldEnumSchema, TenantUserScalarFieldEnumSchema.array()])
				.optional()
		})
		.strict();

export const TenantUserFindManyArgsSchema: z.ZodType<Prisma.TenantUserFindManyArgs> = z
	.object({
		select: TenantUserSelectSchema.optional(),
		include: TenantUserIncludeSchema.optional(),
		where: TenantUserWhereInputSchema.optional(),
		orderBy: z
			.union([
				TenantUserOrderByWithRelationInputSchema.array(),
				TenantUserOrderByWithRelationInputSchema
			])
			.optional(),
		cursor: TenantUserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([TenantUserScalarFieldEnumSchema, TenantUserScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const TenantUserAggregateArgsSchema: z.ZodType<Prisma.TenantUserAggregateArgs> = z
	.object({
		where: TenantUserWhereInputSchema.optional(),
		orderBy: z
			.union([
				TenantUserOrderByWithRelationInputSchema.array(),
				TenantUserOrderByWithRelationInputSchema
			])
			.optional(),
		cursor: TenantUserWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const TenantUserGroupByArgsSchema: z.ZodType<Prisma.TenantUserGroupByArgs> = z
	.object({
		where: TenantUserWhereInputSchema.optional(),
		orderBy: z
			.union([
				TenantUserOrderByWithAggregationInputSchema.array(),
				TenantUserOrderByWithAggregationInputSchema
			])
			.optional(),
		by: TenantUserScalarFieldEnumSchema.array(),
		having: TenantUserScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const TenantUserFindUniqueArgsSchema: z.ZodType<Prisma.TenantUserFindUniqueArgs> = z
	.object({
		select: TenantUserSelectSchema.optional(),
		include: TenantUserIncludeSchema.optional(),
		where: TenantUserWhereUniqueInputSchema
	})
	.strict();

export const TenantUserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TenantUserFindUniqueOrThrowArgs> =
	z
		.object({
			select: TenantUserSelectSchema.optional(),
			include: TenantUserIncludeSchema.optional(),
			where: TenantUserWhereUniqueInputSchema
		})
		.strict();

export const ClientFindFirstArgsSchema: z.ZodType<Prisma.ClientFindFirstArgs> = z
	.object({
		select: ClientSelectSchema.optional(),
		include: ClientIncludeSchema.optional(),
		where: ClientWhereInputSchema.optional(),
		orderBy: z
			.union([ClientOrderByWithRelationInputSchema.array(), ClientOrderByWithRelationInputSchema])
			.optional(),
		cursor: ClientWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([ClientScalarFieldEnumSchema, ClientScalarFieldEnumSchema.array()]).optional()
	})
	.strict();

export const ClientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClientFindFirstOrThrowArgs> = z
	.object({
		select: ClientSelectSchema.optional(),
		include: ClientIncludeSchema.optional(),
		where: ClientWhereInputSchema.optional(),
		orderBy: z
			.union([ClientOrderByWithRelationInputSchema.array(), ClientOrderByWithRelationInputSchema])
			.optional(),
		cursor: ClientWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([ClientScalarFieldEnumSchema, ClientScalarFieldEnumSchema.array()]).optional()
	})
	.strict();

export const ClientFindManyArgsSchema: z.ZodType<Prisma.ClientFindManyArgs> = z
	.object({
		select: ClientSelectSchema.optional(),
		include: ClientIncludeSchema.optional(),
		where: ClientWhereInputSchema.optional(),
		orderBy: z
			.union([ClientOrderByWithRelationInputSchema.array(), ClientOrderByWithRelationInputSchema])
			.optional(),
		cursor: ClientWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([ClientScalarFieldEnumSchema, ClientScalarFieldEnumSchema.array()]).optional()
	})
	.strict();

export const ClientAggregateArgsSchema: z.ZodType<Prisma.ClientAggregateArgs> = z
	.object({
		where: ClientWhereInputSchema.optional(),
		orderBy: z
			.union([ClientOrderByWithRelationInputSchema.array(), ClientOrderByWithRelationInputSchema])
			.optional(),
		cursor: ClientWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const ClientGroupByArgsSchema: z.ZodType<Prisma.ClientGroupByArgs> = z
	.object({
		where: ClientWhereInputSchema.optional(),
		orderBy: z
			.union([
				ClientOrderByWithAggregationInputSchema.array(),
				ClientOrderByWithAggregationInputSchema
			])
			.optional(),
		by: ClientScalarFieldEnumSchema.array(),
		having: ClientScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const ClientFindUniqueArgsSchema: z.ZodType<Prisma.ClientFindUniqueArgs> = z
	.object({
		select: ClientSelectSchema.optional(),
		include: ClientIncludeSchema.optional(),
		where: ClientWhereUniqueInputSchema
	})
	.strict();

export const ClientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClientFindUniqueOrThrowArgs> = z
	.object({
		select: ClientSelectSchema.optional(),
		include: ClientIncludeSchema.optional(),
		where: ClientWhereUniqueInputSchema
	})
	.strict();

export const TenantFindFirstArgsSchema: z.ZodType<Prisma.TenantFindFirstArgs> = z
	.object({
		select: TenantSelectSchema.optional(),
		include: TenantIncludeSchema.optional(),
		where: TenantWhereInputSchema.optional(),
		orderBy: z
			.union([TenantOrderByWithRelationInputSchema.array(), TenantOrderByWithRelationInputSchema])
			.optional(),
		cursor: TenantWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([TenantScalarFieldEnumSchema, TenantScalarFieldEnumSchema.array()]).optional()
	})
	.strict();

export const TenantFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TenantFindFirstOrThrowArgs> = z
	.object({
		select: TenantSelectSchema.optional(),
		include: TenantIncludeSchema.optional(),
		where: TenantWhereInputSchema.optional(),
		orderBy: z
			.union([TenantOrderByWithRelationInputSchema.array(), TenantOrderByWithRelationInputSchema])
			.optional(),
		cursor: TenantWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([TenantScalarFieldEnumSchema, TenantScalarFieldEnumSchema.array()]).optional()
	})
	.strict();

export const TenantFindManyArgsSchema: z.ZodType<Prisma.TenantFindManyArgs> = z
	.object({
		select: TenantSelectSchema.optional(),
		include: TenantIncludeSchema.optional(),
		where: TenantWhereInputSchema.optional(),
		orderBy: z
			.union([TenantOrderByWithRelationInputSchema.array(), TenantOrderByWithRelationInputSchema])
			.optional(),
		cursor: TenantWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z.union([TenantScalarFieldEnumSchema, TenantScalarFieldEnumSchema.array()]).optional()
	})
	.strict();

export const TenantAggregateArgsSchema: z.ZodType<Prisma.TenantAggregateArgs> = z
	.object({
		where: TenantWhereInputSchema.optional(),
		orderBy: z
			.union([TenantOrderByWithRelationInputSchema.array(), TenantOrderByWithRelationInputSchema])
			.optional(),
		cursor: TenantWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const TenantGroupByArgsSchema: z.ZodType<Prisma.TenantGroupByArgs> = z
	.object({
		where: TenantWhereInputSchema.optional(),
		orderBy: z
			.union([
				TenantOrderByWithAggregationInputSchema.array(),
				TenantOrderByWithAggregationInputSchema
			])
			.optional(),
		by: TenantScalarFieldEnumSchema.array(),
		having: TenantScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const TenantFindUniqueArgsSchema: z.ZodType<Prisma.TenantFindUniqueArgs> = z
	.object({
		select: TenantSelectSchema.optional(),
		include: TenantIncludeSchema.optional(),
		where: TenantWhereUniqueInputSchema
	})
	.strict();

export const TenantFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TenantFindUniqueOrThrowArgs> = z
	.object({
		select: TenantSelectSchema.optional(),
		include: TenantIncludeSchema.optional(),
		where: TenantWhereUniqueInputSchema
	})
	.strict();

export const CustomFormFindFirstArgsSchema: z.ZodType<Prisma.CustomFormFindFirstArgs> = z
	.object({
		select: CustomFormSelectSchema.optional(),
		include: CustomFormIncludeSchema.optional(),
		where: CustomFormWhereInputSchema.optional(),
		orderBy: z
			.union([
				CustomFormOrderByWithRelationInputSchema.array(),
				CustomFormOrderByWithRelationInputSchema
			])
			.optional(),
		cursor: CustomFormWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([CustomFormScalarFieldEnumSchema, CustomFormScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const CustomFormFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CustomFormFindFirstOrThrowArgs> =
	z
		.object({
			select: CustomFormSelectSchema.optional(),
			include: CustomFormIncludeSchema.optional(),
			where: CustomFormWhereInputSchema.optional(),
			orderBy: z
				.union([
					CustomFormOrderByWithRelationInputSchema.array(),
					CustomFormOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: CustomFormWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([CustomFormScalarFieldEnumSchema, CustomFormScalarFieldEnumSchema.array()])
				.optional()
		})
		.strict();

export const CustomFormFindManyArgsSchema: z.ZodType<Prisma.CustomFormFindManyArgs> = z
	.object({
		select: CustomFormSelectSchema.optional(),
		include: CustomFormIncludeSchema.optional(),
		where: CustomFormWhereInputSchema.optional(),
		orderBy: z
			.union([
				CustomFormOrderByWithRelationInputSchema.array(),
				CustomFormOrderByWithRelationInputSchema
			])
			.optional(),
		cursor: CustomFormWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([CustomFormScalarFieldEnumSchema, CustomFormScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const CustomFormAggregateArgsSchema: z.ZodType<Prisma.CustomFormAggregateArgs> = z
	.object({
		where: CustomFormWhereInputSchema.optional(),
		orderBy: z
			.union([
				CustomFormOrderByWithRelationInputSchema.array(),
				CustomFormOrderByWithRelationInputSchema
			])
			.optional(),
		cursor: CustomFormWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const CustomFormGroupByArgsSchema: z.ZodType<Prisma.CustomFormGroupByArgs> = z
	.object({
		where: CustomFormWhereInputSchema.optional(),
		orderBy: z
			.union([
				CustomFormOrderByWithAggregationInputSchema.array(),
				CustomFormOrderByWithAggregationInputSchema
			])
			.optional(),
		by: CustomFormScalarFieldEnumSchema.array(),
		having: CustomFormScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const CustomFormFindUniqueArgsSchema: z.ZodType<Prisma.CustomFormFindUniqueArgs> = z
	.object({
		select: CustomFormSelectSchema.optional(),
		include: CustomFormIncludeSchema.optional(),
		where: CustomFormWhereUniqueInputSchema
	})
	.strict();

export const CustomFormFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CustomFormFindUniqueOrThrowArgs> =
	z
		.object({
			select: CustomFormSelectSchema.optional(),
			include: CustomFormIncludeSchema.optional(),
			where: CustomFormWhereUniqueInputSchema
		})
		.strict();

export const CustomFieldFindFirstArgsSchema: z.ZodType<Prisma.CustomFieldFindFirstArgs> = z
	.object({
		select: CustomFieldSelectSchema.optional(),
		include: CustomFieldIncludeSchema.optional(),
		where: CustomFieldWhereInputSchema.optional(),
		orderBy: z
			.union([
				CustomFieldOrderByWithRelationInputSchema.array(),
				CustomFieldOrderByWithRelationInputSchema
			])
			.optional(),
		cursor: CustomFieldWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([CustomFieldScalarFieldEnumSchema, CustomFieldScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const CustomFieldFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CustomFieldFindFirstOrThrowArgs> =
	z
		.object({
			select: CustomFieldSelectSchema.optional(),
			include: CustomFieldIncludeSchema.optional(),
			where: CustomFieldWhereInputSchema.optional(),
			orderBy: z
				.union([
					CustomFieldOrderByWithRelationInputSchema.array(),
					CustomFieldOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: CustomFieldWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([CustomFieldScalarFieldEnumSchema, CustomFieldScalarFieldEnumSchema.array()])
				.optional()
		})
		.strict();

export const CustomFieldFindManyArgsSchema: z.ZodType<Prisma.CustomFieldFindManyArgs> = z
	.object({
		select: CustomFieldSelectSchema.optional(),
		include: CustomFieldIncludeSchema.optional(),
		where: CustomFieldWhereInputSchema.optional(),
		orderBy: z
			.union([
				CustomFieldOrderByWithRelationInputSchema.array(),
				CustomFieldOrderByWithRelationInputSchema
			])
			.optional(),
		cursor: CustomFieldWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional(),
		distinct: z
			.union([CustomFieldScalarFieldEnumSchema, CustomFieldScalarFieldEnumSchema.array()])
			.optional()
	})
	.strict();

export const CustomFieldAggregateArgsSchema: z.ZodType<Prisma.CustomFieldAggregateArgs> = z
	.object({
		where: CustomFieldWhereInputSchema.optional(),
		orderBy: z
			.union([
				CustomFieldOrderByWithRelationInputSchema.array(),
				CustomFieldOrderByWithRelationInputSchema
			])
			.optional(),
		cursor: CustomFieldWhereUniqueInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const CustomFieldGroupByArgsSchema: z.ZodType<Prisma.CustomFieldGroupByArgs> = z
	.object({
		where: CustomFieldWhereInputSchema.optional(),
		orderBy: z
			.union([
				CustomFieldOrderByWithAggregationInputSchema.array(),
				CustomFieldOrderByWithAggregationInputSchema
			])
			.optional(),
		by: CustomFieldScalarFieldEnumSchema.array(),
		having: CustomFieldScalarWhereWithAggregatesInputSchema.optional(),
		take: z.number().optional(),
		skip: z.number().optional()
	})
	.strict();

export const CustomFieldFindUniqueArgsSchema: z.ZodType<Prisma.CustomFieldFindUniqueArgs> = z
	.object({
		select: CustomFieldSelectSchema.optional(),
		include: CustomFieldIncludeSchema.optional(),
		where: CustomFieldWhereUniqueInputSchema
	})
	.strict();

export const CustomFieldFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CustomFieldFindUniqueOrThrowArgs> =
	z
		.object({
			select: CustomFieldSelectSchema.optional(),
			include: CustomFieldIncludeSchema.optional(),
			where: CustomFieldWhereUniqueInputSchema
		})
		.strict();

export const CustomFieldResponseFindFirstArgsSchema: z.ZodType<Prisma.CustomFieldResponseFindFirstArgs> =
	z
		.object({
			select: CustomFieldResponseSelectSchema.optional(),
			include: CustomFieldResponseIncludeSchema.optional(),
			where: CustomFieldResponseWhereInputSchema.optional(),
			orderBy: z
				.union([
					CustomFieldResponseOrderByWithRelationInputSchema.array(),
					CustomFieldResponseOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: CustomFieldResponseWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					CustomFieldResponseScalarFieldEnumSchema,
					CustomFieldResponseScalarFieldEnumSchema.array()
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CustomFieldResponseFindFirstOrThrowArgs> =
	z
		.object({
			select: CustomFieldResponseSelectSchema.optional(),
			include: CustomFieldResponseIncludeSchema.optional(),
			where: CustomFieldResponseWhereInputSchema.optional(),
			orderBy: z
				.union([
					CustomFieldResponseOrderByWithRelationInputSchema.array(),
					CustomFieldResponseOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: CustomFieldResponseWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					CustomFieldResponseScalarFieldEnumSchema,
					CustomFieldResponseScalarFieldEnumSchema.array()
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseFindManyArgsSchema: z.ZodType<Prisma.CustomFieldResponseFindManyArgs> =
	z
		.object({
			select: CustomFieldResponseSelectSchema.optional(),
			include: CustomFieldResponseIncludeSchema.optional(),
			where: CustomFieldResponseWhereInputSchema.optional(),
			orderBy: z
				.union([
					CustomFieldResponseOrderByWithRelationInputSchema.array(),
					CustomFieldResponseOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: CustomFieldResponseWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional(),
			distinct: z
				.union([
					CustomFieldResponseScalarFieldEnumSchema,
					CustomFieldResponseScalarFieldEnumSchema.array()
				])
				.optional()
		})
		.strict();

export const CustomFieldResponseAggregateArgsSchema: z.ZodType<Prisma.CustomFieldResponseAggregateArgs> =
	z
		.object({
			where: CustomFieldResponseWhereInputSchema.optional(),
			orderBy: z
				.union([
					CustomFieldResponseOrderByWithRelationInputSchema.array(),
					CustomFieldResponseOrderByWithRelationInputSchema
				])
				.optional(),
			cursor: CustomFieldResponseWhereUniqueInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional()
		})
		.strict();

export const CustomFieldResponseGroupByArgsSchema: z.ZodType<Prisma.CustomFieldResponseGroupByArgs> =
	z
		.object({
			where: CustomFieldResponseWhereInputSchema.optional(),
			orderBy: z
				.union([
					CustomFieldResponseOrderByWithAggregationInputSchema.array(),
					CustomFieldResponseOrderByWithAggregationInputSchema
				])
				.optional(),
			by: CustomFieldResponseScalarFieldEnumSchema.array(),
			having: CustomFieldResponseScalarWhereWithAggregatesInputSchema.optional(),
			take: z.number().optional(),
			skip: z.number().optional()
		})
		.strict();

export const CustomFieldResponseFindUniqueArgsSchema: z.ZodType<Prisma.CustomFieldResponseFindUniqueArgs> =
	z
		.object({
			select: CustomFieldResponseSelectSchema.optional(),
			include: CustomFieldResponseIncludeSchema.optional(),
			where: CustomFieldResponseWhereUniqueInputSchema
		})
		.strict();

export const CustomFieldResponseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CustomFieldResponseFindUniqueOrThrowArgs> =
	z
		.object({
			select: CustomFieldResponseSelectSchema.optional(),
			include: CustomFieldResponseIncludeSchema.optional(),
			where: CustomFieldResponseWhereUniqueInputSchema
		})
		.strict();

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		data: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema])
	})
	.strict();

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		where: AccountWhereUniqueInputSchema,
		create: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema]),
		update: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema])
	})
	.strict();

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z
	.object({
		data: z.union([AccountCreateManyInputSchema, AccountCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional()
	})
	.strict();

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		where: AccountWhereUniqueInputSchema
	})
	.strict();

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
	.object({
		select: AccountSelectSchema.optional(),
		include: AccountIncludeSchema.optional(),
		data: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema]),
		where: AccountWhereUniqueInputSchema
	})
	.strict();

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z
	.object({
		data: z.union([AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema]),
		where: AccountWhereInputSchema.optional()
	})
	.strict();

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z
	.object({
		where: AccountWhereInputSchema.optional()
	})
	.strict();

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z
	.object({
		select: SessionSelectSchema.optional(),
		include: SessionIncludeSchema.optional(),
		data: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema])
	})
	.strict();

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z
	.object({
		select: SessionSelectSchema.optional(),
		include: SessionIncludeSchema.optional(),
		where: SessionWhereUniqueInputSchema,
		create: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema]),
		update: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema])
	})
	.strict();

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z
	.object({
		data: z.union([SessionCreateManyInputSchema, SessionCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional()
	})
	.strict();

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z
	.object({
		select: SessionSelectSchema.optional(),
		include: SessionIncludeSchema.optional(),
		where: SessionWhereUniqueInputSchema
	})
	.strict();

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z
	.object({
		select: SessionSelectSchema.optional(),
		include: SessionIncludeSchema.optional(),
		data: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
		where: SessionWhereUniqueInputSchema
	})
	.strict();

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z
	.object({
		data: z.union([SessionUpdateManyMutationInputSchema, SessionUncheckedUpdateManyInputSchema]),
		where: SessionWhereInputSchema.optional()
	})
	.strict();

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z
	.object({
		where: SessionWhereInputSchema.optional()
	})
	.strict();

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]).optional()
	})
	.strict();

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema,
		create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
		update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema])
	})
	.strict();

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
	.object({
		data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional()
	})
	.strict();

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		where: UserWhereUniqueInputSchema
	})
	.strict();

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
	.object({
		select: UserSelectSchema.optional(),
		include: UserIncludeSchema.optional(),
		data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
		where: UserWhereUniqueInputSchema
	})
	.strict();

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
	.object({
		data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
		where: UserWhereInputSchema.optional()
	})
	.strict();

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
	.object({
		where: UserWhereInputSchema.optional()
	})
	.strict();

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z
	.object({
		select: VerificationTokenSelectSchema.optional(),
		data: z.union([VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema])
	})
	.strict();

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z
	.object({
		select: VerificationTokenSelectSchema.optional(),
		where: VerificationTokenWhereUniqueInputSchema,
		create: z.union([
			VerificationTokenCreateInputSchema,
			VerificationTokenUncheckedCreateInputSchema
		]),
		update: z.union([
			VerificationTokenUpdateInputSchema,
			VerificationTokenUncheckedUpdateInputSchema
		])
	})
	.strict();

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> =
	z
		.object({
			data: z.union([
				VerificationTokenCreateManyInputSchema,
				VerificationTokenCreateManyInputSchema.array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z
	.object({
		select: VerificationTokenSelectSchema.optional(),
		where: VerificationTokenWhereUniqueInputSchema
	})
	.strict();

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z
	.object({
		select: VerificationTokenSelectSchema.optional(),
		data: z.union([
			VerificationTokenUpdateInputSchema,
			VerificationTokenUncheckedUpdateInputSchema
		]),
		where: VerificationTokenWhereUniqueInputSchema
	})
	.strict();

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> =
	z
		.object({
			data: z.union([
				VerificationTokenUpdateManyMutationInputSchema,
				VerificationTokenUncheckedUpdateManyInputSchema
			]),
			where: VerificationTokenWhereInputSchema.optional()
		})
		.strict();

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> =
	z
		.object({
			where: VerificationTokenWhereInputSchema.optional()
		})
		.strict();

export const TenantUserCreateArgsSchema: z.ZodType<Prisma.TenantUserCreateArgs> = z
	.object({
		select: TenantUserSelectSchema.optional(),
		include: TenantUserIncludeSchema.optional(),
		data: z.union([TenantUserCreateInputSchema, TenantUserUncheckedCreateInputSchema])
	})
	.strict();

export const TenantUserUpsertArgsSchema: z.ZodType<Prisma.TenantUserUpsertArgs> = z
	.object({
		select: TenantUserSelectSchema.optional(),
		include: TenantUserIncludeSchema.optional(),
		where: TenantUserWhereUniqueInputSchema,
		create: z.union([TenantUserCreateInputSchema, TenantUserUncheckedCreateInputSchema]),
		update: z.union([TenantUserUpdateInputSchema, TenantUserUncheckedUpdateInputSchema])
	})
	.strict();

export const TenantUserCreateManyArgsSchema: z.ZodType<Prisma.TenantUserCreateManyArgs> = z
	.object({
		data: z.union([TenantUserCreateManyInputSchema, TenantUserCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional()
	})
	.strict();

export const TenantUserDeleteArgsSchema: z.ZodType<Prisma.TenantUserDeleteArgs> = z
	.object({
		select: TenantUserSelectSchema.optional(),
		include: TenantUserIncludeSchema.optional(),
		where: TenantUserWhereUniqueInputSchema
	})
	.strict();

export const TenantUserUpdateArgsSchema: z.ZodType<Prisma.TenantUserUpdateArgs> = z
	.object({
		select: TenantUserSelectSchema.optional(),
		include: TenantUserIncludeSchema.optional(),
		data: z.union([TenantUserUpdateInputSchema, TenantUserUncheckedUpdateInputSchema]),
		where: TenantUserWhereUniqueInputSchema
	})
	.strict();

export const TenantUserUpdateManyArgsSchema: z.ZodType<Prisma.TenantUserUpdateManyArgs> = z
	.object({
		data: z.union([
			TenantUserUpdateManyMutationInputSchema,
			TenantUserUncheckedUpdateManyInputSchema
		]),
		where: TenantUserWhereInputSchema.optional()
	})
	.strict();

export const TenantUserDeleteManyArgsSchema: z.ZodType<Prisma.TenantUserDeleteManyArgs> = z
	.object({
		where: TenantUserWhereInputSchema.optional()
	})
	.strict();

export const ClientCreateArgsSchema: z.ZodType<Prisma.ClientCreateArgs> = z
	.object({
		select: ClientSelectSchema.optional(),
		include: ClientIncludeSchema.optional(),
		data: z.union([ClientCreateInputSchema, ClientUncheckedCreateInputSchema])
	})
	.strict();

export const ClientUpsertArgsSchema: z.ZodType<Prisma.ClientUpsertArgs> = z
	.object({
		select: ClientSelectSchema.optional(),
		include: ClientIncludeSchema.optional(),
		where: ClientWhereUniqueInputSchema,
		create: z.union([ClientCreateInputSchema, ClientUncheckedCreateInputSchema]),
		update: z.union([ClientUpdateInputSchema, ClientUncheckedUpdateInputSchema])
	})
	.strict();

export const ClientCreateManyArgsSchema: z.ZodType<Prisma.ClientCreateManyArgs> = z
	.object({
		data: z.union([ClientCreateManyInputSchema, ClientCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional()
	})
	.strict();

export const ClientDeleteArgsSchema: z.ZodType<Prisma.ClientDeleteArgs> = z
	.object({
		select: ClientSelectSchema.optional(),
		include: ClientIncludeSchema.optional(),
		where: ClientWhereUniqueInputSchema
	})
	.strict();

export const ClientUpdateArgsSchema: z.ZodType<Prisma.ClientUpdateArgs> = z
	.object({
		select: ClientSelectSchema.optional(),
		include: ClientIncludeSchema.optional(),
		data: z.union([ClientUpdateInputSchema, ClientUncheckedUpdateInputSchema]),
		where: ClientWhereUniqueInputSchema
	})
	.strict();

export const ClientUpdateManyArgsSchema: z.ZodType<Prisma.ClientUpdateManyArgs> = z
	.object({
		data: z.union([ClientUpdateManyMutationInputSchema, ClientUncheckedUpdateManyInputSchema]),
		where: ClientWhereInputSchema.optional()
	})
	.strict();

export const ClientDeleteManyArgsSchema: z.ZodType<Prisma.ClientDeleteManyArgs> = z
	.object({
		where: ClientWhereInputSchema.optional()
	})
	.strict();

export const TenantCreateArgsSchema: z.ZodType<Prisma.TenantCreateArgs> = z
	.object({
		select: TenantSelectSchema.optional(),
		include: TenantIncludeSchema.optional(),
		data: z.union([TenantCreateInputSchema, TenantUncheckedCreateInputSchema])
	})
	.strict();

export const TenantUpsertArgsSchema: z.ZodType<Prisma.TenantUpsertArgs> = z
	.object({
		select: TenantSelectSchema.optional(),
		include: TenantIncludeSchema.optional(),
		where: TenantWhereUniqueInputSchema,
		create: z.union([TenantCreateInputSchema, TenantUncheckedCreateInputSchema]),
		update: z.union([TenantUpdateInputSchema, TenantUncheckedUpdateInputSchema])
	})
	.strict();

export const TenantCreateManyArgsSchema: z.ZodType<Prisma.TenantCreateManyArgs> = z
	.object({
		data: z.union([TenantCreateManyInputSchema, TenantCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional()
	})
	.strict();

export const TenantDeleteArgsSchema: z.ZodType<Prisma.TenantDeleteArgs> = z
	.object({
		select: TenantSelectSchema.optional(),
		include: TenantIncludeSchema.optional(),
		where: TenantWhereUniqueInputSchema
	})
	.strict();

export const TenantUpdateArgsSchema: z.ZodType<Prisma.TenantUpdateArgs> = z
	.object({
		select: TenantSelectSchema.optional(),
		include: TenantIncludeSchema.optional(),
		data: z.union([TenantUpdateInputSchema, TenantUncheckedUpdateInputSchema]),
		where: TenantWhereUniqueInputSchema
	})
	.strict();

export const TenantUpdateManyArgsSchema: z.ZodType<Prisma.TenantUpdateManyArgs> = z
	.object({
		data: z.union([TenantUpdateManyMutationInputSchema, TenantUncheckedUpdateManyInputSchema]),
		where: TenantWhereInputSchema.optional()
	})
	.strict();

export const TenantDeleteManyArgsSchema: z.ZodType<Prisma.TenantDeleteManyArgs> = z
	.object({
		where: TenantWhereInputSchema.optional()
	})
	.strict();

export const CustomFormCreateArgsSchema: z.ZodType<Prisma.CustomFormCreateArgs> = z
	.object({
		select: CustomFormSelectSchema.optional(),
		include: CustomFormIncludeSchema.optional(),
		data: z.union([CustomFormCreateInputSchema, CustomFormUncheckedCreateInputSchema])
	})
	.strict();

export const CustomFormUpsertArgsSchema: z.ZodType<Prisma.CustomFormUpsertArgs> = z
	.object({
		select: CustomFormSelectSchema.optional(),
		include: CustomFormIncludeSchema.optional(),
		where: CustomFormWhereUniqueInputSchema,
		create: z.union([CustomFormCreateInputSchema, CustomFormUncheckedCreateInputSchema]),
		update: z.union([CustomFormUpdateInputSchema, CustomFormUncheckedUpdateInputSchema])
	})
	.strict();

export const CustomFormCreateManyArgsSchema: z.ZodType<Prisma.CustomFormCreateManyArgs> = z
	.object({
		data: z.union([CustomFormCreateManyInputSchema, CustomFormCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional()
	})
	.strict();

export const CustomFormDeleteArgsSchema: z.ZodType<Prisma.CustomFormDeleteArgs> = z
	.object({
		select: CustomFormSelectSchema.optional(),
		include: CustomFormIncludeSchema.optional(),
		where: CustomFormWhereUniqueInputSchema
	})
	.strict();

export const CustomFormUpdateArgsSchema: z.ZodType<Prisma.CustomFormUpdateArgs> = z
	.object({
		select: CustomFormSelectSchema.optional(),
		include: CustomFormIncludeSchema.optional(),
		data: z.union([CustomFormUpdateInputSchema, CustomFormUncheckedUpdateInputSchema]),
		where: CustomFormWhereUniqueInputSchema
	})
	.strict();

export const CustomFormUpdateManyArgsSchema: z.ZodType<Prisma.CustomFormUpdateManyArgs> = z
	.object({
		data: z.union([
			CustomFormUpdateManyMutationInputSchema,
			CustomFormUncheckedUpdateManyInputSchema
		]),
		where: CustomFormWhereInputSchema.optional()
	})
	.strict();

export const CustomFormDeleteManyArgsSchema: z.ZodType<Prisma.CustomFormDeleteManyArgs> = z
	.object({
		where: CustomFormWhereInputSchema.optional()
	})
	.strict();

export const CustomFieldCreateArgsSchema: z.ZodType<Prisma.CustomFieldCreateArgs> = z
	.object({
		select: CustomFieldSelectSchema.optional(),
		include: CustomFieldIncludeSchema.optional(),
		data: z.union([CustomFieldCreateInputSchema, CustomFieldUncheckedCreateInputSchema])
	})
	.strict();

export const CustomFieldUpsertArgsSchema: z.ZodType<Prisma.CustomFieldUpsertArgs> = z
	.object({
		select: CustomFieldSelectSchema.optional(),
		include: CustomFieldIncludeSchema.optional(),
		where: CustomFieldWhereUniqueInputSchema,
		create: z.union([CustomFieldCreateInputSchema, CustomFieldUncheckedCreateInputSchema]),
		update: z.union([CustomFieldUpdateInputSchema, CustomFieldUncheckedUpdateInputSchema])
	})
	.strict();

export const CustomFieldCreateManyArgsSchema: z.ZodType<Prisma.CustomFieldCreateManyArgs> = z
	.object({
		data: z.union([CustomFieldCreateManyInputSchema, CustomFieldCreateManyInputSchema.array()]),
		skipDuplicates: z.boolean().optional()
	})
	.strict();

export const CustomFieldDeleteArgsSchema: z.ZodType<Prisma.CustomFieldDeleteArgs> = z
	.object({
		select: CustomFieldSelectSchema.optional(),
		include: CustomFieldIncludeSchema.optional(),
		where: CustomFieldWhereUniqueInputSchema
	})
	.strict();

export const CustomFieldUpdateArgsSchema: z.ZodType<Prisma.CustomFieldUpdateArgs> = z
	.object({
		select: CustomFieldSelectSchema.optional(),
		include: CustomFieldIncludeSchema.optional(),
		data: z.union([CustomFieldUpdateInputSchema, CustomFieldUncheckedUpdateInputSchema]),
		where: CustomFieldWhereUniqueInputSchema
	})
	.strict();

export const CustomFieldUpdateManyArgsSchema: z.ZodType<Prisma.CustomFieldUpdateManyArgs> = z
	.object({
		data: z.union([
			CustomFieldUpdateManyMutationInputSchema,
			CustomFieldUncheckedUpdateManyInputSchema
		]),
		where: CustomFieldWhereInputSchema.optional()
	})
	.strict();

export const CustomFieldDeleteManyArgsSchema: z.ZodType<Prisma.CustomFieldDeleteManyArgs> = z
	.object({
		where: CustomFieldWhereInputSchema.optional()
	})
	.strict();

export const CustomFieldResponseCreateArgsSchema: z.ZodType<Prisma.CustomFieldResponseCreateArgs> =
	z
		.object({
			select: CustomFieldResponseSelectSchema.optional(),
			include: CustomFieldResponseIncludeSchema.optional(),
			data: z.union([
				CustomFieldResponseCreateInputSchema,
				CustomFieldResponseUncheckedCreateInputSchema
			])
		})
		.strict();

export const CustomFieldResponseUpsertArgsSchema: z.ZodType<Prisma.CustomFieldResponseUpsertArgs> =
	z
		.object({
			select: CustomFieldResponseSelectSchema.optional(),
			include: CustomFieldResponseIncludeSchema.optional(),
			where: CustomFieldResponseWhereUniqueInputSchema,
			create: z.union([
				CustomFieldResponseCreateInputSchema,
				CustomFieldResponseUncheckedCreateInputSchema
			]),
			update: z.union([
				CustomFieldResponseUpdateInputSchema,
				CustomFieldResponseUncheckedUpdateInputSchema
			])
		})
		.strict();

export const CustomFieldResponseCreateManyArgsSchema: z.ZodType<Prisma.CustomFieldResponseCreateManyArgs> =
	z
		.object({
			data: z.union([
				CustomFieldResponseCreateManyInputSchema,
				CustomFieldResponseCreateManyInputSchema.array()
			]),
			skipDuplicates: z.boolean().optional()
		})
		.strict();

export const CustomFieldResponseDeleteArgsSchema: z.ZodType<Prisma.CustomFieldResponseDeleteArgs> =
	z
		.object({
			select: CustomFieldResponseSelectSchema.optional(),
			include: CustomFieldResponseIncludeSchema.optional(),
			where: CustomFieldResponseWhereUniqueInputSchema
		})
		.strict();

export const CustomFieldResponseUpdateArgsSchema: z.ZodType<Prisma.CustomFieldResponseUpdateArgs> =
	z
		.object({
			select: CustomFieldResponseSelectSchema.optional(),
			include: CustomFieldResponseIncludeSchema.optional(),
			data: z.union([
				CustomFieldResponseUpdateInputSchema,
				CustomFieldResponseUncheckedUpdateInputSchema
			]),
			where: CustomFieldResponseWhereUniqueInputSchema
		})
		.strict();

export const CustomFieldResponseUpdateManyArgsSchema: z.ZodType<Prisma.CustomFieldResponseUpdateManyArgs> =
	z
		.object({
			data: z.union([
				CustomFieldResponseUpdateManyMutationInputSchema,
				CustomFieldResponseUncheckedUpdateManyInputSchema
			]),
			where: CustomFieldResponseWhereInputSchema.optional()
		})
		.strict();

export const CustomFieldResponseDeleteManyArgsSchema: z.ZodType<Prisma.CustomFieldResponseDeleteManyArgs> =
	z
		.object({
			where: CustomFieldResponseWhereInputSchema.optional()
		})
		.strict();
