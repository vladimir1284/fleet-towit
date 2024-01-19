import { z } from 'zod';
import './sentry-release-injection-file-4a7720ec.js';

z.enum(["ReadUncommitted", "ReadCommitted", "RepeatableRead", "Serializable"]);
const AccountScalarFieldEnumSchema = z.enum(["id", "userId", "type", "provider", "providerAccountId", "refresh_token", "access_token", "expires_at", "token_type", "scope", "id_token", "session_state"]);
const SessionScalarFieldEnumSchema = z.enum(["id", "sessionToken", "userId", "expires"]);
const UserScalarFieldEnumSchema = z.enum(["id", "name", "email", "emailVerified", "image"]);
const VerificationTokenScalarFieldEnumSchema = z.enum(["identifier", "token", "expires"]);
const CompanyUserScalarFieldEnumSchema = z.enum(["id", "role", "companyId", "userId"]);
const ClientScalarFieldEnumSchema = z.enum(["id", "name", "email", "phoneNumber", "avatar", "companyId"]);
const CompanyScalarFieldEnumSchema = z.enum(["id", "name", "email", "isAdmin"]);
const SortOrderSchema = z.enum(["asc", "desc"]);
const QueryModeSchema = z.enum(["default", "insensitive"]);
const NullsOrderSchema = z.enum(["first", "last"]);
const RoleSchema = z.enum(["STAFF", "ADMIN", "OWNER"]);
z.object({
  id: z.string().cuid(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.number().int(),
  refresh_token: z.string().nullable(),
  access_token: z.string().nullable(),
  expires_at: z.number().int().nullable(),
  token_type: z.string().nullable(),
  scope: z.string().nullable(),
  id_token: z.string().nullable(),
  session_state: z.string().nullable()
});
z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
});
const UserSchema = z.object({
  /**
   * .omit([model, input])
   */
  id: z.string().cuid(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.coerce.date().nullable(),
  image: z.string().nullable()
});
z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
});
z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  companyId: z.string(),
  userId: z.string()
});
z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }),
  avatar: z.string().nullable(),
  companyId: z.string()
});
const CompanySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string().nullable(),
  isAdmin: z.boolean()
});
const AccountIncludeSchema = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
}).strict();
z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional()
}).strict();
const AccountSelectSchema = z.object({
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
}).strict();
const SessionIncludeSchema = z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
}).strict();
z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional()
}).strict();
const SessionSelectSchema = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
}).strict();
const UserIncludeSchema = z.object({
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  companyUsers: z.union([z.boolean(), z.lazy(() => CompanyUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional()
}).strict();
const UserArgsSchema = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional()
}).strict();
const UserCountOutputTypeArgsSchema = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish()
}).strict();
const UserCountOutputTypeSelectSchema = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  companyUsers: z.boolean().optional()
}).strict();
const UserSelectSchema = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  accounts: z.union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  companyUsers: z.union([z.boolean(), z.lazy(() => CompanyUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)]).optional()
}).strict();
const VerificationTokenSelectSchema = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional()
}).strict();
const CompanyUserIncludeSchema = z.object({
  company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
}).strict();
z.object({
  select: z.lazy(() => CompanyUserSelectSchema).optional(),
  include: z.lazy(() => CompanyUserIncludeSchema).optional()
}).strict();
const CompanyUserSelectSchema = z.object({
  id: z.boolean().optional(),
  role: z.boolean().optional(),
  companyId: z.boolean().optional(),
  userId: z.boolean().optional(),
  company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional()
}).strict();
const ClientIncludeSchema = z.object({
  company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional()
}).strict();
z.object({
  select: z.lazy(() => ClientSelectSchema).optional(),
  include: z.lazy(() => ClientIncludeSchema).optional()
}).strict();
const ClientSelectSchema = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  avatar: z.boolean().optional(),
  companyId: z.boolean().optional(),
  company: z.union([z.boolean(), z.lazy(() => CompanyArgsSchema)]).optional()
}).strict();
const CompanyIncludeSchema = z.object({
  clients: z.union([z.boolean(), z.lazy(() => ClientFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(), z.lazy(() => CompanyUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional()
}).strict();
const CompanyArgsSchema = z.object({
  select: z.lazy(() => CompanySelectSchema).optional(),
  include: z.lazy(() => CompanyIncludeSchema).optional()
}).strict();
const CompanyCountOutputTypeArgsSchema = z.object({
  select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish()
}).strict();
const CompanyCountOutputTypeSelectSchema = z.object({
  clients: z.boolean().optional(),
  users: z.boolean().optional()
}).strict();
const CompanySelectSchema = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  clients: z.union([z.boolean(), z.lazy(() => ClientFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(), z.lazy(() => CompanyUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional()
}).strict();
const AccountWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional()
}).strict();
const AccountOrderByWithRelationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  access_token: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  expires_at: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  token_type: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  scope: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  id_token: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  session_state: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();
const AccountWhereUniqueInputSchema = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid()
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  })
]).and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountWhereInputSchema), z.lazy(() => AccountWhereInputSchema).array()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => IntFilterSchema), z.number().int()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableFilterSchema), z.number().int()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional()
}).strict());
const AccountOrderByWithAggregationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  access_token: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  expires_at: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  token_type: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  scope: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  id_token: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  session_state: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();
const AccountScalarWhereWithAggregatesInputSchema = z.object({
  AND: z.union([z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountScalarWhereWithAggregatesInputSchema), z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableWithAggregatesFilterSchema), z.number()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable()
}).strict();
const SessionWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  sessionToken: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional()
}).strict();
const SessionOrderByWithRelationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();
const SessionWhereUniqueInputSchema = z.union([
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
]).and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionWhereInputSchema), z.lazy(() => SessionWhereInputSchema).array()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional()
}).strict());
const SessionOrderByWithAggregationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();
const SessionScalarWhereWithAggregatesInputSchema = z.object({
  AND: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionScalarWhereWithAggregatesInputSchema), z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  sessionToken: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional()
}).strict();
const UserWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  emailVerified: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
  image: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserListRelationFilterSchema).optional()
}).strict();
const UserOrderByWithRelationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  email: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  emailVerified: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  image: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserOrderByRelationAggregateInputSchema).optional()
}).strict();
const UserWhereUniqueInputSchema = z.union([
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
]).and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserWhereInputSchema), z.lazy(() => UserWhereInputSchema).array()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  emailVerified: z.union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()]).optional().nullable(),
  image: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserListRelationFilterSchema).optional()
}).strict());
const UserOrderByWithAggregationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  email: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  emailVerified: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  image: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();
const UserScalarWhereWithAggregatesInputSchema = z.object({
  AND: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserScalarWhereWithAggregatesInputSchema), z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  email: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  emailVerified: z.union([z.lazy(() => DateTimeNullableWithAggregatesFilterSchema), z.coerce.date()]).optional().nullable(),
  image: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable()
}).strict();
const VerificationTokenWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array()]).optional(),
  identifier: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
}).strict();
const VerificationTokenOrderByWithRelationInputSchema = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();
const VerificationTokenWhereUniqueInputSchema = z.union([
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
]).and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VerificationTokenWhereInputSchema), z.lazy(() => VerificationTokenWhereInputSchema).array()]).optional(),
  identifier: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
}).strict());
const VerificationTokenOrderByWithAggregationInputSchema = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();
const VerificationTokenScalarWhereWithAggregatesInputSchema = z.object({
  AND: z.union([z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema), z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array()]).optional(),
  identifier: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  token: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeWithAggregatesFilterSchema), z.coerce.date()]).optional()
}).strict();
const CompanyUserWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => CompanyUserWhereInputSchema), z.lazy(() => CompanyUserWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CompanyUserWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompanyUserWhereInputSchema), z.lazy(() => CompanyUserWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
  companyId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => CompanyRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema)]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional()
}).strict();
const CompanyUserOrderByWithRelationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();
const CompanyUserWhereUniqueInputSchema = z.object({
  id: z.string().cuid()
}).and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([z.lazy(() => CompanyUserWhereInputSchema), z.lazy(() => CompanyUserWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CompanyUserWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompanyUserWhereInputSchema), z.lazy(() => CompanyUserWhereInputSchema).array()]).optional(),
  role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
  companyId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => CompanyRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema)]).optional(),
  user: z.union([z.lazy(() => UserRelationFilterSchema), z.lazy(() => UserWhereInputSchema)]).optional()
}).strict());
const CompanyUserOrderByWithAggregationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyUserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyUserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyUserMinOrderByAggregateInputSchema).optional()
}).strict();
const CompanyUserScalarWhereWithAggregatesInputSchema = z.object({
  AND: z.union([z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumRoleWithAggregatesFilterSchema), z.lazy(() => RoleSchema)]).optional(),
  companyId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional()
}).strict();
const ClientWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => ClientWhereInputSchema), z.lazy(() => ClientWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ClientWhereInputSchema), z.lazy(() => ClientWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  phoneNumber: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  avatar: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  companyId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => CompanyRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema)]).optional()
}).strict();
const ClientOrderByWithRelationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional()
}).strict();
const ClientWhereUniqueInputSchema = z.union([
  z.object({
    id: z.string().cuid(),
    phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" })
  }),
  z.object({
    id: z.string().cuid()
  }),
  z.object({
    phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" })
  })
]).and(z.object({
  id: z.string().cuid().optional(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }).optional(),
  AND: z.union([z.lazy(() => ClientWhereInputSchema), z.lazy(() => ClientWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ClientWhereInputSchema), z.lazy(() => ClientWhereInputSchema).array()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  avatar: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  companyId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  company: z.union([z.lazy(() => CompanyRelationFilterSchema), z.lazy(() => CompanyWhereInputSchema)]).optional()
}).strict());
const ClientOrderByWithAggregationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ClientCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ClientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ClientMinOrderByAggregateInputSchema).optional()
}).strict();
const ClientScalarWhereWithAggregatesInputSchema = z.object({
  AND: z.union([z.lazy(() => ClientScalarWhereWithAggregatesInputSchema), z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ClientScalarWhereWithAggregatesInputSchema), z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  phoneNumber: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  avatar: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  companyId: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional()
}).strict();
const CompanyWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  isAdmin: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  clients: z.lazy(() => ClientListRelationFilterSchema).optional(),
  users: z.lazy(() => CompanyUserListRelationFilterSchema).optional()
}).strict();
const CompanyOrderByWithRelationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  clients: z.lazy(() => ClientOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => CompanyUserOrderByRelationAggregateInputSchema).optional()
}).strict();
const CompanyWhereUniqueInputSchema = z.object({
  id: z.string().cuid()
}).and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompanyWhereInputSchema), z.lazy(() => CompanyWhereInputSchema).array()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  isAdmin: z.union([z.lazy(() => BoolFilterSchema), z.boolean()]).optional(),
  clients: z.lazy(() => ClientListRelationFilterSchema).optional(),
  users: z.lazy(() => CompanyUserListRelationFilterSchema).optional()
}).strict());
const CompanyOrderByWithAggregationInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([z.lazy(() => SortOrderSchema), z.lazy(() => SortOrderInputSchema)]).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional()
}).strict();
const CompanyScalarWhereWithAggregatesInputSchema = z.object({
  AND: z.union([z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array()]).optional(),
  OR: z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema), z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringNullableWithAggregatesFilterSchema), z.string()]).optional().nullable(),
  isAdmin: z.union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()]).optional()
}).strict();
const AccountCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.number().int(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema)
}).strict();
const AccountUncheckedCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.number().int(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();
const AccountUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();
const AccountUncheckedUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const AccountCreateManyInputSchema = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.number().int(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();
const AccountUpdateManyMutationInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const AccountUncheckedUpdateManyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const SessionCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();
const SessionUncheckedCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();
const SessionUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();
const SessionUncheckedUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const SessionCreateManyInputSchema = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();
const SessionUpdateManyMutationInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const SessionUncheckedUpdateManyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const UserCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserUncheckedCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const UserUncheckedUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const UserCreateManyInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable()
}).strict();
const UserUpdateManyMutationInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const UserUncheckedUpdateManyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const VerificationTokenCreateInputSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();
const VerificationTokenUncheckedCreateInputSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();
const VerificationTokenUpdateInputSchema = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const VerificationTokenUncheckedUpdateInputSchema = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const VerificationTokenCreateManyInputSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();
const VerificationTokenUpdateManyMutationInputSchema = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const VerificationTokenUncheckedUpdateManyInputSchema = z.object({
  identifier: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CompanyUserCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutCompanyUsersInputSchema)
}).strict();
const CompanyUserUncheckedCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  companyId: z.string(),
  userId: z.string()
}).strict();
const CompanyUserUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompanyUsersNestedInputSchema).optional()
}).strict();
const CompanyUserUncheckedUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  companyId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CompanyUserCreateManyInputSchema = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  companyId: z.string(),
  userId: z.string()
}).strict();
const CompanyUserUpdateManyMutationInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CompanyUserUncheckedUpdateManyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  companyId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const ClientCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }),
  avatar: z.string().optional().nullable(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutClientsInputSchema)
}).strict();
const ClientUncheckedCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }),
  avatar: z.string().optional().nullable(),
  companyId: z.string()
}).strict();
const ClientUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  phoneNumber: z.union([z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  avatar: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutClientsNestedInputSchema).optional()
}).strict();
const ClientUncheckedUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  phoneNumber: z.union([z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  avatar: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  companyId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const ClientCreateManyInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }),
  avatar: z.string().optional().nullable(),
  companyId: z.string()
}).strict();
const ClientUpdateManyMutationInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  phoneNumber: z.union([z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  avatar: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const ClientUncheckedUpdateManyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  phoneNumber: z.union([z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  avatar: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  companyId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CompanyCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  clients: z.lazy(() => ClientCreateNestedManyWithoutCompanyInputSchema).optional(),
  users: z.lazy(() => CompanyUserCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();
const CompanyUncheckedCreateInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  clients: z.lazy(() => ClientUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  users: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();
const CompanyUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  clients: z.lazy(() => ClientUpdateManyWithoutCompanyNestedInputSchema).optional(),
  users: z.lazy(() => CompanyUserUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();
const CompanyUncheckedUpdateInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  clients: z.lazy(() => ClientUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  users: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();
const CompanyCreateManyInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional()
}).strict();
const CompanyUpdateManyMutationInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CompanyUncheckedUpdateManyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const StringFilterSchema = z.object({
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
}).strict();
const IntFilterSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional()
}).strict();
const StringNullableFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable()
}).strict();
const IntNullableFilterSchema = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable()
}).strict();
const UserRelationFilterSchema = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();
const SortOrderInputSchema = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();
const AccountProviderProviderAccountIdCompoundUniqueInputSchema = z.object({
  provider: z.string(),
  providerAccountId: z.number()
}).strict();
const AccountCountOrderByAggregateInputSchema = z.object({
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
}).strict();
const AccountAvgOrderByAggregateInputSchema = z.object({
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();
const AccountMaxOrderByAggregateInputSchema = z.object({
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
}).strict();
const AccountMinOrderByAggregateInputSchema = z.object({
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
}).strict();
const AccountSumOrderByAggregateInputSchema = z.object({
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();
const StringWithAggregatesFilterSchema = z.object({
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
}).strict();
const IntWithAggregatesFilterSchema = z.object({
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
}).strict();
const StringNullableWithAggregatesFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();
const IntNullableWithAggregatesFilterSchema = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();
const DateTimeFilterSchema = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional()
}).strict();
const SessionCountOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();
const SessionMaxOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();
const SessionMinOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();
const DateTimeWithAggregatesFilterSchema = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();
const DateTimeNullableFilterSchema = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)]).optional().nullable()
}).strict();
const AccountListRelationFilterSchema = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();
const SessionListRelationFilterSchema = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();
const CompanyUserListRelationFilterSchema = z.object({
  every: z.lazy(() => CompanyUserWhereInputSchema).optional(),
  some: z.lazy(() => CompanyUserWhereInputSchema).optional(),
  none: z.lazy(() => CompanyUserWhereInputSchema).optional()
}).strict();
const AccountOrderByRelationAggregateInputSchema = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();
const SessionOrderByRelationAggregateInputSchema = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();
const CompanyUserOrderByRelationAggregateInputSchema = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();
const UserCountOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();
const UserMaxOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();
const UserMinOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();
const DateTimeNullableWithAggregatesFilterSchema = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();
const VerificationTokenIdentifierTokenCompoundUniqueInputSchema = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();
const VerificationTokenCountOrderByAggregateInputSchema = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();
const VerificationTokenMaxOrderByAggregateInputSchema = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();
const VerificationTokenMinOrderByAggregateInputSchema = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();
const EnumRoleFilterSchema = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema)]).optional()
}).strict();
const CompanyRelationFilterSchema = z.object({
  is: z.lazy(() => CompanyWhereInputSchema).optional(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();
const CompanyUserCountOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();
const CompanyUserMaxOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();
const CompanyUserMinOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();
const EnumRoleWithAggregatesFilterSchema = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();
const ClientCountOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();
const ClientMaxOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();
const ClientMinOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();
const BoolFilterSchema = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional()
}).strict();
const ClientListRelationFilterSchema = z.object({
  every: z.lazy(() => ClientWhereInputSchema).optional(),
  some: z.lazy(() => ClientWhereInputSchema).optional(),
  none: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();
const ClientOrderByRelationAggregateInputSchema = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();
const CompanyCountOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional()
}).strict();
const CompanyMaxOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional()
}).strict();
const CompanyMinOrderByAggregateInputSchema = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional()
}).strict();
const BoolWithAggregatesFilterSchema = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();
const UserCreateNestedOneWithoutAccountsInputSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();
const StringFieldUpdateOperationsInputSchema = z.object({
  set: z.string().optional()
}).strict();
const IntFieldUpdateOperationsInputSchema = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();
const NullableStringFieldUpdateOperationsInputSchema = z.object({
  set: z.string().optional().nullable()
}).strict();
const NullableIntFieldUpdateOperationsInputSchema = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();
const UserUpdateOneRequiredWithoutAccountsNestedInputSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema), z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)]).optional()
}).strict();
const UserCreateNestedOneWithoutSessionsInputSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();
const DateTimeFieldUpdateOperationsInputSchema = z.object({
  set: z.coerce.date().optional()
}).strict();
const UserUpdateOneRequiredWithoutSessionsNestedInputSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema), z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)]).optional()
}).strict();
const AccountCreateNestedManyWithoutUserInputSchema = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional()
}).strict();
const SessionCreateNestedManyWithoutUserInputSchema = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional()
}).strict();
const CompanyUserCreateNestedManyWithoutUserInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyUserCreateWithoutUserInputSchema), z.lazy(() => CompanyUserCreateWithoutUserInputSchema).array(), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema), z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional()
}).strict();
const AccountUncheckedCreateNestedManyWithoutUserInputSchema = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional()
}).strict();
const SessionUncheckedCreateNestedManyWithoutUserInputSchema = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional()
}).strict();
const CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyUserCreateWithoutUserInputSchema), z.lazy(() => CompanyUserCreateWithoutUserInputSchema).array(), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema), z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional()
}).strict();
const NullableDateTimeFieldUpdateOperationsInputSchema = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();
const AccountUpdateManyWithoutUserNestedInputSchema = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional()
}).strict();
const SessionUpdateManyWithoutUserNestedInputSchema = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional()
}).strict();
const CompanyUserUpdateManyWithoutUserNestedInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyUserCreateWithoutUserInputSchema), z.lazy(() => CompanyUserCreateWithoutUserInputSchema).array(), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema), z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CompanyUserUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => CompanyUserUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CompanyUserScalarWhereInputSchema), z.lazy(() => CompanyUserScalarWhereInputSchema).array()]).optional()
}).strict();
const AccountUncheckedUpdateManyWithoutUserNestedInputSchema = z.object({
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountCreateWithoutUserInputSchema).array(), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema), z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AccountWhereUniqueInputSchema), z.lazy(() => AccountWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional()
}).strict();
const SessionUncheckedUpdateManyWithoutUserNestedInputSchema = z.object({
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionCreateWithoutUserInputSchema).array(), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema), z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => SessionWhereUniqueInputSchema), z.lazy(() => SessionWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional()
}).strict();
const CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyUserCreateWithoutUserInputSchema), z.lazy(() => CompanyUserCreateWithoutUserInputSchema).array(), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema), z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema), z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CompanyUserUpdateManyWithWhereWithoutUserInputSchema), z.lazy(() => CompanyUserUpdateManyWithWhereWithoutUserInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CompanyUserScalarWhereInputSchema), z.lazy(() => CompanyUserScalarWhereInputSchema).array()]).optional()
}).strict();
const CompanyCreateNestedOneWithoutUsersInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyCreateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();
const UserCreateNestedOneWithoutCompanyUsersInputSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCompanyUsersInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyUsersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompanyUsersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();
const EnumRoleFieldUpdateOperationsInputSchema = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();
const CompanyUpdateOneRequiredWithoutUsersNestedInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyCreateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => CompanyUpdateToOneWithWhereWithoutUsersInputSchema), z.lazy(() => CompanyUpdateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema)]).optional()
}).strict();
const UserUpdateOneRequiredWithoutCompanyUsersNestedInputSchema = z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCompanyUsersInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyUsersInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompanyUsersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCompanyUsersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutCompanyUsersInputSchema), z.lazy(() => UserUpdateWithoutCompanyUsersInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCompanyUsersInputSchema)]).optional()
}).strict();
const CompanyCreateNestedOneWithoutClientsInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyCreateWithoutClientsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutClientsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutClientsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();
const CompanyUpdateOneRequiredWithoutClientsNestedInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyCreateWithoutClientsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutClientsInputSchema)]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutClientsInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutClientsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([z.lazy(() => CompanyUpdateToOneWithWhereWithoutClientsInputSchema), z.lazy(() => CompanyUpdateWithoutClientsInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutClientsInputSchema)]).optional()
}).strict();
const ClientCreateNestedManyWithoutCompanyInputSchema = z.object({
  create: z.union([z.lazy(() => ClientCreateWithoutCompanyInputSchema), z.lazy(() => ClientCreateWithoutCompanyInputSchema).array(), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => ClientCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional()
}).strict();
const CompanyUserCreateNestedManyWithoutCompanyInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema).array(), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional()
}).strict();
const ClientUncheckedCreateNestedManyWithoutCompanyInputSchema = z.object({
  create: z.union([z.lazy(() => ClientCreateWithoutCompanyInputSchema), z.lazy(() => ClientCreateWithoutCompanyInputSchema).array(), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => ClientCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional()
}).strict();
const CompanyUserUncheckedCreateNestedManyWithoutCompanyInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema).array(), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional()
}).strict();
const BoolFieldUpdateOperationsInputSchema = z.object({
  set: z.boolean().optional()
}).strict();
const ClientUpdateManyWithoutCompanyNestedInputSchema = z.object({
  create: z.union([z.lazy(() => ClientCreateWithoutCompanyInputSchema), z.lazy(() => ClientCreateWithoutCompanyInputSchema).array(), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ClientUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => ClientUpsertWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => ClientCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => ClientUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => ClientUpdateWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ClientUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => ClientUpdateManyWithWhereWithoutCompanyInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ClientScalarWhereInputSchema), z.lazy(() => ClientScalarWhereInputSchema).array()]).optional()
}).strict();
const CompanyUserUpdateManyWithoutCompanyNestedInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema).array(), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CompanyUserScalarWhereInputSchema), z.lazy(() => CompanyUserScalarWhereInputSchema).array()]).optional()
}).strict();
const ClientUncheckedUpdateManyWithoutCompanyNestedInputSchema = z.object({
  create: z.union([z.lazy(() => ClientCreateWithoutCompanyInputSchema), z.lazy(() => ClientCreateWithoutCompanyInputSchema).array(), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => ClientUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => ClientUpsertWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => ClientCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => ClientWhereUniqueInputSchema), z.lazy(() => ClientWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => ClientUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => ClientUpdateWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => ClientUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => ClientUpdateManyWithWhereWithoutCompanyInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => ClientScalarWhereInputSchema), z.lazy(() => ClientScalarWhereInputSchema).array()]).optional()
}).strict();
const CompanyUserUncheckedUpdateManyWithoutCompanyNestedInputSchema = z.object({
  create: z.union([z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema).array(), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema), z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CompanyUserWhereUniqueInputSchema), z.lazy(() => CompanyUserWhereUniqueInputSchema).array()]).optional(),
  update: z.union([z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema), z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema), z.lazy(() => CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CompanyUserScalarWhereInputSchema), z.lazy(() => CompanyUserScalarWhereInputSchema).array()]).optional()
}).strict();
const NestedStringFilterSchema = z.object({
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
}).strict();
const NestedIntFilterSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional()
}).strict();
const NestedStringNullableFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)]).optional().nullable()
}).strict();
const NestedIntNullableFilterSchema = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)]).optional().nullable()
}).strict();
const NestedStringWithAggregatesFilterSchema = z.object({
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
}).strict();
const NestedIntWithAggregatesFilterSchema = z.object({
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
}).strict();
const NestedFloatFilterSchema = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatFilterSchema)]).optional()
}).strict();
const NestedStringNullableWithAggregatesFilterSchema = z.object({
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
  not: z.union([z.string(), z.lazy(() => NestedStringNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();
const NestedIntNullableWithAggregatesFilterSchema = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedIntNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();
const NestedFloatNullableFilterSchema = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)]).optional().nullable()
}).strict();
const NestedDateTimeFilterSchema = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)]).optional()
}).strict();
const NestedDateTimeWithAggregatesFilterSchema = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();
const NestedDateTimeNullableFilterSchema = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableFilterSchema)]).optional().nullable()
}).strict();
const NestedDateTimeNullableWithAggregatesFilterSchema = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([z.coerce.date(), z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();
const NestedEnumRoleFilterSchema = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleFilterSchema)]).optional()
}).strict();
const NestedEnumRoleWithAggregatesFilterSchema = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([z.lazy(() => RoleSchema), z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();
const NestedBoolFilterSchema = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional()
}).strict();
const NestedBoolWithAggregatesFilterSchema = z.object({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();
const UserCreateWithoutAccountsInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserUncheckedCreateWithoutAccountsInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserCreateOrConnectWithoutAccountsInputSchema = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)])
}).strict();
const UserUpsertWithoutAccountsInputSchema = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema)]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();
const UserUpdateToOneWithWhereWithoutAccountsInputSchema = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAccountsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema)])
}).strict();
const UserUpdateWithoutAccountsInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const UserUncheckedUpdateWithoutAccountsInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const UserCreateWithoutSessionsInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserUncheckedCreateWithoutSessionsInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserCreateOrConnectWithoutSessionsInputSchema = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)])
}).strict();
const UserUpsertWithoutSessionsInputSchema = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema)]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();
const UserUpdateToOneWithWhereWithoutSessionsInputSchema = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutSessionsInputSchema), z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema)])
}).strict();
const UserUpdateWithoutSessionsInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const UserUncheckedUpdateWithoutSessionsInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const AccountCreateWithoutUserInputSchema = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.number().int(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();
const AccountUncheckedCreateWithoutUserInputSchema = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.number().int(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();
const AccountCreateOrConnectWithoutUserInputSchema = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema)])
}).strict();
const AccountCreateManyUserInputEnvelopeSchema = z.object({
  data: z.union([z.lazy(() => AccountCreateManyUserInputSchema), z.lazy(() => AccountCreateManyUserInputSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
const SessionCreateWithoutUserInputSchema = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();
const SessionUncheckedCreateWithoutUserInputSchema = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();
const SessionCreateOrConnectWithoutUserInputSchema = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema)])
}).strict();
const SessionCreateManyUserInputEnvelopeSchema = z.object({
  data: z.union([z.lazy(() => SessionCreateManyUserInputSchema), z.lazy(() => SessionCreateManyUserInputSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
const CompanyUserCreateWithoutUserInputSchema = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema)
}).strict();
const CompanyUserUncheckedCreateWithoutUserInputSchema = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  companyId: z.string()
}).strict();
const CompanyUserCreateOrConnectWithoutUserInputSchema = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CompanyUserCreateWithoutUserInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema)])
}).strict();
const CompanyUserCreateManyUserInputEnvelopeSchema = z.object({
  data: z.union([z.lazy(() => CompanyUserCreateManyUserInputSchema), z.lazy(() => CompanyUserCreateManyUserInputSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
const AccountUpsertWithWhereUniqueWithoutUserInputSchema = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => AccountCreateWithoutUserInputSchema), z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema)])
}).strict();
const AccountUpdateWithWhereUniqueWithoutUserInputSchema = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([z.lazy(() => AccountUpdateWithoutUserInputSchema), z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema)])
}).strict();
const AccountUpdateManyWithWhereWithoutUserInputSchema = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([z.lazy(() => AccountUpdateManyMutationInputSchema), z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema)])
}).strict();
const AccountScalarWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => AccountScalarWhereInputSchema), z.lazy(() => AccountScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  type: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  provider: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  providerAccountId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
  refresh_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  access_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  expires_at: z.union([z.lazy(() => IntNullableFilterSchema), z.number()]).optional().nullable(),
  token_type: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  scope: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  id_token: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  session_state: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable()
}).strict();
const SessionUpsertWithWhereUniqueWithoutUserInputSchema = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => SessionCreateWithoutUserInputSchema), z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema)])
}).strict();
const SessionUpdateWithWhereUniqueWithoutUserInputSchema = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([z.lazy(() => SessionUpdateWithoutUserInputSchema), z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema)])
}).strict();
const SessionUpdateManyWithWhereWithoutUserInputSchema = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([z.lazy(() => SessionUpdateManyMutationInputSchema), z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema)])
}).strict();
const SessionScalarWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => SessionScalarWhereInputSchema), z.lazy(() => SessionScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  sessionToken: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  expires: z.union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()]).optional()
}).strict();
const CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CompanyUserUpdateWithoutUserInputSchema), z.lazy(() => CompanyUserUncheckedUpdateWithoutUserInputSchema)]),
  create: z.union([z.lazy(() => CompanyUserCreateWithoutUserInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema)])
}).strict();
const CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CompanyUserUpdateWithoutUserInputSchema), z.lazy(() => CompanyUserUncheckedUpdateWithoutUserInputSchema)])
}).strict();
const CompanyUserUpdateManyWithWhereWithoutUserInputSchema = z.object({
  where: z.lazy(() => CompanyUserScalarWhereInputSchema),
  data: z.union([z.lazy(() => CompanyUserUpdateManyMutationInputSchema), z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserInputSchema)])
}).strict();
const CompanyUserScalarWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => CompanyUserScalarWhereInputSchema), z.lazy(() => CompanyUserScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => CompanyUserScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => CompanyUserScalarWhereInputSchema), z.lazy(() => CompanyUserScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  role: z.union([z.lazy(() => EnumRoleFilterSchema), z.lazy(() => RoleSchema)]).optional(),
  companyId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional()
}).strict();
const CompanyCreateWithoutUsersInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  clients: z.lazy(() => ClientCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();
const CompanyUncheckedCreateWithoutUsersInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  clients: z.lazy(() => ClientUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();
const CompanyCreateOrConnectWithoutUsersInputSchema = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CompanyCreateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema)])
}).strict();
const UserCreateWithoutCompanyUsersInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserUncheckedCreateWithoutCompanyUsersInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();
const UserCreateOrConnectWithoutCompanyUsersInputSchema = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCompanyUsersInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyUsersInputSchema)])
}).strict();
const CompanyUpsertWithoutUsersInputSchema = z.object({
  update: z.union([z.lazy(() => CompanyUpdateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema)]),
  create: z.union([z.lazy(() => CompanyCreateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema)]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();
const CompanyUpdateToOneWithWhereWithoutUsersInputSchema = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([z.lazy(() => CompanyUpdateWithoutUsersInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema)])
}).strict();
const CompanyUpdateWithoutUsersInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  clients: z.lazy(() => ClientUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();
const CompanyUncheckedUpdateWithoutUsersInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  clients: z.lazy(() => ClientUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();
const UserUpsertWithoutCompanyUsersInputSchema = z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutCompanyUsersInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCompanyUsersInputSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutCompanyUsersInputSchema), z.lazy(() => UserUncheckedCreateWithoutCompanyUsersInputSchema)]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();
const UserUpdateToOneWithWhereWithoutCompanyUsersInputSchema = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutCompanyUsersInputSchema), z.lazy(() => UserUncheckedUpdateWithoutCompanyUsersInputSchema)])
}).strict();
const UserUpdateWithoutCompanyUsersInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const UserUncheckedUpdateWithoutCompanyUsersInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  emailVerified: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema)]).optional().nullable(),
  image: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();
const CompanyCreateWithoutClientsInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  users: z.lazy(() => CompanyUserCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();
const CompanyUncheckedCreateWithoutClientsInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  users: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();
const CompanyCreateOrConnectWithoutClientsInputSchema = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CompanyCreateWithoutClientsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutClientsInputSchema)])
}).strict();
const CompanyUpsertWithoutClientsInputSchema = z.object({
  update: z.union([z.lazy(() => CompanyUpdateWithoutClientsInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutClientsInputSchema)]),
  create: z.union([z.lazy(() => CompanyCreateWithoutClientsInputSchema), z.lazy(() => CompanyUncheckedCreateWithoutClientsInputSchema)]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();
const CompanyUpdateToOneWithWhereWithoutClientsInputSchema = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([z.lazy(() => CompanyUpdateWithoutClientsInputSchema), z.lazy(() => CompanyUncheckedUpdateWithoutClientsInputSchema)])
}).strict();
const CompanyUpdateWithoutClientsInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  users: z.lazy(() => CompanyUserUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();
const CompanyUncheckedUpdateWithoutClientsInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  isAdmin: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)]).optional(),
  users: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();
const ClientCreateWithoutCompanyInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }),
  avatar: z.string().optional().nullable()
}).strict();
const ClientUncheckedCreateWithoutCompanyInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }),
  avatar: z.string().optional().nullable()
}).strict();
const ClientCreateOrConnectWithoutCompanyInputSchema = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  create: z.union([z.lazy(() => ClientCreateWithoutCompanyInputSchema), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema)])
}).strict();
const ClientCreateManyCompanyInputEnvelopeSchema = z.object({
  data: z.union([z.lazy(() => ClientCreateManyCompanyInputSchema), z.lazy(() => ClientCreateManyCompanyInputSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
const CompanyUserCreateWithoutCompanyInputSchema = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompanyUsersInputSchema)
}).strict();
const CompanyUserUncheckedCreateWithoutCompanyInputSchema = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  userId: z.string()
}).strict();
const CompanyUserCreateOrConnectWithoutCompanyInputSchema = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  create: z.union([z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema)])
}).strict();
const CompanyUserCreateManyCompanyInputEnvelopeSchema = z.object({
  data: z.union([z.lazy(() => CompanyUserCreateManyCompanyInputSchema), z.lazy(() => CompanyUserCreateManyCompanyInputSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
const ClientUpsertWithWhereUniqueWithoutCompanyInputSchema = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  update: z.union([z.lazy(() => ClientUpdateWithoutCompanyInputSchema), z.lazy(() => ClientUncheckedUpdateWithoutCompanyInputSchema)]),
  create: z.union([z.lazy(() => ClientCreateWithoutCompanyInputSchema), z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema)])
}).strict();
const ClientUpdateWithWhereUniqueWithoutCompanyInputSchema = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  data: z.union([z.lazy(() => ClientUpdateWithoutCompanyInputSchema), z.lazy(() => ClientUncheckedUpdateWithoutCompanyInputSchema)])
}).strict();
const ClientUpdateManyWithWhereWithoutCompanyInputSchema = z.object({
  where: z.lazy(() => ClientScalarWhereInputSchema),
  data: z.union([z.lazy(() => ClientUpdateManyMutationInputSchema), z.lazy(() => ClientUncheckedUpdateManyWithoutCompanyInputSchema)])
}).strict();
const ClientScalarWhereInputSchema = z.object({
  AND: z.union([z.lazy(() => ClientScalarWhereInputSchema), z.lazy(() => ClientScalarWhereInputSchema).array()]).optional(),
  OR: z.lazy(() => ClientScalarWhereInputSchema).array().optional(),
  NOT: z.union([z.lazy(() => ClientScalarWhereInputSchema), z.lazy(() => ClientScalarWhereInputSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  phoneNumber: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  avatar: z.union([z.lazy(() => StringNullableFilterSchema), z.string()]).optional().nullable(),
  companyId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional()
}).strict();
const CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  update: z.union([z.lazy(() => CompanyUserUpdateWithoutCompanyInputSchema), z.lazy(() => CompanyUserUncheckedUpdateWithoutCompanyInputSchema)]),
  create: z.union([z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema), z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema)])
}).strict();
const CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  data: z.union([z.lazy(() => CompanyUserUpdateWithoutCompanyInputSchema), z.lazy(() => CompanyUserUncheckedUpdateWithoutCompanyInputSchema)])
}).strict();
const CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema = z.object({
  where: z.lazy(() => CompanyUserScalarWhereInputSchema),
  data: z.union([z.lazy(() => CompanyUserUpdateManyMutationInputSchema), z.lazy(() => CompanyUserUncheckedUpdateManyWithoutCompanyInputSchema)])
}).strict();
const AccountCreateManyUserInputSchema = z.object({
  id: z.string().cuid().optional(),
  type: z.string(),
  provider: z.string(),
  providerAccountId: z.number().int(),
  refresh_token: z.string().optional().nullable(),
  access_token: z.string().optional().nullable(),
  expires_at: z.number().int().optional().nullable(),
  token_type: z.string().optional().nullable(),
  scope: z.string().optional().nullable(),
  id_token: z.string().optional().nullable(),
  session_state: z.string().optional().nullable()
}).strict();
const SessionCreateManyUserInputSchema = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();
const CompanyUserCreateManyUserInputSchema = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  companyId: z.string()
}).strict();
const AccountUpdateWithoutUserInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const AccountUncheckedUpdateWithoutUserInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const AccountUncheckedUpdateManyWithoutUserInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  providerAccountId: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputSchema)]).optional(),
  refresh_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  access_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  expires_at: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputSchema)]).optional().nullable(),
  token_type: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  scope: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  id_token: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable(),
  session_state: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const SessionUpdateWithoutUserInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const SessionUncheckedUpdateWithoutUserInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const SessionUncheckedUpdateManyWithoutUserInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  sessionToken: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  expires: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CompanyUserUpdateWithoutUserInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();
const CompanyUserUncheckedUpdateWithoutUserInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  companyId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CompanyUserUncheckedUpdateManyWithoutUserInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  companyId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const ClientCreateManyCompanyInputSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }),
  avatar: z.string().optional().nullable()
}).strict();
const CompanyUserCreateManyCompanyInputSchema = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  userId: z.string()
}).strict();
const ClientUpdateWithoutCompanyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  phoneNumber: z.union([z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  avatar: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const ClientUncheckedUpdateWithoutCompanyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  phoneNumber: z.union([z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  avatar: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const ClientUncheckedUpdateManyWithoutCompanyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  name: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  phoneNumber: z.union([z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message: "Invalid Number!" }), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  avatar: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputSchema)]).optional().nullable()
}).strict();
const CompanyUserUpdateWithoutCompanyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompanyUsersNestedInputSchema).optional()
}).strict();
const CompanyUserUncheckedUpdateWithoutCompanyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
}).strict();
const CompanyUserUncheckedUpdateManyWithoutCompanyInputSchema = z.object({
  id: z.union([z.string().cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional(),
  role: z.union([z.lazy(() => RoleSchema), z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)]).optional()
}).strict();
z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array()]).optional()
}).strict();
const AccountFindManyArgsSchema = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([AccountScalarFieldEnumSchema, AccountScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithRelationInputSchema.array(), AccountOrderByWithRelationInputSchema]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([AccountOrderByWithAggregationInputSchema.array(), AccountOrderByWithAggregationInputSchema]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema
}).strict();
z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema
}).strict();
z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()]).optional()
}).strict();
const SessionFindManyArgsSchema = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([SessionScalarFieldEnumSchema, SessionScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithRelationInputSchema.array(), SessionOrderByWithRelationInputSchema]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([SessionOrderByWithAggregationInputSchema.array(), SessionOrderByWithAggregationInputSchema]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema
}).strict();
z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithRelationInputSchema.array(), UserOrderByWithRelationInputSchema]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([UserOrderByWithAggregationInputSchema.array(), UserOrderByWithAggregationInputSchema]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema
}).strict();
z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([VerificationTokenScalarFieldEnumSchema, VerificationTokenScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithRelationInputSchema.array(), VerificationTokenOrderByWithRelationInputSchema]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([VerificationTokenOrderByWithAggregationInputSchema.array(), VerificationTokenOrderByWithAggregationInputSchema]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema
}).strict();
z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema
}).strict();
z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([CompanyUserOrderByWithRelationInputSchema.array(), CompanyUserOrderByWithRelationInputSchema]).optional(),
  cursor: CompanyUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([CompanyUserScalarFieldEnumSchema, CompanyUserScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([CompanyUserOrderByWithRelationInputSchema.array(), CompanyUserOrderByWithRelationInputSchema]).optional(),
  cursor: CompanyUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([CompanyUserScalarFieldEnumSchema, CompanyUserScalarFieldEnumSchema.array()]).optional()
}).strict();
const CompanyUserFindManyArgsSchema = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([CompanyUserOrderByWithRelationInputSchema.array(), CompanyUserOrderByWithRelationInputSchema]).optional(),
  cursor: CompanyUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([CompanyUserScalarFieldEnumSchema, CompanyUserScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([CompanyUserOrderByWithRelationInputSchema.array(), CompanyUserOrderByWithRelationInputSchema]).optional(),
  cursor: CompanyUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([CompanyUserOrderByWithAggregationInputSchema.array(), CompanyUserOrderByWithAggregationInputSchema]).optional(),
  by: CompanyUserScalarFieldEnumSchema.array(),
  having: CompanyUserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereUniqueInputSchema
}).strict();
z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereUniqueInputSchema
}).strict();
z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ClientOrderByWithRelationInputSchema.array(), ClientOrderByWithRelationInputSchema]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ClientScalarFieldEnumSchema, ClientScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ClientOrderByWithRelationInputSchema.array(), ClientOrderByWithRelationInputSchema]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ClientScalarFieldEnumSchema, ClientScalarFieldEnumSchema.array()]).optional()
}).strict();
const ClientFindManyArgsSchema = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ClientOrderByWithRelationInputSchema.array(), ClientOrderByWithRelationInputSchema]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ClientScalarFieldEnumSchema, ClientScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ClientOrderByWithRelationInputSchema.array(), ClientOrderByWithRelationInputSchema]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ClientOrderByWithAggregationInputSchema.array(), ClientOrderByWithAggregationInputSchema]).optional(),
  by: ClientScalarFieldEnumSchema.array(),
  having: ClientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema
}).strict();
z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema
}).strict();
z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([CompanyScalarFieldEnumSchema, CompanyScalarFieldEnumSchema.array()]).optional()
}).strict();
z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([CompanyOrderByWithRelationInputSchema.array(), CompanyOrderByWithRelationInputSchema]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([CompanyOrderByWithAggregationInputSchema.array(), CompanyOrderByWithAggregationInputSchema]).optional(),
  by: CompanyScalarFieldEnumSchema.array(),
  having: CompanyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional()
}).strict();
z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema
}).strict();
z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema
}).strict();
z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema])
}).strict();
z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([AccountCreateInputSchema, AccountUncheckedCreateInputSchema]),
  update: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema])
}).strict();
z.object({
  data: z.union([AccountCreateManyInputSchema, AccountCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema
}).strict();
z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([AccountUpdateInputSchema, AccountUncheckedUpdateInputSchema]),
  where: AccountWhereUniqueInputSchema
}).strict();
z.object({
  data: z.union([AccountUpdateManyMutationInputSchema, AccountUncheckedUpdateManyInputSchema]),
  where: AccountWhereInputSchema.optional()
}).strict();
z.object({
  where: AccountWhereInputSchema.optional()
}).strict();
z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema])
}).strict();
z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([SessionCreateInputSchema, SessionUncheckedCreateInputSchema]),
  update: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema])
}).strict();
z.object({
  data: z.union([SessionCreateManyInputSchema, SessionCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema
}).strict();
z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([SessionUpdateInputSchema, SessionUncheckedUpdateInputSchema]),
  where: SessionWhereUniqueInputSchema
}).strict();
z.object({
  data: z.union([SessionUpdateManyMutationInputSchema, SessionUncheckedUpdateManyInputSchema]),
  where: SessionWhereInputSchema.optional()
}).strict();
z.object({
  where: SessionWhereInputSchema.optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]).optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema])
}).strict();
z.object({
  data: z.union([UserCreateManyInputSchema, UserCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema
}).strict();
z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  where: UserWhereUniqueInputSchema
}).strict();
z.object({
  data: z.union([UserUpdateManyMutationInputSchema, UserUncheckedUpdateManyInputSchema]),
  where: UserWhereInputSchema.optional()
}).strict();
z.object({
  where: UserWhereInputSchema.optional()
}).strict();
z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema])
}).strict();
z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([VerificationTokenCreateInputSchema, VerificationTokenUncheckedCreateInputSchema]),
  update: z.union([VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema])
}).strict();
z.object({
  data: z.union([VerificationTokenCreateManyInputSchema, VerificationTokenCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema
}).strict();
z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([VerificationTokenUpdateInputSchema, VerificationTokenUncheckedUpdateInputSchema]),
  where: VerificationTokenWhereUniqueInputSchema
}).strict();
z.object({
  data: z.union([VerificationTokenUpdateManyMutationInputSchema, VerificationTokenUncheckedUpdateManyInputSchema]),
  where: VerificationTokenWhereInputSchema.optional()
}).strict();
z.object({
  where: VerificationTokenWhereInputSchema.optional()
}).strict();
z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  data: z.union([CompanyUserCreateInputSchema, CompanyUserUncheckedCreateInputSchema])
}).strict();
z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereUniqueInputSchema,
  create: z.union([CompanyUserCreateInputSchema, CompanyUserUncheckedCreateInputSchema]),
  update: z.union([CompanyUserUpdateInputSchema, CompanyUserUncheckedUpdateInputSchema])
}).strict();
z.object({
  data: z.union([CompanyUserCreateManyInputSchema, CompanyUserCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereUniqueInputSchema
}).strict();
z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  data: z.union([CompanyUserUpdateInputSchema, CompanyUserUncheckedUpdateInputSchema]),
  where: CompanyUserWhereUniqueInputSchema
}).strict();
z.object({
  data: z.union([CompanyUserUpdateManyMutationInputSchema, CompanyUserUncheckedUpdateManyInputSchema]),
  where: CompanyUserWhereInputSchema.optional()
}).strict();
z.object({
  where: CompanyUserWhereInputSchema.optional()
}).strict();
z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ClientCreateInputSchema, ClientUncheckedCreateInputSchema])
}).strict();
z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
  create: z.union([ClientCreateInputSchema, ClientUncheckedCreateInputSchema]),
  update: z.union([ClientUpdateInputSchema, ClientUncheckedUpdateInputSchema])
}).strict();
z.object({
  data: z.union([ClientCreateManyInputSchema, ClientCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema
}).strict();
z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ClientUpdateInputSchema, ClientUncheckedUpdateInputSchema]),
  where: ClientWhereUniqueInputSchema
}).strict();
z.object({
  data: z.union([ClientUpdateManyMutationInputSchema, ClientUncheckedUpdateManyInputSchema]),
  where: ClientWhereInputSchema.optional()
}).strict();
z.object({
  where: ClientWhereInputSchema.optional()
}).strict();
z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema])
}).strict();
z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
  create: z.union([CompanyCreateInputSchema, CompanyUncheckedCreateInputSchema]),
  update: z.union([CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema])
}).strict();
z.object({
  data: z.union([CompanyCreateManyInputSchema, CompanyCreateManyInputSchema.array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema
}).strict();
z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([CompanyUpdateInputSchema, CompanyUncheckedUpdateInputSchema]),
  where: CompanyWhereUniqueInputSchema
}).strict();
z.object({
  data: z.union([CompanyUpdateManyMutationInputSchema, CompanyUncheckedUpdateManyInputSchema]),
  where: CompanyWhereInputSchema.optional()
}).strict();
z.object({
  where: CompanyWhereInputSchema.optional()
}).strict();

export { CompanySchema as C, UserSchema as U };
//# sourceMappingURL=index4-9810528c.js.map
