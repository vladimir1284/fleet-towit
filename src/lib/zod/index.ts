import { z } from 'zod';
import { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

// JSON
//------------------------------------------------------

export type NullableJsonInput = Prisma.JsonValue | null | 'JsonNull' | 'DbNull' | Prisma.NullTypes.DbNull | Prisma.NullTypes.JsonNull;

export const transformJsonNull = (v?: NullableJsonInput) => {
  if (!v || v === 'DbNull') return Prisma.DbNull;
  if (v === 'JsonNull') return Prisma.JsonNull;
  return v;
};

export const JsonValueSchema: z.ZodType<Prisma.JsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.literal(null),
    z.record(z.lazy(() => JsonValueSchema.optional())),
    z.array(z.lazy(() => JsonValueSchema)),
  ])
);

export type JsonValueType = z.infer<typeof JsonValueSchema>;

export const NullableJsonValue = z
  .union([JsonValueSchema, z.literal('DbNull'), z.literal('JsonNull')])
  .nullable()
  .transform((v) => transformJsonNull(v));

export type NullableJsonValueType = z.infer<typeof NullableJsonValue>;

export const InputJsonValueSchema: z.ZodType<Prisma.InputJsonValue> = z.lazy(() =>
  z.union([
    z.string(),
    z.number(),
    z.boolean(),
    z.object({ toJSON: z.function(z.tuple([]), z.any()) }),
    z.record(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
    z.array(z.lazy(() => z.union([InputJsonValueSchema, z.literal(null)]))),
  ])
);

export type InputJsonValueType = z.infer<typeof InputJsonValueSchema>;


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const AccountScalarFieldEnumSchema = z.enum(['id','userId','type','provider','providerAccountId','refresh_token','access_token','expires_at','token_type','scope','id_token','session_state']);

export const SessionScalarFieldEnumSchema = z.enum(['id','sessionToken','userId','expires']);

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','emailVerified','image']);

export const VerificationTokenScalarFieldEnumSchema = z.enum(['identifier','token','expires']);

export const CompanyUserScalarFieldEnumSchema = z.enum(['id','role','companyId','userId']);

export const ClientScalarFieldEnumSchema = z.enum(['id','name','email','phoneNumber','avatar','companyId']);

export const CompanyScalarFieldEnumSchema = z.enum(['id','name','email','isAdmin']);

export const PartScalarFieldEnumSchema = z.enum(['id','name','number','criticalQty','upc','description','extendedPartData','createdAt','updatedAt','deletedAt','createdBy','updatedBy','deletedBy']);

export const CategoryScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','deletedAt']);

export const LocationScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','deletedAt']);

export const VendorScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt','deletedAt']);

export const CategoriesOnPartsScalarFieldEnumSchema = z.enum(['partId','categoryId']);

export const LocationsOnPartsScalarFieldEnumSchema = z.enum(['partId','locationId','quantity','unit']);

export const VendorOnPartsScalarFieldEnumSchema = z.enum(['partId','vendorId','cost']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullableJsonNullValueInputSchema = z.enum(['DbNull','JsonNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.DbNull : value);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const NullsOrderSchema = z.enum(['first','last']);

export const JsonNullValueFilterSchema = z.enum(['DbNull','JsonNull','AnyNull',]).transform((value) => value === 'JsonNull' ? Prisma.JsonNull : value === 'DbNull' ? Prisma.JsonNull : value === 'AnyNull' ? Prisma.AnyNull : value);

export const RoleSchema = z.enum(['STAFF','ADMIN','OWNER']);

export type RoleType = `${z.infer<typeof RoleSchema>}`

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
  session_state: z.string().nullable(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string().cuid(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date(),
})

export type Session = z.infer<typeof SessionSchema>

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
  image: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// VERIFICATION TOKEN SCHEMA
/////////////////////////////////////////

export const VerificationTokenSchema = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date(),
})

export type VerificationToken = z.infer<typeof VerificationTokenSchema>

/////////////////////////////////////////
// COMPANY USER SCHEMA
/////////////////////////////////////////

export const CompanyUserSchema = z.object({
  role: RoleSchema,
  id: z.string().cuid(),
  companyId: z.string(),
  userId: z.string(),
})

export type CompanyUser = z.infer<typeof CompanyUserSchema>

/////////////////////////////////////////
// CLIENT SCHEMA
/////////////////////////////////////////

export const ClientSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),
  avatar: z.string().nullable(),
  companyId: z.string(),
})

export type Client = z.infer<typeof ClientSchema>

/////////////////////////////////////////
// COMPANY SCHEMA
/////////////////////////////////////////

export const CompanySchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  email: z.string().nullable(),
  isAdmin: z.boolean(),
})

export type Company = z.infer<typeof CompanySchema>

/////////////////////////////////////////
// PART SCHEMA
/////////////////////////////////////////

export const PartSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: JsonValueSchema,
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  createdBy: z.string(),
  updatedBy: z.string(),
  deletedBy: z.string(),
})

export type Part = z.infer<typeof PartSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// LOCATION SCHEMA
/////////////////////////////////////////

export const LocationSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type Location = z.infer<typeof LocationSchema>

/////////////////////////////////////////
// VENDOR SCHEMA
/////////////////////////////////////////

export const VendorSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
})

export type Vendor = z.infer<typeof VendorSchema>

/////////////////////////////////////////
// CATEGORIES ON PARTS SCHEMA
/////////////////////////////////////////

export const CategoriesOnPartsSchema = z.object({
  partId: z.string(),
  categoryId: z.number().int(),
})

export type CategoriesOnParts = z.infer<typeof CategoriesOnPartsSchema>

/////////////////////////////////////////
// LOCATIONS ON PARTS SCHEMA
/////////////////////////////////////////

export const LocationsOnPartsSchema = z.object({
  partId: z.string(),
  locationId: z.number().int(),
  quantity: z.number().int(),
  unit: z.string(),
})

export type LocationsOnParts = z.infer<typeof LocationsOnPartsSchema>

/////////////////////////////////////////
// VENDOR ON PARTS SCHEMA
/////////////////////////////////////////

export const VendorOnPartsSchema = z.object({
  partId: z.string(),
  vendorId: z.number().int(),
  cost: z.number(),
})

export type VendorOnParts = z.infer<typeof VendorOnPartsSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z.object({
  select: z.lazy(() => AccountSelectSchema).optional(),
  include: z.lazy(() => AccountIncludeSchema).optional(),
}).strict();

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z.object({
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
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z.object({
  select: z.lazy(() => SessionSelectSchema).optional(),
  include: z.lazy(() => SessionIncludeSchema).optional(),
}).strict();

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z.object({
  id: z.boolean().optional(),
  sessionToken: z.boolean().optional(),
  userId: z.boolean().optional(),
  expires: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  companyUsers: z.union([z.boolean(),z.lazy(() => CompanyUserFindManyArgsSchema)]).optional(),
  createdParts: z.union([z.boolean(),z.lazy(() => PartFindManyArgsSchema)]).optional(),
  updatedParts: z.union([z.boolean(),z.lazy(() => PartFindManyArgsSchema)]).optional(),
  deletedParts: z.union([z.boolean(),z.lazy(() => PartFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  accounts: z.boolean().optional(),
  sessions: z.boolean().optional(),
  companyUsers: z.boolean().optional(),
  createdParts: z.boolean().optional(),
  updatedParts: z.boolean().optional(),
  deletedParts: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  emailVerified: z.boolean().optional(),
  image: z.boolean().optional(),
  accounts: z.union([z.boolean(),z.lazy(() => AccountFindManyArgsSchema)]).optional(),
  sessions: z.union([z.boolean(),z.lazy(() => SessionFindManyArgsSchema)]).optional(),
  companyUsers: z.union([z.boolean(),z.lazy(() => CompanyUserFindManyArgsSchema)]).optional(),
  createdParts: z.union([z.boolean(),z.lazy(() => PartFindManyArgsSchema)]).optional(),
  updatedParts: z.union([z.boolean(),z.lazy(() => PartFindManyArgsSchema)]).optional(),
  deletedParts: z.union([z.boolean(),z.lazy(() => PartFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VERIFICATION TOKEN
//------------------------------------------------------

export const VerificationTokenSelectSchema: z.ZodType<Prisma.VerificationTokenSelect> = z.object({
  identifier: z.boolean().optional(),
  token: z.boolean().optional(),
  expires: z.boolean().optional(),
}).strict()

// COMPANY USER
//------------------------------------------------------

export const CompanyUserIncludeSchema: z.ZodType<Prisma.CompanyUserInclude> = z.object({
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const CompanyUserArgsSchema: z.ZodType<Prisma.CompanyUserDefaultArgs> = z.object({
  select: z.lazy(() => CompanyUserSelectSchema).optional(),
  include: z.lazy(() => CompanyUserIncludeSchema).optional(),
}).strict();

export const CompanyUserSelectSchema: z.ZodType<Prisma.CompanyUserSelect> = z.object({
  id: z.boolean().optional(),
  role: z.boolean().optional(),
  companyId: z.boolean().optional(),
  userId: z.boolean().optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// CLIENT
//------------------------------------------------------

export const ClientIncludeSchema: z.ZodType<Prisma.ClientInclude> = z.object({
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
}).strict()

export const ClientArgsSchema: z.ZodType<Prisma.ClientDefaultArgs> = z.object({
  select: z.lazy(() => ClientSelectSchema).optional(),
  include: z.lazy(() => ClientIncludeSchema).optional(),
}).strict();

export const ClientSelectSchema: z.ZodType<Prisma.ClientSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  phoneNumber: z.boolean().optional(),
  avatar: z.boolean().optional(),
  companyId: z.boolean().optional(),
  company: z.union([z.boolean(),z.lazy(() => CompanyArgsSchema)]).optional(),
}).strict()

// COMPANY
//------------------------------------------------------

export const CompanyIncludeSchema: z.ZodType<Prisma.CompanyInclude> = z.object({
  clients: z.union([z.boolean(),z.lazy(() => ClientFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => CompanyUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CompanyArgsSchema: z.ZodType<Prisma.CompanyDefaultArgs> = z.object({
  select: z.lazy(() => CompanySelectSchema).optional(),
  include: z.lazy(() => CompanyIncludeSchema).optional(),
}).strict();

export const CompanyCountOutputTypeArgsSchema: z.ZodType<Prisma.CompanyCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CompanyCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CompanyCountOutputTypeSelectSchema: z.ZodType<Prisma.CompanyCountOutputTypeSelect> = z.object({
  clients: z.boolean().optional(),
  users: z.boolean().optional(),
}).strict();

export const CompanySelectSchema: z.ZodType<Prisma.CompanySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  email: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  clients: z.union([z.boolean(),z.lazy(() => ClientFindManyArgsSchema)]).optional(),
  users: z.union([z.boolean(),z.lazy(() => CompanyUserFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CompanyCountOutputTypeArgsSchema)]).optional(),
}).strict()

// PART
//------------------------------------------------------

export const PartIncludeSchema: z.ZodType<Prisma.PartInclude> = z.object({
  categories: z.union([z.boolean(),z.lazy(() => CategoriesOnPartsFindManyArgsSchema)]).optional(),
  locations: z.union([z.boolean(),z.lazy(() => LocationsOnPartsFindManyArgsSchema)]).optional(),
  vendors: z.union([z.boolean(),z.lazy(() => VendorOnPartsFindManyArgsSchema)]).optional(),
  creationAuthor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  updateAuthor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  deletionAuthor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PartCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const PartArgsSchema: z.ZodType<Prisma.PartDefaultArgs> = z.object({
  select: z.lazy(() => PartSelectSchema).optional(),
  include: z.lazy(() => PartIncludeSchema).optional(),
}).strict();

export const PartCountOutputTypeArgsSchema: z.ZodType<Prisma.PartCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => PartCountOutputTypeSelectSchema).nullish(),
}).strict();

export const PartCountOutputTypeSelectSchema: z.ZodType<Prisma.PartCountOutputTypeSelect> = z.object({
  categories: z.boolean().optional(),
  locations: z.boolean().optional(),
  vendors: z.boolean().optional(),
}).strict();

export const PartSelectSchema: z.ZodType<Prisma.PartSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  number: z.boolean().optional(),
  criticalQty: z.boolean().optional(),
  upc: z.boolean().optional(),
  description: z.boolean().optional(),
  extendedPartData: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  createdBy: z.boolean().optional(),
  updatedBy: z.boolean().optional(),
  deletedBy: z.boolean().optional(),
  categories: z.union([z.boolean(),z.lazy(() => CategoriesOnPartsFindManyArgsSchema)]).optional(),
  locations: z.union([z.boolean(),z.lazy(() => LocationsOnPartsFindManyArgsSchema)]).optional(),
  vendors: z.union([z.boolean(),z.lazy(() => VendorOnPartsFindManyArgsSchema)]).optional(),
  creationAuthor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  updateAuthor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  deletionAuthor: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => PartCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z.object({
  parts: z.union([z.boolean(),z.lazy(() => CategoriesOnPartsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z.object({
  select: z.lazy(() => CategorySelectSchema).optional(),
  include: z.lazy(() => CategoryIncludeSchema).optional(),
}).strict();

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
}).strict();

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> = z.object({
  parts: z.boolean().optional(),
}).strict();

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  parts: z.union([z.boolean(),z.lazy(() => CategoriesOnPartsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => CategoryCountOutputTypeArgsSchema)]).optional(),
}).strict()

// LOCATION
//------------------------------------------------------

export const LocationIncludeSchema: z.ZodType<Prisma.LocationInclude> = z.object({
  parts: z.union([z.boolean(),z.lazy(() => LocationsOnPartsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const LocationArgsSchema: z.ZodType<Prisma.LocationDefaultArgs> = z.object({
  select: z.lazy(() => LocationSelectSchema).optional(),
  include: z.lazy(() => LocationIncludeSchema).optional(),
}).strict();

export const LocationCountOutputTypeArgsSchema: z.ZodType<Prisma.LocationCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => LocationCountOutputTypeSelectSchema).nullish(),
}).strict();

export const LocationCountOutputTypeSelectSchema: z.ZodType<Prisma.LocationCountOutputTypeSelect> = z.object({
  parts: z.boolean().optional(),
}).strict();

export const LocationSelectSchema: z.ZodType<Prisma.LocationSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  parts: z.union([z.boolean(),z.lazy(() => LocationsOnPartsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => LocationCountOutputTypeArgsSchema)]).optional(),
}).strict()

// VENDOR
//------------------------------------------------------

export const VendorIncludeSchema: z.ZodType<Prisma.VendorInclude> = z.object({
  parts: z.union([z.boolean(),z.lazy(() => VendorOnPartsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VendorCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const VendorArgsSchema: z.ZodType<Prisma.VendorDefaultArgs> = z.object({
  select: z.lazy(() => VendorSelectSchema).optional(),
  include: z.lazy(() => VendorIncludeSchema).optional(),
}).strict();

export const VendorCountOutputTypeArgsSchema: z.ZodType<Prisma.VendorCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => VendorCountOutputTypeSelectSchema).nullish(),
}).strict();

export const VendorCountOutputTypeSelectSchema: z.ZodType<Prisma.VendorCountOutputTypeSelect> = z.object({
  parts: z.boolean().optional(),
}).strict();

export const VendorSelectSchema: z.ZodType<Prisma.VendorSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  deletedAt: z.boolean().optional(),
  parts: z.union([z.boolean(),z.lazy(() => VendorOnPartsFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => VendorCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CATEGORIES ON PARTS
//------------------------------------------------------

export const CategoriesOnPartsIncludeSchema: z.ZodType<Prisma.CategoriesOnPartsInclude> = z.object({
  part: z.union([z.boolean(),z.lazy(() => PartArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
}).strict()

export const CategoriesOnPartsArgsSchema: z.ZodType<Prisma.CategoriesOnPartsDefaultArgs> = z.object({
  select: z.lazy(() => CategoriesOnPartsSelectSchema).optional(),
  include: z.lazy(() => CategoriesOnPartsIncludeSchema).optional(),
}).strict();

export const CategoriesOnPartsSelectSchema: z.ZodType<Prisma.CategoriesOnPartsSelect> = z.object({
  partId: z.boolean().optional(),
  categoryId: z.boolean().optional(),
  part: z.union([z.boolean(),z.lazy(() => PartArgsSchema)]).optional(),
  category: z.union([z.boolean(),z.lazy(() => CategoryArgsSchema)]).optional(),
}).strict()

// LOCATIONS ON PARTS
//------------------------------------------------------

export const LocationsOnPartsIncludeSchema: z.ZodType<Prisma.LocationsOnPartsInclude> = z.object({
  part: z.union([z.boolean(),z.lazy(() => PartArgsSchema)]).optional(),
  Location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
}).strict()

export const LocationsOnPartsArgsSchema: z.ZodType<Prisma.LocationsOnPartsDefaultArgs> = z.object({
  select: z.lazy(() => LocationsOnPartsSelectSchema).optional(),
  include: z.lazy(() => LocationsOnPartsIncludeSchema).optional(),
}).strict();

export const LocationsOnPartsSelectSchema: z.ZodType<Prisma.LocationsOnPartsSelect> = z.object({
  partId: z.boolean().optional(),
  locationId: z.boolean().optional(),
  quantity: z.boolean().optional(),
  unit: z.boolean().optional(),
  part: z.union([z.boolean(),z.lazy(() => PartArgsSchema)]).optional(),
  Location: z.union([z.boolean(),z.lazy(() => LocationArgsSchema)]).optional(),
}).strict()

// VENDOR ON PARTS
//------------------------------------------------------

export const VendorOnPartsIncludeSchema: z.ZodType<Prisma.VendorOnPartsInclude> = z.object({
  part: z.union([z.boolean(),z.lazy(() => PartArgsSchema)]).optional(),
  vendor: z.union([z.boolean(),z.lazy(() => VendorArgsSchema)]).optional(),
}).strict()

export const VendorOnPartsArgsSchema: z.ZodType<Prisma.VendorOnPartsDefaultArgs> = z.object({
  select: z.lazy(() => VendorOnPartsSelectSchema).optional(),
  include: z.lazy(() => VendorOnPartsIncludeSchema).optional(),
}).strict();

export const VendorOnPartsSelectSchema: z.ZodType<Prisma.VendorOnPartsSelect> = z.object({
  partId: z.boolean().optional(),
  vendorId: z.boolean().optional(),
  cost: z.boolean().optional(),
  part: z.union([z.boolean(),z.lazy(() => PartArgsSchema)]).optional(),
  vendor: z.union([z.boolean(),z.lazy(() => VendorArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema)
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  provider_providerAccountId: z.lazy(() => AccountProviderProviderAccountIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountWhereInputSchema),z.lazy(() => AccountWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  type: z.lazy(() => SortOrderSchema).optional(),
  provider: z.lazy(() => SortOrderSchema).optional(),
  providerAccountId: z.lazy(() => SortOrderSchema).optional(),
  refresh_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  access_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  expires_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  token_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  scope: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  id_token: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  session_state: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => AccountAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => AccountSumOrderByAggregateInputSchema).optional()
}).strict();

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    sessionToken: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    sessionToken: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string().optional(),
  AND: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionWhereInputSchema),z.lazy(() => SessionWhereInputSchema).array() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional()
}).strict();

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserListRelationFilterSchema).optional(),
  createdParts: z.lazy(() => PartListRelationFilterSchema).optional(),
  updatedParts: z.lazy(() => PartListRelationFilterSchema).optional(),
  deletedParts: z.lazy(() => PartListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accounts: z.lazy(() => AccountOrderByRelationAggregateInputSchema).optional(),
  sessions: z.lazy(() => SessionOrderByRelationAggregateInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserOrderByRelationAggregateInputSchema).optional(),
  createdParts: z.lazy(() => PartOrderByRelationAggregateInputSchema).optional(),
  updatedParts: z.lazy(() => PartOrderByRelationAggregateInputSchema).optional(),
  deletedParts: z.lazy(() => PartOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    email: z.string()
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    email: z.string(),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  email: z.string().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
  sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserListRelationFilterSchema).optional(),
  createdParts: z.lazy(() => PartListRelationFilterSchema).optional(),
  updatedParts: z.lazy(() => PartListRelationFilterSchema).optional(),
  deletedParts: z.lazy(() => PartListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  emailVerified: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  image: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  emailVerified: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  image: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const VerificationTokenWhereInputSchema: z.ZodType<Prisma.VerificationTokenWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const VerificationTokenOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithRelationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenWhereUniqueInputSchema: z.ZodType<Prisma.VerificationTokenWhereUniqueInput> = z.union([
  z.object({
    token: z.string(),
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema)
  }),
  z.object({
    token: z.string(),
  }),
  z.object({
    identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema),
  }),
])
.and(z.object({
  token: z.string().optional(),
  identifier_token: z.lazy(() => VerificationTokenIdentifierTokenCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenWhereInputSchema),z.lazy(() => VerificationTokenWhereInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict());

export const VerificationTokenOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationTokenOrderByWithAggregationInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VerificationTokenCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VerificationTokenMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VerificationTokenMinOrderByAggregateInputSchema).optional()
}).strict();

export const VerificationTokenScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationTokenScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema),z.lazy(() => VerificationTokenScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  identifier: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  token: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CompanyUserWhereInputSchema: z.ZodType<Prisma.CompanyUserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyUserWhereInputSchema),z.lazy(() => CompanyUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyUserWhereInputSchema),z.lazy(() => CompanyUserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const CompanyUserOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyUserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const CompanyUserWhereUniqueInputSchema: z.ZodType<Prisma.CompanyUserWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CompanyUserWhereInputSchema),z.lazy(() => CompanyUserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyUserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyUserWhereInputSchema),z.lazy(() => CompanyUserWhereInputSchema).array() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const CompanyUserOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyUserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyUserCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyUserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyUserMinOrderByAggregateInputSchema).optional()
}).strict();

export const CompanyUserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyUserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyUserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleWithAggregatesFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const ClientWhereInputSchema: z.ZodType<Prisma.ClientWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
}).strict();

export const ClientOrderByWithRelationInputSchema: z.ZodType<Prisma.ClientOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  company: z.lazy(() => CompanyOrderByWithRelationInputSchema).optional()
}).strict();

export const ClientWhereUniqueInputSchema: z.ZodType<Prisma.ClientWhereUniqueInput> = z.union([
  z.object({
    id: z.string().cuid(),
    phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"})
  }),
  z.object({
    id: z.string().cuid(),
  }),
  z.object({
    phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),
  }),
])
.and(z.object({
  id: z.string().cuid().optional(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}).optional(),
  AND: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientWhereInputSchema),z.lazy(() => ClientWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  company: z.union([ z.lazy(() => CompanyRelationFilterSchema),z.lazy(() => CompanyWhereInputSchema) ]).optional(),
}).strict());

export const ClientOrderByWithAggregationInputSchema: z.ZodType<Prisma.ClientOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ClientCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ClientMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ClientMinOrderByAggregateInputSchema).optional()
}).strict();

export const ClientScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ClientScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientScalarWhereWithAggregatesInputSchema),z.lazy(() => ClientScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CompanyWhereInputSchema: z.ZodType<Prisma.CompanyWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isAdmin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  clients: z.lazy(() => ClientListRelationFilterSchema).optional(),
  users: z.lazy(() => CompanyUserListRelationFilterSchema).optional()
}).strict();

export const CompanyOrderByWithRelationInputSchema: z.ZodType<Prisma.CompanyOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  clients: z.lazy(() => ClientOrderByRelationAggregateInputSchema).optional(),
  users: z.lazy(() => CompanyUserOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CompanyWhereUniqueInputSchema: z.ZodType<Prisma.CompanyWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyWhereInputSchema),z.lazy(() => CompanyWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  isAdmin: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  clients: z.lazy(() => ClientListRelationFilterSchema).optional(),
  users: z.lazy(() => CompanyUserListRelationFilterSchema).optional()
}).strict());

export const CompanyOrderByWithAggregationInputSchema: z.ZodType<Prisma.CompanyOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CompanyCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CompanyMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CompanyMinOrderByAggregateInputSchema).optional()
}).strict();

export const CompanyScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CompanyScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema),z.lazy(() => CompanyScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  isAdmin: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
}).strict();

export const PartWhereInputSchema: z.ZodType<Prisma.PartWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PartWhereInputSchema),z.lazy(() => PartWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartWhereInputSchema),z.lazy(() => PartWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  criticalQty: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  upc: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  extendedPartData: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deletedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categories: z.lazy(() => CategoriesOnPartsListRelationFilterSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsListRelationFilterSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsListRelationFilterSchema).optional(),
  creationAuthor: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  updateAuthor: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  deletionAuthor: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const PartOrderByWithRelationInputSchema: z.ZodType<Prisma.PartOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  criticalQty: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  extendedPartData: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  deletedBy: z.lazy(() => SortOrderSchema).optional(),
  categories: z.lazy(() => CategoriesOnPartsOrderByRelationAggregateInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsOrderByRelationAggregateInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsOrderByRelationAggregateInputSchema).optional(),
  creationAuthor: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  updateAuthor: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  deletionAuthor: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const PartWhereUniqueInputSchema: z.ZodType<Prisma.PartWhereUniqueInput> = z.object({
  id: z.string().cuid()
})
.and(z.object({
  id: z.string().cuid().optional(),
  AND: z.union([ z.lazy(() => PartWhereInputSchema),z.lazy(() => PartWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartWhereInputSchema),z.lazy(() => PartWhereInputSchema).array() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  criticalQty: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  upc: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  extendedPartData: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deletedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categories: z.lazy(() => CategoriesOnPartsListRelationFilterSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsListRelationFilterSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsListRelationFilterSchema).optional(),
  creationAuthor: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  updateAuthor: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  deletionAuthor: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const PartOrderByWithAggregationInputSchema: z.ZodType<Prisma.PartOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  criticalQty: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  extendedPartData: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  deletedBy: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => PartCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => PartAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => PartMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => PartMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => PartSumOrderByAggregateInputSchema).optional()
}).strict();

export const PartScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PartScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => PartScalarWhereWithAggregatesInputSchema),z.lazy(() => PartScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartScalarWhereWithAggregatesInputSchema),z.lazy(() => PartScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  criticalQty: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  upc: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  extendedPartData: z.lazy(() => JsonNullableWithAggregatesFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  deletedBy: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  parts: z.lazy(() => CategoriesOnPartsListRelationFilterSchema).optional()
}).strict();

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parts: z.lazy(() => CategoriesOnPartsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryWhereInputSchema),z.lazy(() => CategoryWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  parts: z.lazy(() => CategoriesOnPartsListRelationFilterSchema).optional()
}).strict());

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CategoryAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CategorySumOrderByAggregateInputSchema).optional()
}).strict();

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const LocationWhereInputSchema: z.ZodType<Prisma.LocationWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  parts: z.lazy(() => LocationsOnPartsListRelationFilterSchema).optional()
}).strict();

export const LocationOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parts: z.lazy(() => LocationsOnPartsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const LocationWhereUniqueInputSchema: z.ZodType<Prisma.LocationWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationWhereInputSchema),z.lazy(() => LocationWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  parts: z.lazy(() => LocationsOnPartsListRelationFilterSchema).optional()
}).strict());

export const LocationOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => LocationCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationSumOrderByAggregateInputSchema).optional()
}).strict();

export const LocationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const VendorWhereInputSchema: z.ZodType<Prisma.VendorWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VendorWhereInputSchema),z.lazy(() => VendorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorWhereInputSchema),z.lazy(() => VendorWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  parts: z.lazy(() => VendorOnPartsListRelationFilterSchema).optional()
}).strict();

export const VendorOrderByWithRelationInputSchema: z.ZodType<Prisma.VendorOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  parts: z.lazy(() => VendorOnPartsOrderByRelationAggregateInputSchema).optional()
}).strict();

export const VendorWhereUniqueInputSchema: z.ZodType<Prisma.VendorWhereUniqueInput> = z.union([
  z.object({
    id: z.number().int(),
    name: z.string()
  }),
  z.object({
    id: z.number().int(),
  }),
  z.object({
    name: z.string(),
  }),
])
.and(z.object({
  id: z.number().int().optional(),
  name: z.string().optional(),
  AND: z.union([ z.lazy(() => VendorWhereInputSchema),z.lazy(() => VendorWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorWhereInputSchema),z.lazy(() => VendorWhereInputSchema).array() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  parts: z.lazy(() => VendorOnPartsListRelationFilterSchema).optional()
}).strict());

export const VendorOrderByWithAggregationInputSchema: z.ZodType<Prisma.VendorOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => VendorCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => VendorAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VendorMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VendorMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => VendorSumOrderByAggregateInputSchema).optional()
}).strict();

export const VendorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VendorScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VendorScalarWhereWithAggregatesInputSchema),z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorScalarWhereWithAggregatesInputSchema),z.lazy(() => VendorScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const CategoriesOnPartsWhereInputSchema: z.ZodType<Prisma.CategoriesOnPartsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriesOnPartsWhereInputSchema),z.lazy(() => CategoriesOnPartsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesOnPartsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesOnPartsWhereInputSchema),z.lazy(() => CategoriesOnPartsWhereInputSchema).array() ]).optional(),
  partId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  part: z.union([ z.lazy(() => PartRelationFilterSchema),z.lazy(() => PartWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => CategoryRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
}).strict();

export const CategoriesOnPartsOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoriesOnPartsOrderByWithRelationInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => PartOrderByWithRelationInputSchema).optional(),
  category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional()
}).strict();

export const CategoriesOnPartsWhereUniqueInputSchema: z.ZodType<Prisma.CategoriesOnPartsWhereUniqueInput> = z.union([
  z.object({
    partId_categoryId: z.lazy(() => CategoriesOnPartsPartIdCategoryIdCompoundUniqueInputSchema),
    partId: z.string()
  }),
  z.object({
    partId_categoryId: z.lazy(() => CategoriesOnPartsPartIdCategoryIdCompoundUniqueInputSchema),
  }),
  z.object({
    partId: z.string(),
  }),
])
.and(z.object({
  partId: z.string().optional(),
  partId_categoryId: z.lazy(() => CategoriesOnPartsPartIdCategoryIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => CategoriesOnPartsWhereInputSchema),z.lazy(() => CategoriesOnPartsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesOnPartsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesOnPartsWhereInputSchema),z.lazy(() => CategoriesOnPartsWhereInputSchema).array() ]).optional(),
  categoryId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  part: z.union([ z.lazy(() => PartRelationFilterSchema),z.lazy(() => PartWhereInputSchema) ]).optional(),
  category: z.union([ z.lazy(() => CategoryRelationFilterSchema),z.lazy(() => CategoryWhereInputSchema) ]).optional(),
}).strict());

export const CategoriesOnPartsOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoriesOnPartsOrderByWithAggregationInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => CategoriesOnPartsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => CategoriesOnPartsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => CategoriesOnPartsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => CategoriesOnPartsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => CategoriesOnPartsSumOrderByAggregateInputSchema).optional()
}).strict();

export const CategoriesOnPartsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoriesOnPartsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriesOnPartsScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoriesOnPartsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesOnPartsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesOnPartsScalarWhereWithAggregatesInputSchema),z.lazy(() => CategoriesOnPartsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  partId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const LocationsOnPartsWhereInputSchema: z.ZodType<Prisma.LocationsOnPartsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationsOnPartsWhereInputSchema),z.lazy(() => LocationsOnPartsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationsOnPartsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationsOnPartsWhereInputSchema),z.lazy(() => LocationsOnPartsWhereInputSchema).array() ]).optional(),
  partId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locationId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  part: z.union([ z.lazy(() => PartRelationFilterSchema),z.lazy(() => PartWhereInputSchema) ]).optional(),
  Location: z.union([ z.lazy(() => LocationRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional(),
}).strict();

export const LocationsOnPartsOrderByWithRelationInputSchema: z.ZodType<Prisma.LocationsOnPartsOrderByWithRelationInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => PartOrderByWithRelationInputSchema).optional(),
  Location: z.lazy(() => LocationOrderByWithRelationInputSchema).optional()
}).strict();

export const LocationsOnPartsWhereUniqueInputSchema: z.ZodType<Prisma.LocationsOnPartsWhereUniqueInput> = z.union([
  z.object({
    partId_locationId: z.lazy(() => LocationsOnPartsPartIdLocationIdCompoundUniqueInputSchema),
    partId: z.string()
  }),
  z.object({
    partId_locationId: z.lazy(() => LocationsOnPartsPartIdLocationIdCompoundUniqueInputSchema),
  }),
  z.object({
    partId: z.string(),
  }),
])
.and(z.object({
  partId: z.string().optional(),
  partId_locationId: z.lazy(() => LocationsOnPartsPartIdLocationIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => LocationsOnPartsWhereInputSchema),z.lazy(() => LocationsOnPartsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationsOnPartsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationsOnPartsWhereInputSchema),z.lazy(() => LocationsOnPartsWhereInputSchema).array() ]).optional(),
  locationId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  part: z.union([ z.lazy(() => PartRelationFilterSchema),z.lazy(() => PartWhereInputSchema) ]).optional(),
  Location: z.union([ z.lazy(() => LocationRelationFilterSchema),z.lazy(() => LocationWhereInputSchema) ]).optional(),
}).strict());

export const LocationsOnPartsOrderByWithAggregationInputSchema: z.ZodType<Prisma.LocationsOnPartsOrderByWithAggregationInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => LocationsOnPartsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => LocationsOnPartsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => LocationsOnPartsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => LocationsOnPartsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => LocationsOnPartsSumOrderByAggregateInputSchema).optional()
}).strict();

export const LocationsOnPartsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.LocationsOnPartsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => LocationsOnPartsScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationsOnPartsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationsOnPartsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationsOnPartsScalarWhereWithAggregatesInputSchema),z.lazy(() => LocationsOnPartsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  partId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  locationId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const VendorOnPartsWhereInputSchema: z.ZodType<Prisma.VendorOnPartsWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VendorOnPartsWhereInputSchema),z.lazy(() => VendorOnPartsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorOnPartsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorOnPartsWhereInputSchema),z.lazy(() => VendorOnPartsWhereInputSchema).array() ]).optional(),
  partId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vendorId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cost: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  part: z.union([ z.lazy(() => PartRelationFilterSchema),z.lazy(() => PartWhereInputSchema) ]).optional(),
  vendor: z.union([ z.lazy(() => VendorRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional(),
}).strict();

export const VendorOnPartsOrderByWithRelationInputSchema: z.ZodType<Prisma.VendorOnPartsOrderByWithRelationInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  part: z.lazy(() => PartOrderByWithRelationInputSchema).optional(),
  vendor: z.lazy(() => VendorOrderByWithRelationInputSchema).optional()
}).strict();

export const VendorOnPartsWhereUniqueInputSchema: z.ZodType<Prisma.VendorOnPartsWhereUniqueInput> = z.union([
  z.object({
    partId_vendorId: z.lazy(() => VendorOnPartsPartIdVendorIdCompoundUniqueInputSchema),
    partId: z.string()
  }),
  z.object({
    partId_vendorId: z.lazy(() => VendorOnPartsPartIdVendorIdCompoundUniqueInputSchema),
  }),
  z.object({
    partId: z.string(),
  }),
])
.and(z.object({
  partId: z.string().optional(),
  partId_vendorId: z.lazy(() => VendorOnPartsPartIdVendorIdCompoundUniqueInputSchema).optional(),
  AND: z.union([ z.lazy(() => VendorOnPartsWhereInputSchema),z.lazy(() => VendorOnPartsWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorOnPartsWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorOnPartsWhereInputSchema),z.lazy(() => VendorOnPartsWhereInputSchema).array() ]).optional(),
  vendorId: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  cost: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  part: z.union([ z.lazy(() => PartRelationFilterSchema),z.lazy(() => PartWhereInputSchema) ]).optional(),
  vendor: z.union([ z.lazy(() => VendorRelationFilterSchema),z.lazy(() => VendorWhereInputSchema) ]).optional(),
}).strict());

export const VendorOnPartsOrderByWithAggregationInputSchema: z.ZodType<Prisma.VendorOnPartsOrderByWithAggregationInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => VendorOnPartsCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => VendorOnPartsAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => VendorOnPartsMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => VendorOnPartsMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => VendorOnPartsSumOrderByAggregateInputSchema).optional()
}).strict();

export const VendorOnPartsScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VendorOnPartsScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => VendorOnPartsScalarWhereWithAggregatesInputSchema),z.lazy(() => VendorOnPartsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorOnPartsScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorOnPartsScalarWhereWithAggregatesInputSchema),z.lazy(() => VendorOnPartsScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  partId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  vendorId: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  cost: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> = z.object({
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
}).strict();

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> = z.object({
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
}).strict();

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema).optional()
}).strict();

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> = z.object({
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
}).strict();

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date(),
  user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema)
}).strict();

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema).optional()
}).strict();

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  userId: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VerificationTokenCreateInputSchema: z.ZodType<Prisma.VerificationTokenCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedCreateInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenCreateManyInputSchema: z.ZodType<Prisma.VerificationTokenCreateManyInput> = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.coerce.date()
}).strict();

export const VerificationTokenUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationTokenUpdateManyMutationInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VerificationTokenUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationTokenUncheckedUpdateManyInput> = z.object({
  identifier: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  token: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUserCreateInputSchema: z.ZodType<Prisma.CompanyUserCreateInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema),
  user: z.lazy(() => UserCreateNestedOneWithoutCompanyUsersInputSchema)
}).strict();

export const CompanyUserUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUserUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  companyId: z.string(),
  userId: z.string()
}).strict();

export const CompanyUserUpdateInputSchema: z.ZodType<Prisma.CompanyUserUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompanyUsersNestedInputSchema).optional()
}).strict();

export const CompanyUserUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUserUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUserCreateManyInputSchema: z.ZodType<Prisma.CompanyUserCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  companyId: z.string(),
  userId: z.string()
}).strict();

export const CompanyUserUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUserUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientCreateInputSchema: z.ZodType<Prisma.ClientCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),
  avatar: z.string().optional().nullable(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutClientsInputSchema)
}).strict();

export const ClientUncheckedCreateInputSchema: z.ZodType<Prisma.ClientUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),
  avatar: z.string().optional().nullable(),
  companyId: z.string()
}).strict();

export const ClientUpdateInputSchema: z.ZodType<Prisma.ClientUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutClientsNestedInputSchema).optional()
}).strict();

export const ClientUncheckedUpdateInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientCreateManyInputSchema: z.ZodType<Prisma.ClientCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),
  avatar: z.string().optional().nullable(),
  companyId: z.string()
}).strict();

export const ClientUpdateManyMutationInputSchema: z.ZodType<Prisma.ClientUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ClientUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyCreateInputSchema: z.ZodType<Prisma.CompanyCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  clients: z.lazy(() => ClientCreateNestedManyWithoutCompanyInputSchema).optional(),
  users: z.lazy(() => CompanyUserCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  clients: z.lazy(() => ClientUncheckedCreateNestedManyWithoutCompanyInputSchema).optional(),
  users: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUpdateInputSchema: z.ZodType<Prisma.CompanyUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  clients: z.lazy(() => ClientUpdateManyWithoutCompanyNestedInputSchema).optional(),
  users: z.lazy(() => CompanyUserUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  clients: z.lazy(() => ClientUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional(),
  users: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyCreateManyInputSchema: z.ZodType<Prisma.CompanyCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional()
}).strict();

export const CompanyUpdateManyMutationInputSchema: z.ZodType<Prisma.CompanyUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PartCreateInputSchema: z.ZodType<Prisma.PartCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  creationAuthor: z.lazy(() => UserCreateNestedOneWithoutCreatedPartsInputSchema),
  updateAuthor: z.lazy(() => UserCreateNestedOneWithoutUpdatedPartsInputSchema),
  deletionAuthor: z.lazy(() => UserCreateNestedOneWithoutDeletedPartsInputSchema)
}).strict();

export const PartUncheckedCreateInputSchema: z.ZodType<Prisma.PartUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  createdBy: z.string(),
  updatedBy: z.string(),
  deletedBy: z.string(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional()
}).strict();

export const PartUpdateInputSchema: z.ZodType<Prisma.PartUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  creationAuthor: z.lazy(() => UserUpdateOneRequiredWithoutCreatedPartsNestedInputSchema).optional(),
  updateAuthor: z.lazy(() => UserUpdateOneRequiredWithoutUpdatedPartsNestedInputSchema).optional(),
  deletionAuthor: z.lazy(() => UserUpdateOneRequiredWithoutDeletedPartsNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateInputSchema: z.ZodType<Prisma.PartUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional()
}).strict();

export const PartCreateManyInputSchema: z.ZodType<Prisma.PartCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  createdBy: z.string(),
  updatedBy: z.string(),
  deletedBy: z.string()
}).strict();

export const PartUpdateManyMutationInputSchema: z.ZodType<Prisma.PartUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PartUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PartUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  parts: z.lazy(() => CategoriesOnPartsCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  parts: z.lazy(() => CategoriesOnPartsUncheckedCreateNestedManyWithoutCategoryInputSchema).optional()
}).strict();

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parts: z.lazy(() => CategoriesOnPartsUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parts: z.lazy(() => CategoriesOnPartsUncheckedUpdateManyWithoutCategoryNestedInputSchema).optional()
}).strict();

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationCreateInputSchema: z.ZodType<Prisma.LocationCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  parts: z.lazy(() => LocationsOnPartsCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationUncheckedCreateInputSchema: z.ZodType<Prisma.LocationUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  parts: z.lazy(() => LocationsOnPartsUncheckedCreateNestedManyWithoutLocationInputSchema).optional()
}).strict();

export const LocationUpdateInputSchema: z.ZodType<Prisma.LocationUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parts: z.lazy(() => LocationsOnPartsUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parts: z.lazy(() => LocationsOnPartsUncheckedUpdateManyWithoutLocationNestedInputSchema).optional()
}).strict();

export const LocationCreateManyInputSchema: z.ZodType<Prisma.LocationCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const LocationUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VendorCreateInputSchema: z.ZodType<Prisma.VendorCreateInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  parts: z.lazy(() => VendorOnPartsCreateNestedManyWithoutVendorInputSchema).optional()
}).strict();

export const VendorUncheckedCreateInputSchema: z.ZodType<Prisma.VendorUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  parts: z.lazy(() => VendorOnPartsUncheckedCreateNestedManyWithoutVendorInputSchema).optional()
}).strict();

export const VendorUpdateInputSchema: z.ZodType<Prisma.VendorUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parts: z.lazy(() => VendorOnPartsUpdateManyWithoutVendorNestedInputSchema).optional()
}).strict();

export const VendorUncheckedUpdateInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  parts: z.lazy(() => VendorOnPartsUncheckedUpdateManyWithoutVendorNestedInputSchema).optional()
}).strict();

export const VendorCreateManyInputSchema: z.ZodType<Prisma.VendorCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const VendorUpdateManyMutationInputSchema: z.ZodType<Prisma.VendorUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VendorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoriesOnPartsCreateInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateInput> = z.object({
  part: z.lazy(() => PartCreateNestedOneWithoutCategoriesInputSchema),
  category: z.lazy(() => CategoryCreateNestedOneWithoutPartsInputSchema)
}).strict();

export const CategoriesOnPartsUncheckedCreateInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedCreateInput> = z.object({
  partId: z.string(),
  categoryId: z.number().int()
}).strict();

export const CategoriesOnPartsUpdateInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateInput> = z.object({
  part: z.lazy(() => PartUpdateOneRequiredWithoutCategoriesNestedInputSchema).optional(),
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutPartsNestedInputSchema).optional()
}).strict();

export const CategoriesOnPartsUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedUpdateInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriesOnPartsCreateManyInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateManyInput> = z.object({
  partId: z.string(),
  categoryId: z.number().int()
}).strict();

export const CategoriesOnPartsUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateManyMutationInput> = z.object({
}).strict();

export const CategoriesOnPartsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedUpdateManyInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationsOnPartsCreateInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateInput> = z.object({
  quantity: z.number().int(),
  unit: z.string(),
  part: z.lazy(() => PartCreateNestedOneWithoutLocationsInputSchema),
  Location: z.lazy(() => LocationCreateNestedOneWithoutPartsInputSchema)
}).strict();

export const LocationsOnPartsUncheckedCreateInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedCreateInput> = z.object({
  partId: z.string(),
  locationId: z.number().int(),
  quantity: z.number().int(),
  unit: z.string()
}).strict();

export const LocationsOnPartsUpdateInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateInput> = z.object({
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.lazy(() => PartUpdateOneRequiredWithoutLocationsNestedInputSchema).optional(),
  Location: z.lazy(() => LocationUpdateOneRequiredWithoutPartsNestedInputSchema).optional()
}).strict();

export const LocationsOnPartsUncheckedUpdateInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedUpdateInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationsOnPartsCreateManyInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateManyInput> = z.object({
  partId: z.string(),
  locationId: z.number().int(),
  quantity: z.number().int(),
  unit: z.string()
}).strict();

export const LocationsOnPartsUpdateManyMutationInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateManyMutationInput> = z.object({
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationsOnPartsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedUpdateManyInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VendorOnPartsCreateInputSchema: z.ZodType<Prisma.VendorOnPartsCreateInput> = z.object({
  cost: z.number(),
  part: z.lazy(() => PartCreateNestedOneWithoutVendorsInputSchema),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutPartsInputSchema)
}).strict();

export const VendorOnPartsUncheckedCreateInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedCreateInput> = z.object({
  partId: z.string(),
  vendorId: z.number().int(),
  cost: z.number()
}).strict();

export const VendorOnPartsUpdateInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateInput> = z.object({
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.lazy(() => PartUpdateOneRequiredWithoutVendorsNestedInputSchema).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutPartsNestedInputSchema).optional()
}).strict();

export const VendorOnPartsUncheckedUpdateInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedUpdateInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VendorOnPartsCreateManyInputSchema: z.ZodType<Prisma.VendorOnPartsCreateManyInput> = z.object({
  partId: z.string(),
  vendorId: z.number().int(),
  cost: z.number()
}).strict();

export const VendorOnPartsUpdateManyMutationInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateManyMutationInput> = z.object({
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VendorOnPartsUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedUpdateManyInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  vendorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const AccountProviderProviderAccountIdCompoundUniqueInputSchema: z.ZodType<Prisma.AccountProviderProviderAccountIdCompoundUniqueInput> = z.object({
  provider: z.string(),
  providerAccountId: z.string()
}).strict();

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> = z.object({
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

export const AccountAvgOrderByAggregateInputSchema: z.ZodType<Prisma.AccountAvgOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> = z.object({
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

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> = z.object({
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

export const AccountSumOrderByAggregateInputSchema: z.ZodType<Prisma.AccountSumOrderByAggregateInput> = z.object({
  expires_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  sessionToken: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> = z.object({
  every: z.lazy(() => AccountWhereInputSchema).optional(),
  some: z.lazy(() => AccountWhereInputSchema).optional(),
  none: z.lazy(() => AccountWhereInputSchema).optional()
}).strict();

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> = z.object({
  every: z.lazy(() => SessionWhereInputSchema).optional(),
  some: z.lazy(() => SessionWhereInputSchema).optional(),
  none: z.lazy(() => SessionWhereInputSchema).optional()
}).strict();

export const CompanyUserListRelationFilterSchema: z.ZodType<Prisma.CompanyUserListRelationFilter> = z.object({
  every: z.lazy(() => CompanyUserWhereInputSchema).optional(),
  some: z.lazy(() => CompanyUserWhereInputSchema).optional(),
  none: z.lazy(() => CompanyUserWhereInputSchema).optional()
}).strict();

export const PartListRelationFilterSchema: z.ZodType<Prisma.PartListRelationFilter> = z.object({
  every: z.lazy(() => PartWhereInputSchema).optional(),
  some: z.lazy(() => PartWhereInputSchema).optional(),
  none: z.lazy(() => PartWhereInputSchema).optional()
}).strict();

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyUserOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CompanyUserOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartOrderByRelationAggregateInputSchema: z.ZodType<Prisma.PartOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  emailVerified: z.lazy(() => SortOrderSchema).optional(),
  image: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const VerificationTokenIdentifierTokenCompoundUniqueInputSchema: z.ZodType<Prisma.VerificationTokenIdentifierTokenCompoundUniqueInput> = z.object({
  identifier: z.string(),
  token: z.string()
}).strict();

export const VerificationTokenCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenCountOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMaxOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VerificationTokenMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationTokenMinOrderByAggregateInput> = z.object({
  identifier: z.lazy(() => SortOrderSchema).optional(),
  token: z.lazy(() => SortOrderSchema).optional(),
  expires: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRoleFilterSchema: z.ZodType<Prisma.EnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const CompanyRelationFilterSchema: z.ZodType<Prisma.CompanyRelationFilter> = z.object({
  is: z.lazy(() => CompanyWhereInputSchema).optional(),
  isNot: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUserCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyUserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyUserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyUserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyUserMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyUserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const EnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.EnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const ClientCountOrderByAggregateInputSchema: z.ZodType<Prisma.ClientCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ClientMinOrderByAggregateInputSchema: z.ZodType<Prisma.ClientMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  phoneNumber: z.lazy(() => SortOrderSchema).optional(),
  avatar: z.lazy(() => SortOrderSchema).optional(),
  companyId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const ClientListRelationFilterSchema: z.ZodType<Prisma.ClientListRelationFilter> = z.object({
  every: z.lazy(() => ClientWhereInputSchema).optional(),
  some: z.lazy(() => ClientWhereInputSchema).optional(),
  none: z.lazy(() => ClientWhereInputSchema).optional()
}).strict();

export const ClientOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ClientOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyCountOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CompanyMinOrderByAggregateInputSchema: z.ZodType<Prisma.CompanyMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  isAdmin: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const JsonNullableFilterSchema: z.ZodType<Prisma.JsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const CategoriesOnPartsListRelationFilterSchema: z.ZodType<Prisma.CategoriesOnPartsListRelationFilter> = z.object({
  every: z.lazy(() => CategoriesOnPartsWhereInputSchema).optional(),
  some: z.lazy(() => CategoriesOnPartsWhereInputSchema).optional(),
  none: z.lazy(() => CategoriesOnPartsWhereInputSchema).optional()
}).strict();

export const LocationsOnPartsListRelationFilterSchema: z.ZodType<Prisma.LocationsOnPartsListRelationFilter> = z.object({
  every: z.lazy(() => LocationsOnPartsWhereInputSchema).optional(),
  some: z.lazy(() => LocationsOnPartsWhereInputSchema).optional(),
  none: z.lazy(() => LocationsOnPartsWhereInputSchema).optional()
}).strict();

export const VendorOnPartsListRelationFilterSchema: z.ZodType<Prisma.VendorOnPartsListRelationFilter> = z.object({
  every: z.lazy(() => VendorOnPartsWhereInputSchema).optional(),
  some: z.lazy(() => VendorOnPartsWhereInputSchema).optional(),
  none: z.lazy(() => VendorOnPartsWhereInputSchema).optional()
}).strict();

export const CategoriesOnPartsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.CategoriesOnPartsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationsOnPartsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.LocationsOnPartsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorOnPartsOrderByRelationAggregateInputSchema: z.ZodType<Prisma.VendorOnPartsOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartCountOrderByAggregateInputSchema: z.ZodType<Prisma.PartCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  criticalQty: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  extendedPartData: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  deletedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartAvgOrderByAggregateInputSchema: z.ZodType<Prisma.PartAvgOrderByAggregateInput> = z.object({
  number: z.lazy(() => SortOrderSchema).optional(),
  criticalQty: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PartMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  criticalQty: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  deletedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartMinOrderByAggregateInputSchema: z.ZodType<Prisma.PartMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  number: z.lazy(() => SortOrderSchema).optional(),
  criticalQty: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional(),
  description: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional(),
  createdBy: z.lazy(() => SortOrderSchema).optional(),
  updatedBy: z.lazy(() => SortOrderSchema).optional(),
  deletedBy: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartSumOrderByAggregateInputSchema: z.ZodType<Prisma.PartSumOrderByAggregateInput> = z.object({
  number: z.lazy(() => SortOrderSchema).optional(),
  criticalQty: z.lazy(() => SortOrderSchema).optional(),
  upc: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const JsonNullableWithAggregatesFilterSchema: z.ZodType<Prisma.JsonNullableWithAggregatesFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedJsonNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedJsonNullableFilterSchema).optional()
}).strict();

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategorySumOrderByAggregateInputSchema: z.ZodType<Prisma.CategorySumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorCountOrderByAggregateInputSchema: z.ZodType<Prisma.VendorCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VendorAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VendorMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorMinOrderByAggregateInputSchema: z.ZodType<Prisma.VendorMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  deletedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorSumOrderByAggregateInputSchema: z.ZodType<Prisma.VendorSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const PartRelationFilterSchema: z.ZodType<Prisma.PartRelationFilter> = z.object({
  is: z.lazy(() => PartWhereInputSchema).optional(),
  isNot: z.lazy(() => PartWhereInputSchema).optional()
}).strict();

export const CategoryRelationFilterSchema: z.ZodType<Prisma.CategoryRelationFilter> = z.object({
  is: z.lazy(() => CategoryWhereInputSchema).optional(),
  isNot: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoriesOnPartsPartIdCategoryIdCompoundUniqueInputSchema: z.ZodType<Prisma.CategoriesOnPartsPartIdCategoryIdCompoundUniqueInput> = z.object({
  partId: z.string(),
  categoryId: z.number()
}).strict();

export const CategoriesOnPartsCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesOnPartsCountOrderByAggregateInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriesOnPartsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesOnPartsAvgOrderByAggregateInput> = z.object({
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriesOnPartsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesOnPartsMaxOrderByAggregateInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriesOnPartsMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesOnPartsMinOrderByAggregateInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const CategoriesOnPartsSumOrderByAggregateInputSchema: z.ZodType<Prisma.CategoriesOnPartsSumOrderByAggregateInput> = z.object({
  categoryId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationRelationFilterSchema: z.ZodType<Prisma.LocationRelationFilter> = z.object({
  is: z.lazy(() => LocationWhereInputSchema).optional(),
  isNot: z.lazy(() => LocationWhereInputSchema).optional()
}).strict();

export const LocationsOnPartsPartIdLocationIdCompoundUniqueInputSchema: z.ZodType<Prisma.LocationsOnPartsPartIdLocationIdCompoundUniqueInput> = z.object({
  partId: z.string(),
  locationId: z.number()
}).strict();

export const LocationsOnPartsCountOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsOnPartsCountOrderByAggregateInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationsOnPartsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsOnPartsAvgOrderByAggregateInput> = z.object({
  locationId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationsOnPartsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsOnPartsMaxOrderByAggregateInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationsOnPartsMinOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsOnPartsMinOrderByAggregateInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  locationId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional(),
  unit: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const LocationsOnPartsSumOrderByAggregateInputSchema: z.ZodType<Prisma.LocationsOnPartsSumOrderByAggregateInput> = z.object({
  locationId: z.lazy(() => SortOrderSchema).optional(),
  quantity: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const VendorRelationFilterSchema: z.ZodType<Prisma.VendorRelationFilter> = z.object({
  is: z.lazy(() => VendorWhereInputSchema).optional(),
  isNot: z.lazy(() => VendorWhereInputSchema).optional()
}).strict();

export const VendorOnPartsPartIdVendorIdCompoundUniqueInputSchema: z.ZodType<Prisma.VendorOnPartsPartIdVendorIdCompoundUniqueInput> = z.object({
  partId: z.string(),
  vendorId: z.number()
}).strict();

export const VendorOnPartsCountOrderByAggregateInputSchema: z.ZodType<Prisma.VendorOnPartsCountOrderByAggregateInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorOnPartsAvgOrderByAggregateInputSchema: z.ZodType<Prisma.VendorOnPartsAvgOrderByAggregateInput> = z.object({
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorOnPartsMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VendorOnPartsMaxOrderByAggregateInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorOnPartsMinOrderByAggregateInputSchema: z.ZodType<Prisma.VendorOnPartsMinOrderByAggregateInput> = z.object({
  partId: z.lazy(() => SortOrderSchema).optional(),
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const VendorOnPartsSumOrderByAggregateInputSchema: z.ZodType<Prisma.VendorOnPartsSumOrderByAggregateInput> = z.object({
  vendorId: z.lazy(() => SortOrderSchema).optional(),
  cost: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAccountsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutSessionsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]).optional(),
}).strict();

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompanyUserCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutUserInputSchema),z.lazy(() => CompanyUserCreateWithoutUserInputSchema).array(),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PartCreateNestedManyWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartCreateNestedManyWithoutCreationAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartCreateWithoutCreationAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutCreationAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutCreationAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyCreationAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PartCreateNestedManyWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartCreateNestedManyWithoutUpdateAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutUpdateAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutUpdateAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyUpdateAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PartCreateNestedManyWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartCreateNestedManyWithoutDeletionAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutDeletionAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutDeletionAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyDeletionAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutUserInputSchema),z.lazy(() => CompanyUserCreateWithoutUserInputSchema).array(),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PartUncheckedCreateNestedManyWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartUncheckedCreateNestedManyWithoutCreationAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartCreateWithoutCreationAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutCreationAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutCreationAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyCreationAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PartUncheckedCreateNestedManyWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartUncheckedCreateNestedManyWithoutUpdateAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutUpdateAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutUpdateAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyUpdateAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const PartUncheckedCreateNestedManyWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartUncheckedCreateNestedManyWithoutDeletionAuthorInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutDeletionAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutDeletionAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyDeletionAuthorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompanyUserUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CompanyUserUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutUserInputSchema),z.lazy(() => CompanyUserCreateWithoutUserInputSchema).array(),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompanyUserUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CompanyUserUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompanyUserScalarWhereInputSchema),z.lazy(() => CompanyUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PartUpdateManyWithoutCreationAuthorNestedInputSchema: z.ZodType<Prisma.PartUpdateManyWithoutCreationAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartCreateWithoutCreationAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutCreationAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutCreationAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PartUpsertWithWhereUniqueWithoutCreationAuthorInputSchema),z.lazy(() => PartUpsertWithWhereUniqueWithoutCreationAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyCreationAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PartUpdateWithWhereUniqueWithoutCreationAuthorInputSchema),z.lazy(() => PartUpdateWithWhereUniqueWithoutCreationAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PartUpdateManyWithWhereWithoutCreationAuthorInputSchema),z.lazy(() => PartUpdateManyWithWhereWithoutCreationAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PartScalarWhereInputSchema),z.lazy(() => PartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PartUpdateManyWithoutUpdateAuthorNestedInputSchema: z.ZodType<Prisma.PartUpdateManyWithoutUpdateAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutUpdateAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutUpdateAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PartUpsertWithWhereUniqueWithoutUpdateAuthorInputSchema),z.lazy(() => PartUpsertWithWhereUniqueWithoutUpdateAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyUpdateAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PartUpdateWithWhereUniqueWithoutUpdateAuthorInputSchema),z.lazy(() => PartUpdateWithWhereUniqueWithoutUpdateAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PartUpdateManyWithWhereWithoutUpdateAuthorInputSchema),z.lazy(() => PartUpdateManyWithWhereWithoutUpdateAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PartScalarWhereInputSchema),z.lazy(() => PartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PartUpdateManyWithoutDeletionAuthorNestedInputSchema: z.ZodType<Prisma.PartUpdateManyWithoutDeletionAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutDeletionAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutDeletionAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PartUpsertWithWhereUniqueWithoutDeletionAuthorInputSchema),z.lazy(() => PartUpsertWithWhereUniqueWithoutDeletionAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyDeletionAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PartUpdateWithWhereUniqueWithoutDeletionAuthorInputSchema),z.lazy(() => PartUpdateWithWhereUniqueWithoutDeletionAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PartUpdateManyWithWhereWithoutDeletionAuthorInputSchema),z.lazy(() => PartUpdateManyWithWhereWithoutDeletionAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PartScalarWhereInputSchema),z.lazy(() => PartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountCreateWithoutUserInputSchema).array(),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => AccountCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => AccountWhereUniqueInputSchema),z.lazy(() => AccountWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionCreateWithoutUserInputSchema).array(),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => SessionCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => SessionWhereUniqueInputSchema),z.lazy(() => SessionWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.CompanyUserUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutUserInputSchema),z.lazy(() => CompanyUserCreateWithoutUserInputSchema).array(),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema),z.lazy(() => CompanyUserCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompanyUserUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => CompanyUserUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompanyUserScalarWhereInputSchema),z.lazy(() => CompanyUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PartUncheckedUpdateManyWithoutCreationAuthorNestedInputSchema: z.ZodType<Prisma.PartUncheckedUpdateManyWithoutCreationAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartCreateWithoutCreationAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutCreationAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutCreationAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PartUpsertWithWhereUniqueWithoutCreationAuthorInputSchema),z.lazy(() => PartUpsertWithWhereUniqueWithoutCreationAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyCreationAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PartUpdateWithWhereUniqueWithoutCreationAuthorInputSchema),z.lazy(() => PartUpdateWithWhereUniqueWithoutCreationAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PartUpdateManyWithWhereWithoutCreationAuthorInputSchema),z.lazy(() => PartUpdateManyWithWhereWithoutCreationAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PartScalarWhereInputSchema),z.lazy(() => PartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PartUncheckedUpdateManyWithoutUpdateAuthorNestedInputSchema: z.ZodType<Prisma.PartUncheckedUpdateManyWithoutUpdateAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutUpdateAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutUpdateAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PartUpsertWithWhereUniqueWithoutUpdateAuthorInputSchema),z.lazy(() => PartUpsertWithWhereUniqueWithoutUpdateAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyUpdateAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PartUpdateWithWhereUniqueWithoutUpdateAuthorInputSchema),z.lazy(() => PartUpdateWithWhereUniqueWithoutUpdateAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PartUpdateManyWithWhereWithoutUpdateAuthorInputSchema),z.lazy(() => PartUpdateManyWithWhereWithoutUpdateAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PartScalarWhereInputSchema),z.lazy(() => PartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PartUncheckedUpdateManyWithoutDeletionAuthorNestedInputSchema: z.ZodType<Prisma.PartUncheckedUpdateManyWithoutDeletionAuthorNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema).array(),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => PartCreateOrConnectWithoutDeletionAuthorInputSchema),z.lazy(() => PartCreateOrConnectWithoutDeletionAuthorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => PartUpsertWithWhereUniqueWithoutDeletionAuthorInputSchema),z.lazy(() => PartUpsertWithWhereUniqueWithoutDeletionAuthorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => PartCreateManyDeletionAuthorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => PartWhereUniqueInputSchema),z.lazy(() => PartWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => PartUpdateWithWhereUniqueWithoutDeletionAuthorInputSchema),z.lazy(() => PartUpdateWithWhereUniqueWithoutDeletionAuthorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => PartUpdateManyWithWhereWithoutDeletionAuthorInputSchema),z.lazy(() => PartUpdateManyWithWhereWithoutDeletionAuthorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => PartScalarWhereInputSchema),z.lazy(() => PartScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompanyCreateNestedOneWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutUsersInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutCompanyUsersInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCompanyUsersInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyUsersInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompanyUsersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const EnumRoleFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumRoleFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => RoleSchema).optional()
}).strict();

export const CompanyUpdateOneRequiredWithoutUsersNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutUsersInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutUsersInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutUsersInputSchema),z.lazy(() => CompanyUpdateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCompanyUsersNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCompanyUsersNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyUsersInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyUsersInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCompanyUsersInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCompanyUsersInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCompanyUsersInputSchema),z.lazy(() => UserUpdateWithoutCompanyUsersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompanyUsersInputSchema) ]).optional(),
}).strict();

export const CompanyCreateNestedOneWithoutClientsInputSchema: z.ZodType<Prisma.CompanyCreateNestedOneWithoutClientsInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutClientsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutClientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutClientsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional()
}).strict();

export const CompanyUpdateOneRequiredWithoutClientsNestedInputSchema: z.ZodType<Prisma.CompanyUpdateOneRequiredWithoutClientsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyCreateWithoutClientsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutClientsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CompanyCreateOrConnectWithoutClientsInputSchema).optional(),
  upsert: z.lazy(() => CompanyUpsertWithoutClientsInputSchema).optional(),
  connect: z.lazy(() => CompanyWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CompanyUpdateToOneWithWhereWithoutClientsInputSchema),z.lazy(() => CompanyUpdateWithoutClientsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutClientsInputSchema) ]).optional(),
}).strict();

export const ClientCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.ClientCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutCompanyInputSchema),z.lazy(() => ClientCreateWithoutCompanyInputSchema).array(),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClientCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompanyUserCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema).array(),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ClientUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.ClientUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutCompanyInputSchema),z.lazy(() => ClientCreateWithoutCompanyInputSchema).array(),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClientCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CompanyUserUncheckedCreateNestedManyWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserUncheckedCreateNestedManyWithoutCompanyInput> = z.object({
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema).array(),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyCompanyInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const ClientUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.ClientUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutCompanyInputSchema),z.lazy(() => ClientCreateWithoutCompanyInputSchema).array(),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClientUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ClientUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClientCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClientUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ClientUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClientUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => ClientUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClientScalarWhereInputSchema),z.lazy(() => ClientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompanyUserUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.CompanyUserUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema).array(),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompanyUserScalarWhereInputSchema),z.lazy(() => CompanyUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ClientUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => ClientCreateWithoutCompanyInputSchema),z.lazy(() => ClientCreateWithoutCompanyInputSchema).array(),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => ClientCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ClientUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ClientUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ClientCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ClientWhereUniqueInputSchema),z.lazy(() => ClientWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ClientUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => ClientUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ClientUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => ClientUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ClientScalarWhereInputSchema),z.lazy(() => ClientScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CompanyUserUncheckedUpdateManyWithoutCompanyNestedInputSchema: z.ZodType<Prisma.CompanyUserUncheckedUpdateManyWithoutCompanyNestedInput> = z.object({
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema).array(),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema),z.lazy(() => CompanyUserCreateOrConnectWithoutCompanyInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CompanyUserCreateManyCompanyInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CompanyUserWhereUniqueInputSchema),z.lazy(() => CompanyUserWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema),z.lazy(() => CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema),z.lazy(() => CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CompanyUserScalarWhereInputSchema),z.lazy(() => CompanyUserScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoriesOnPartsCreateNestedManyWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateNestedManyWithoutPartInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriesOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationsOnPartsCreateNestedManyWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateNestedManyWithoutPartInput> = z.object({
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationsOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => LocationsOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationsOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VendorOnPartsCreateNestedManyWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsCreateNestedManyWithoutPartInput> = z.object({
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VendorOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => VendorOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VendorOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutCreatedPartsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCreatedPartsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedPartsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutUpdatedPartsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUpdatedPartsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUpdatedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUpdatedPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUpdatedPartsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutDeletedPartsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutDeletedPartsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDeletedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutDeletedPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDeletedPartsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const CategoriesOnPartsUncheckedCreateNestedManyWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedCreateNestedManyWithoutPartInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriesOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationsOnPartsUncheckedCreateNestedManyWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedCreateNestedManyWithoutPartInput> = z.object({
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationsOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => LocationsOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationsOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VendorOnPartsUncheckedCreateNestedManyWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedCreateNestedManyWithoutPartInput> = z.object({
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VendorOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => VendorOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VendorOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const CategoriesOnPartsUpdateManyWithoutPartNestedInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateManyWithoutPartNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoriesOnPartsUpsertWithWhereUniqueWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUpsertWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriesOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoriesOnPartsUpdateWithWhereUniqueWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUpdateWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoriesOnPartsUpdateManyWithWhereWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUpdateManyWithWhereWithoutPartInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoriesOnPartsScalarWhereInputSchema),z.lazy(() => CategoriesOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationsOnPartsUpdateManyWithoutPartNestedInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateManyWithoutPartNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationsOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => LocationsOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationsOnPartsUpsertWithWhereUniqueWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUpsertWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationsOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationsOnPartsUpdateWithWhereUniqueWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUpdateWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationsOnPartsUpdateManyWithWhereWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUpdateManyWithWhereWithoutPartInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationsOnPartsScalarWhereInputSchema),z.lazy(() => LocationsOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VendorOnPartsUpdateManyWithoutPartNestedInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateManyWithoutPartNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VendorOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => VendorOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VendorOnPartsUpsertWithWhereUniqueWithoutPartInputSchema),z.lazy(() => VendorOnPartsUpsertWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VendorOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VendorOnPartsUpdateWithWhereUniqueWithoutPartInputSchema),z.lazy(() => VendorOnPartsUpdateWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VendorOnPartsUpdateManyWithWhereWithoutPartInputSchema),z.lazy(() => VendorOnPartsUpdateManyWithWhereWithoutPartInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VendorOnPartsScalarWhereInputSchema),z.lazy(() => VendorOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutCreatedPartsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutCreatedPartsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCreatedPartsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutCreatedPartsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutCreatedPartsInputSchema),z.lazy(() => UserUpdateWithoutCreatedPartsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedPartsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutUpdatedPartsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUpdatedPartsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUpdatedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUpdatedPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUpdatedPartsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUpdatedPartsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUpdatedPartsInputSchema),z.lazy(() => UserUpdateWithoutUpdatedPartsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUpdatedPartsInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutDeletedPartsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutDeletedPartsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutDeletedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutDeletedPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutDeletedPartsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutDeletedPartsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutDeletedPartsInputSchema),z.lazy(() => UserUpdateWithoutDeletedPartsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDeletedPartsInputSchema) ]).optional(),
}).strict();

export const CategoriesOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedUpdateManyWithoutPartNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoriesOnPartsUpsertWithWhereUniqueWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUpsertWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriesOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoriesOnPartsUpdateWithWhereUniqueWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUpdateWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoriesOnPartsUpdateManyWithWhereWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUpdateManyWithWhereWithoutPartInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoriesOnPartsScalarWhereInputSchema),z.lazy(() => CategoriesOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationsOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedUpdateManyWithoutPartNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationsOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => LocationsOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationsOnPartsUpsertWithWhereUniqueWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUpsertWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationsOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationsOnPartsUpdateWithWhereUniqueWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUpdateWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationsOnPartsUpdateManyWithWhereWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUpdateManyWithWhereWithoutPartInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationsOnPartsScalarWhereInputSchema),z.lazy(() => LocationsOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VendorOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedUpdateManyWithoutPartNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema).array(),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VendorOnPartsCreateOrConnectWithoutPartInputSchema),z.lazy(() => VendorOnPartsCreateOrConnectWithoutPartInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VendorOnPartsUpsertWithWhereUniqueWithoutPartInputSchema),z.lazy(() => VendorOnPartsUpsertWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VendorOnPartsCreateManyPartInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VendorOnPartsUpdateWithWhereUniqueWithoutPartInputSchema),z.lazy(() => VendorOnPartsUpdateWithWhereUniqueWithoutPartInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VendorOnPartsUpdateManyWithWhereWithoutPartInputSchema),z.lazy(() => VendorOnPartsUpdateManyWithWhereWithoutPartInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VendorOnPartsScalarWhereInputSchema),z.lazy(() => VendorOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoriesOnPartsCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema).array(),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriesOnPartsCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoriesOnPartsUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedCreateNestedManyWithoutCategoryInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema).array(),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriesOnPartsCreateManyCategoryInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const CategoriesOnPartsUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema).array(),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoriesOnPartsUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriesOnPartsCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoriesOnPartsUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoriesOnPartsUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoriesOnPartsScalarWhereInputSchema),z.lazy(() => CategoriesOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const CategoriesOnPartsUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedUpdateManyWithoutCategoryNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema).array(),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsCreateOrConnectWithoutCategoryInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => CategoriesOnPartsUpsertWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUpsertWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  createMany: z.lazy(() => CategoriesOnPartsCreateManyCategoryInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => CategoriesOnPartsUpdateWithWhereUniqueWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUpdateWithWhereUniqueWithoutCategoryInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => CategoriesOnPartsUpdateManyWithWhereWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUpdateManyWithWhereWithoutCategoryInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => CategoriesOnPartsScalarWhereInputSchema),z.lazy(() => CategoriesOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationsOnPartsCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema).array(),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationsOnPartsCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationsOnPartsCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationsOnPartsUncheckedCreateNestedManyWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedCreateNestedManyWithoutLocationInput> = z.object({
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema).array(),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationsOnPartsCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationsOnPartsCreateManyLocationInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const LocationsOnPartsUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema).array(),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationsOnPartsCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationsOnPartsUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationsOnPartsCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationsOnPartsUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationsOnPartsUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationsOnPartsScalarWhereInputSchema),z.lazy(() => LocationsOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const LocationsOnPartsUncheckedUpdateManyWithoutLocationNestedInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedUpdateManyWithoutLocationNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema).array(),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => LocationsOnPartsCreateOrConnectWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsCreateOrConnectWithoutLocationInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => LocationsOnPartsUpsertWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUpsertWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  createMany: z.lazy(() => LocationsOnPartsCreateManyLocationInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),z.lazy(() => LocationsOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => LocationsOnPartsUpdateWithWhereUniqueWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUpdateWithWhereUniqueWithoutLocationInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => LocationsOnPartsUpdateManyWithWhereWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUpdateManyWithWhereWithoutLocationInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => LocationsOnPartsScalarWhereInputSchema),z.lazy(() => LocationsOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VendorOnPartsCreateNestedManyWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema).array(),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VendorOnPartsCreateOrConnectWithoutVendorInputSchema),z.lazy(() => VendorOnPartsCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VendorOnPartsCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VendorOnPartsUncheckedCreateNestedManyWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedCreateNestedManyWithoutVendorInput> = z.object({
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema).array(),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VendorOnPartsCreateOrConnectWithoutVendorInputSchema),z.lazy(() => VendorOnPartsCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VendorOnPartsCreateManyVendorInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const VendorOnPartsUpdateManyWithoutVendorNestedInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema).array(),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VendorOnPartsCreateOrConnectWithoutVendorInputSchema),z.lazy(() => VendorOnPartsCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VendorOnPartsUpsertWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUpsertWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VendorOnPartsCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VendorOnPartsUpdateWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUpdateWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VendorOnPartsUpdateManyWithWhereWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUpdateManyWithWhereWithoutVendorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VendorOnPartsScalarWhereInputSchema),z.lazy(() => VendorOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const VendorOnPartsUncheckedUpdateManyWithoutVendorNestedInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedUpdateManyWithoutVendorNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema).array(),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => VendorOnPartsCreateOrConnectWithoutVendorInputSchema),z.lazy(() => VendorOnPartsCreateOrConnectWithoutVendorInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => VendorOnPartsUpsertWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUpsertWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  createMany: z.lazy(() => VendorOnPartsCreateManyVendorInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => VendorOnPartsWhereUniqueInputSchema),z.lazy(() => VendorOnPartsWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => VendorOnPartsUpdateWithWhereUniqueWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUpdateWithWhereUniqueWithoutVendorInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => VendorOnPartsUpdateManyWithWhereWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUpdateManyWithWhereWithoutVendorInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => VendorOnPartsScalarWhereInputSchema),z.lazy(() => VendorOnPartsScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const PartCreateNestedOneWithoutCategoriesInputSchema: z.ZodType<Prisma.PartCreateNestedOneWithoutCategoriesInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutCategoriesInputSchema),z.lazy(() => PartUncheckedCreateWithoutCategoriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartCreateOrConnectWithoutCategoriesInputSchema).optional(),
  connect: z.lazy(() => PartWhereUniqueInputSchema).optional()
}).strict();

export const CategoryCreateNestedOneWithoutPartsInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutPartsInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutPartsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutPartsInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional()
}).strict();

export const PartUpdateOneRequiredWithoutCategoriesNestedInputSchema: z.ZodType<Prisma.PartUpdateOneRequiredWithoutCategoriesNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutCategoriesInputSchema),z.lazy(() => PartUncheckedCreateWithoutCategoriesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartCreateOrConnectWithoutCategoriesInputSchema).optional(),
  upsert: z.lazy(() => PartUpsertWithoutCategoriesInputSchema).optional(),
  connect: z.lazy(() => PartWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PartUpdateToOneWithWhereWithoutCategoriesInputSchema),z.lazy(() => PartUpdateWithoutCategoriesInputSchema),z.lazy(() => PartUncheckedUpdateWithoutCategoriesInputSchema) ]).optional(),
}).strict();

export const CategoryUpdateOneRequiredWithoutPartsNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutPartsNestedInput> = z.object({
  create: z.union([ z.lazy(() => CategoryCreateWithoutPartsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => CategoryCreateOrConnectWithoutPartsInputSchema).optional(),
  upsert: z.lazy(() => CategoryUpsertWithoutPartsInputSchema).optional(),
  connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => CategoryUpdateToOneWithWhereWithoutPartsInputSchema),z.lazy(() => CategoryUpdateWithoutPartsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutPartsInputSchema) ]).optional(),
}).strict();

export const PartCreateNestedOneWithoutLocationsInputSchema: z.ZodType<Prisma.PartCreateNestedOneWithoutLocationsInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutLocationsInputSchema),z.lazy(() => PartUncheckedCreateWithoutLocationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartCreateOrConnectWithoutLocationsInputSchema).optional(),
  connect: z.lazy(() => PartWhereUniqueInputSchema).optional()
}).strict();

export const LocationCreateNestedOneWithoutPartsInputSchema: z.ZodType<Prisma.LocationCreateNestedOneWithoutPartsInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutPartsInputSchema),z.lazy(() => LocationUncheckedCreateWithoutPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutPartsInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional()
}).strict();

export const PartUpdateOneRequiredWithoutLocationsNestedInputSchema: z.ZodType<Prisma.PartUpdateOneRequiredWithoutLocationsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutLocationsInputSchema),z.lazy(() => PartUncheckedCreateWithoutLocationsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartCreateOrConnectWithoutLocationsInputSchema).optional(),
  upsert: z.lazy(() => PartUpsertWithoutLocationsInputSchema).optional(),
  connect: z.lazy(() => PartWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PartUpdateToOneWithWhereWithoutLocationsInputSchema),z.lazy(() => PartUpdateWithoutLocationsInputSchema),z.lazy(() => PartUncheckedUpdateWithoutLocationsInputSchema) ]).optional(),
}).strict();

export const LocationUpdateOneRequiredWithoutPartsNestedInputSchema: z.ZodType<Prisma.LocationUpdateOneRequiredWithoutPartsNestedInput> = z.object({
  create: z.union([ z.lazy(() => LocationCreateWithoutPartsInputSchema),z.lazy(() => LocationUncheckedCreateWithoutPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => LocationCreateOrConnectWithoutPartsInputSchema).optional(),
  upsert: z.lazy(() => LocationUpsertWithoutPartsInputSchema).optional(),
  connect: z.lazy(() => LocationWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => LocationUpdateToOneWithWhereWithoutPartsInputSchema),z.lazy(() => LocationUpdateWithoutPartsInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutPartsInputSchema) ]).optional(),
}).strict();

export const PartCreateNestedOneWithoutVendorsInputSchema: z.ZodType<Prisma.PartCreateNestedOneWithoutVendorsInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutVendorsInputSchema),z.lazy(() => PartUncheckedCreateWithoutVendorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartCreateOrConnectWithoutVendorsInputSchema).optional(),
  connect: z.lazy(() => PartWhereUniqueInputSchema).optional()
}).strict();

export const VendorCreateNestedOneWithoutPartsInputSchema: z.ZodType<Prisma.VendorCreateNestedOneWithoutPartsInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutPartsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutPartsInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional()
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const PartUpdateOneRequiredWithoutVendorsNestedInputSchema: z.ZodType<Prisma.PartUpdateOneRequiredWithoutVendorsNestedInput> = z.object({
  create: z.union([ z.lazy(() => PartCreateWithoutVendorsInputSchema),z.lazy(() => PartUncheckedCreateWithoutVendorsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => PartCreateOrConnectWithoutVendorsInputSchema).optional(),
  upsert: z.lazy(() => PartUpsertWithoutVendorsInputSchema).optional(),
  connect: z.lazy(() => PartWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => PartUpdateToOneWithWhereWithoutVendorsInputSchema),z.lazy(() => PartUpdateWithoutVendorsInputSchema),z.lazy(() => PartUncheckedUpdateWithoutVendorsInputSchema) ]).optional(),
}).strict();

export const VendorUpdateOneRequiredWithoutPartsNestedInputSchema: z.ZodType<Prisma.VendorUpdateOneRequiredWithoutPartsNestedInput> = z.object({
  create: z.union([ z.lazy(() => VendorCreateWithoutPartsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutPartsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => VendorCreateOrConnectWithoutPartsInputSchema).optional(),
  upsert: z.lazy(() => VendorUpsertWithoutPartsInputSchema).optional(),
  connect: z.lazy(() => VendorWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => VendorUpdateToOneWithWhereWithoutPartsInputSchema),z.lazy(() => VendorUpdateWithoutPartsInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutPartsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
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
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.coerce.date().array().optional(),
  notIn: z.coerce.date().array().optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedEnumRoleFilterSchema: z.ZodType<Prisma.NestedEnumRoleFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleFilterSchema) ]).optional(),
}).strict();

export const NestedEnumRoleWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumRoleWithAggregatesFilter> = z.object({
  equals: z.lazy(() => RoleSchema).optional(),
  in: z.lazy(() => RoleSchema).array().optional(),
  notIn: z.lazy(() => RoleSchema).array().optional(),
  not: z.union([ z.lazy(() => RoleSchema),z.lazy(() => NestedEnumRoleWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumRoleFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumRoleFilterSchema).optional()
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedJsonNullableFilterSchema: z.ZodType<Prisma.NestedJsonNullableFilter> = z.object({
  equals: InputJsonValueSchema.optional(),
  path: z.string().array().optional(),
  string_contains: z.string().optional(),
  string_starts_with: z.string().optional(),
  string_ends_with: z.string().optional(),
  array_contains: InputJsonValueSchema.optional().nullable(),
  array_starts_with: InputJsonValueSchema.optional().nullable(),
  array_ends_with: InputJsonValueSchema.optional().nullable(),
  lt: InputJsonValueSchema.optional(),
  lte: InputJsonValueSchema.optional(),
  gt: InputJsonValueSchema.optional(),
  gte: InputJsonValueSchema.optional(),
  not: InputJsonValueSchema.optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutAccountsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema) ]),
}).strict();

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutSessionsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema) ]),
}).strict();

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> = z.object({
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
}).strict();

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> = z.object({
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
}).strict();

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => AccountCreateManyUserInputSchema),z.lazy(() => AccountCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => SessionCreateManyUserInputSchema),z.lazy(() => SessionCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CompanyUserCreateWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  company: z.lazy(() => CompanyCreateNestedOneWithoutUsersInputSchema)
}).strict();

export const CompanyUserUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserUncheckedCreateWithoutUserInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  companyId: z.string()
}).strict();

export const CompanyUserCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutUserInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CompanyUserCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.CompanyUserCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CompanyUserCreateManyUserInputSchema),z.lazy(() => CompanyUserCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PartCreateWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartCreateWithoutCreationAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  updateAuthor: z.lazy(() => UserCreateNestedOneWithoutUpdatedPartsInputSchema),
  deletionAuthor: z.lazy(() => UserCreateNestedOneWithoutDeletedPartsInputSchema)
}).strict();

export const PartUncheckedCreateWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartUncheckedCreateWithoutCreationAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  updatedBy: z.string(),
  deletedBy: z.string(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional()
}).strict();

export const PartCreateOrConnectWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartCreateOrConnectWithoutCreationAuthorInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PartCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema) ]),
}).strict();

export const PartCreateManyCreationAuthorInputEnvelopeSchema: z.ZodType<Prisma.PartCreateManyCreationAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PartCreateManyCreationAuthorInputSchema),z.lazy(() => PartCreateManyCreationAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PartCreateWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartCreateWithoutUpdateAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  creationAuthor: z.lazy(() => UserCreateNestedOneWithoutCreatedPartsInputSchema),
  deletionAuthor: z.lazy(() => UserCreateNestedOneWithoutDeletedPartsInputSchema)
}).strict();

export const PartUncheckedCreateWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartUncheckedCreateWithoutUpdateAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  createdBy: z.string(),
  deletedBy: z.string(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional()
}).strict();

export const PartCreateOrConnectWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartCreateOrConnectWithoutUpdateAuthorInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema) ]),
}).strict();

export const PartCreateManyUpdateAuthorInputEnvelopeSchema: z.ZodType<Prisma.PartCreateManyUpdateAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PartCreateManyUpdateAuthorInputSchema),z.lazy(() => PartCreateManyUpdateAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const PartCreateWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartCreateWithoutDeletionAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  creationAuthor: z.lazy(() => UserCreateNestedOneWithoutCreatedPartsInputSchema),
  updateAuthor: z.lazy(() => UserCreateNestedOneWithoutUpdatedPartsInputSchema)
}).strict();

export const PartUncheckedCreateWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartUncheckedCreateWithoutDeletionAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  createdBy: z.string(),
  updatedBy: z.string(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional()
}).strict();

export const PartCreateOrConnectWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartCreateOrConnectWithoutDeletionAuthorInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema) ]),
}).strict();

export const PartCreateManyDeletionAuthorInputEnvelopeSchema: z.ZodType<Prisma.PartCreateManyDeletionAuthorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => PartCreateManyDeletionAuthorInputSchema),z.lazy(() => PartCreateManyDeletionAuthorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => AccountCreateWithoutUserInputSchema),z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => AccountWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateWithoutUserInputSchema),z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => AccountScalarWhereInputSchema),
  data: z.union([ z.lazy(() => AccountUpdateManyMutationInputSchema),z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => AccountScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => AccountScalarWhereInputSchema),z.lazy(() => AccountScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  type: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  provider: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  providerAccountId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  refresh_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  access_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  expires_at: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  token_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  scope: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  id_token: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  session_state: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => SessionCreateWithoutUserInputSchema),z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => SessionWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateWithoutUserInputSchema),z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => SessionScalarWhereInputSchema),
  data: z.union([ z.lazy(() => SessionUpdateManyMutationInputSchema),z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => SessionScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => SessionScalarWhereInputSchema),z.lazy(() => SessionScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  sessionToken: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expires: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const CompanyUserUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompanyUserUpdateWithoutUserInputSchema),z.lazy(() => CompanyUserUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutUserInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const CompanyUserUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompanyUserUpdateWithoutUserInputSchema),z.lazy(() => CompanyUserUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const CompanyUserUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => CompanyUserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompanyUserUpdateManyMutationInputSchema),z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const CompanyUserScalarWhereInputSchema: z.ZodType<Prisma.CompanyUserScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CompanyUserScalarWhereInputSchema),z.lazy(() => CompanyUserScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CompanyUserScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CompanyUserScalarWhereInputSchema),z.lazy(() => CompanyUserScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  role: z.union([ z.lazy(() => EnumRoleFilterSchema),z.lazy(() => RoleSchema) ]).optional(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PartUpsertWithWhereUniqueWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartUpsertWithWhereUniqueWithoutCreationAuthorInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PartUpdateWithoutCreationAuthorInputSchema),z.lazy(() => PartUncheckedUpdateWithoutCreationAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PartCreateWithoutCreationAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutCreationAuthorInputSchema) ]),
}).strict();

export const PartUpdateWithWhereUniqueWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartUpdateWithWhereUniqueWithoutCreationAuthorInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PartUpdateWithoutCreationAuthorInputSchema),z.lazy(() => PartUncheckedUpdateWithoutCreationAuthorInputSchema) ]),
}).strict();

export const PartUpdateManyWithWhereWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartUpdateManyWithWhereWithoutCreationAuthorInput> = z.object({
  where: z.lazy(() => PartScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PartUpdateManyMutationInputSchema),z.lazy(() => PartUncheckedUpdateManyWithoutCreationAuthorInputSchema) ]),
}).strict();

export const PartScalarWhereInputSchema: z.ZodType<Prisma.PartScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => PartScalarWhereInputSchema),z.lazy(() => PartScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => PartScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => PartScalarWhereInputSchema),z.lazy(() => PartScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  number: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  criticalQty: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  upc: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  description: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  extendedPartData: z.lazy(() => JsonNullableFilterSchema).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  deletedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  createdBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  updatedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  deletedBy: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const PartUpsertWithWhereUniqueWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartUpsertWithWhereUniqueWithoutUpdateAuthorInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PartUpdateWithoutUpdateAuthorInputSchema),z.lazy(() => PartUncheckedUpdateWithoutUpdateAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PartCreateWithoutUpdateAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutUpdateAuthorInputSchema) ]),
}).strict();

export const PartUpdateWithWhereUniqueWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartUpdateWithWhereUniqueWithoutUpdateAuthorInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PartUpdateWithoutUpdateAuthorInputSchema),z.lazy(() => PartUncheckedUpdateWithoutUpdateAuthorInputSchema) ]),
}).strict();

export const PartUpdateManyWithWhereWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartUpdateManyWithWhereWithoutUpdateAuthorInput> = z.object({
  where: z.lazy(() => PartScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PartUpdateManyMutationInputSchema),z.lazy(() => PartUncheckedUpdateManyWithoutUpdateAuthorInputSchema) ]),
}).strict();

export const PartUpsertWithWhereUniqueWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartUpsertWithWhereUniqueWithoutDeletionAuthorInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => PartUpdateWithoutDeletionAuthorInputSchema),z.lazy(() => PartUncheckedUpdateWithoutDeletionAuthorInputSchema) ]),
  create: z.union([ z.lazy(() => PartCreateWithoutDeletionAuthorInputSchema),z.lazy(() => PartUncheckedCreateWithoutDeletionAuthorInputSchema) ]),
}).strict();

export const PartUpdateWithWhereUniqueWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartUpdateWithWhereUniqueWithoutDeletionAuthorInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => PartUpdateWithoutDeletionAuthorInputSchema),z.lazy(() => PartUncheckedUpdateWithoutDeletionAuthorInputSchema) ]),
}).strict();

export const PartUpdateManyWithWhereWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartUpdateManyWithWhereWithoutDeletionAuthorInput> = z.object({
  where: z.lazy(() => PartScalarWhereInputSchema),
  data: z.union([ z.lazy(() => PartUpdateManyMutationInputSchema),z.lazy(() => PartUncheckedUpdateManyWithoutDeletionAuthorInputSchema) ]),
}).strict();

export const CompanyCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  clients: z.lazy(() => ClientCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  clients: z.lazy(() => ClientUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutUsersInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutUsersInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]),
}).strict();

export const UserCreateWithoutCompanyUsersInputSchema: z.ZodType<Prisma.UserCreateWithoutCompanyUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCompanyUsersInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCompanyUsersInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCompanyUsersInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCompanyUsersInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyUsersInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyUsersInputSchema) ]),
}).strict();

export const CompanyUpsertWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutUsersInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutUsersInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutUsersInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutUsersInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutUsersInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  clients: z.lazy(() => ClientUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutUsersInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  clients: z.lazy(() => ClientUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutCompanyUsersInputSchema: z.ZodType<Prisma.UserUpsertWithoutCompanyUsersInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCompanyUsersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompanyUsersInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCompanyUsersInputSchema),z.lazy(() => UserUncheckedCreateWithoutCompanyUsersInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCompanyUsersInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCompanyUsersInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCompanyUsersInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCompanyUsersInputSchema) ]),
}).strict();

export const UserUpdateWithoutCompanyUsersInputSchema: z.ZodType<Prisma.UserUpdateWithoutCompanyUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCompanyUsersInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCompanyUsersInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const CompanyCreateWithoutClientsInputSchema: z.ZodType<Prisma.CompanyCreateWithoutClientsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  users: z.lazy(() => CompanyUserCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyUncheckedCreateWithoutClientsInputSchema: z.ZodType<Prisma.CompanyUncheckedCreateWithoutClientsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string().optional().nullable(),
  isAdmin: z.boolean().optional(),
  users: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutCompanyInputSchema).optional()
}).strict();

export const CompanyCreateOrConnectWithoutClientsInputSchema: z.ZodType<Prisma.CompanyCreateOrConnectWithoutClientsInput> = z.object({
  where: z.lazy(() => CompanyWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyCreateWithoutClientsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutClientsInputSchema) ]),
}).strict();

export const CompanyUpsertWithoutClientsInputSchema: z.ZodType<Prisma.CompanyUpsertWithoutClientsInput> = z.object({
  update: z.union([ z.lazy(() => CompanyUpdateWithoutClientsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutClientsInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyCreateWithoutClientsInputSchema),z.lazy(() => CompanyUncheckedCreateWithoutClientsInputSchema) ]),
  where: z.lazy(() => CompanyWhereInputSchema).optional()
}).strict();

export const CompanyUpdateToOneWithWhereWithoutClientsInputSchema: z.ZodType<Prisma.CompanyUpdateToOneWithWhereWithoutClientsInput> = z.object({
  where: z.lazy(() => CompanyWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CompanyUpdateWithoutClientsInputSchema),z.lazy(() => CompanyUncheckedUpdateWithoutClientsInputSchema) ]),
}).strict();

export const CompanyUpdateWithoutClientsInputSchema: z.ZodType<Prisma.CompanyUpdateWithoutClientsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => CompanyUserUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const CompanyUncheckedUpdateWithoutClientsInputSchema: z.ZodType<Prisma.CompanyUncheckedUpdateWithoutClientsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  isAdmin: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  users: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutCompanyNestedInputSchema).optional()
}).strict();

export const ClientCreateWithoutCompanyInputSchema: z.ZodType<Prisma.ClientCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),
  avatar: z.string().optional().nullable()
}).strict();

export const ClientUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.ClientUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),
  avatar: z.string().optional().nullable()
}).strict();

export const ClientCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.ClientCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ClientCreateWithoutCompanyInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const ClientCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.ClientCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ClientCreateManyCompanyInputSchema),z.lazy(() => ClientCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CompanyUserCreateWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutCompanyUsersInputSchema)
}).strict();

export const CompanyUserUncheckedCreateWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserUncheckedCreateWithoutCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  userId: z.string()
}).strict();

export const CompanyUserCreateOrConnectWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserCreateOrConnectWithoutCompanyInput> = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const CompanyUserCreateManyCompanyInputEnvelopeSchema: z.ZodType<Prisma.CompanyUserCreateManyCompanyInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CompanyUserCreateManyCompanyInputSchema),z.lazy(() => CompanyUserCreateManyCompanyInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ClientUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.ClientUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ClientUpdateWithoutCompanyInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => ClientCreateWithoutCompanyInputSchema),z.lazy(() => ClientUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const ClientUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.ClientUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => ClientWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ClientUpdateWithoutCompanyInputSchema),z.lazy(() => ClientUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const ClientUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.ClientUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => ClientScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ClientUpdateManyMutationInputSchema),z.lazy(() => ClientUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const ClientScalarWhereInputSchema: z.ZodType<Prisma.ClientScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ClientScalarWhereInputSchema),z.lazy(() => ClientScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ClientScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ClientScalarWhereInputSchema),z.lazy(() => ClientScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  email: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  phoneNumber: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  avatar: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  companyId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const CompanyUserUpsertWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserUpsertWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CompanyUserUpdateWithoutCompanyInputSchema),z.lazy(() => CompanyUserUncheckedUpdateWithoutCompanyInputSchema) ]),
  create: z.union([ z.lazy(() => CompanyUserCreateWithoutCompanyInputSchema),z.lazy(() => CompanyUserUncheckedCreateWithoutCompanyInputSchema) ]),
}).strict();

export const CompanyUserUpdateWithWhereUniqueWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserUpdateWithWhereUniqueWithoutCompanyInput> = z.object({
  where: z.lazy(() => CompanyUserWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CompanyUserUpdateWithoutCompanyInputSchema),z.lazy(() => CompanyUserUncheckedUpdateWithoutCompanyInputSchema) ]),
}).strict();

export const CompanyUserUpdateManyWithWhereWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserUpdateManyWithWhereWithoutCompanyInput> = z.object({
  where: z.lazy(() => CompanyUserScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CompanyUserUpdateManyMutationInputSchema),z.lazy(() => CompanyUserUncheckedUpdateManyWithoutCompanyInputSchema) ]),
}).strict();

export const CategoriesOnPartsCreateWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateWithoutPartInput> = z.object({
  category: z.lazy(() => CategoryCreateNestedOneWithoutPartsInputSchema)
}).strict();

export const CategoriesOnPartsUncheckedCreateWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedCreateWithoutPartInput> = z.object({
  categoryId: z.number().int()
}).strict();

export const CategoriesOnPartsCreateOrConnectWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateOrConnectWithoutPartInput> = z.object({
  where: z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema) ]),
}).strict();

export const CategoriesOnPartsCreateManyPartInputEnvelopeSchema: z.ZodType<Prisma.CategoriesOnPartsCreateManyPartInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CategoriesOnPartsCreateManyPartInputSchema),z.lazy(() => CategoriesOnPartsCreateManyPartInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LocationsOnPartsCreateWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateWithoutPartInput> = z.object({
  quantity: z.number().int(),
  unit: z.string(),
  Location: z.lazy(() => LocationCreateNestedOneWithoutPartsInputSchema)
}).strict();

export const LocationsOnPartsUncheckedCreateWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedCreateWithoutPartInput> = z.object({
  locationId: z.number().int(),
  quantity: z.number().int(),
  unit: z.string()
}).strict();

export const LocationsOnPartsCreateOrConnectWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateOrConnectWithoutPartInput> = z.object({
  where: z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema) ]),
}).strict();

export const LocationsOnPartsCreateManyPartInputEnvelopeSchema: z.ZodType<Prisma.LocationsOnPartsCreateManyPartInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LocationsOnPartsCreateManyPartInputSchema),z.lazy(() => LocationsOnPartsCreateManyPartInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VendorOnPartsCreateWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsCreateWithoutPartInput> = z.object({
  cost: z.number(),
  vendor: z.lazy(() => VendorCreateNestedOneWithoutPartsInputSchema)
}).strict();

export const VendorOnPartsUncheckedCreateWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedCreateWithoutPartInput> = z.object({
  vendorId: z.number().int(),
  cost: z.number()
}).strict();

export const VendorOnPartsCreateOrConnectWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsCreateOrConnectWithoutPartInput> = z.object({
  where: z.lazy(() => VendorOnPartsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema) ]),
}).strict();

export const VendorOnPartsCreateManyPartInputEnvelopeSchema: z.ZodType<Prisma.VendorOnPartsCreateManyPartInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VendorOnPartsCreateManyPartInputSchema),z.lazy(() => VendorOnPartsCreateManyPartInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserCreateWithoutCreatedPartsInputSchema: z.ZodType<Prisma.UserCreateWithoutCreatedPartsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserCreateNestedManyWithoutUserInputSchema).optional(),
  updatedParts: z.lazy(() => PartCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutCreatedPartsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutCreatedPartsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutUpdateAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutCreatedPartsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCreatedPartsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedPartsInputSchema) ]),
}).strict();

export const UserCreateWithoutUpdatedPartsInputSchema: z.ZodType<Prisma.UserCreateWithoutUpdatedPartsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUpdatedPartsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUpdatedPartsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutDeletionAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUpdatedPartsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUpdatedPartsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUpdatedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUpdatedPartsInputSchema) ]),
}).strict();

export const UserCreateWithoutDeletedPartsInputSchema: z.ZodType<Prisma.UserCreateWithoutDeletedPartsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartCreateNestedManyWithoutUpdateAuthorInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutDeletedPartsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutDeletedPartsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  emailVerified: z.coerce.date().optional().nullable(),
  image: z.string().optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutCreationAuthorInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedCreateNestedManyWithoutUpdateAuthorInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutDeletedPartsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutDeletedPartsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutDeletedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutDeletedPartsInputSchema) ]),
}).strict();

export const CategoriesOnPartsUpsertWithWhereUniqueWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpsertWithWhereUniqueWithoutPartInput> = z.object({
  where: z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CategoriesOnPartsUpdateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUncheckedUpdateWithoutPartInputSchema) ]),
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutPartInputSchema) ]),
}).strict();

export const CategoriesOnPartsUpdateWithWhereUniqueWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateWithWhereUniqueWithoutPartInput> = z.object({
  where: z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CategoriesOnPartsUpdateWithoutPartInputSchema),z.lazy(() => CategoriesOnPartsUncheckedUpdateWithoutPartInputSchema) ]),
}).strict();

export const CategoriesOnPartsUpdateManyWithWhereWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateManyWithWhereWithoutPartInput> = z.object({
  where: z.lazy(() => CategoriesOnPartsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CategoriesOnPartsUpdateManyMutationInputSchema),z.lazy(() => CategoriesOnPartsUncheckedUpdateManyWithoutPartInputSchema) ]),
}).strict();

export const CategoriesOnPartsScalarWhereInputSchema: z.ZodType<Prisma.CategoriesOnPartsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => CategoriesOnPartsScalarWhereInputSchema),z.lazy(() => CategoriesOnPartsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => CategoriesOnPartsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => CategoriesOnPartsScalarWhereInputSchema),z.lazy(() => CategoriesOnPartsScalarWhereInputSchema).array() ]).optional(),
  partId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  categoryId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const LocationsOnPartsUpsertWithWhereUniqueWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsUpsertWithWhereUniqueWithoutPartInput> = z.object({
  where: z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LocationsOnPartsUpdateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUncheckedUpdateWithoutPartInputSchema) ]),
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutPartInputSchema) ]),
}).strict();

export const LocationsOnPartsUpdateWithWhereUniqueWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateWithWhereUniqueWithoutPartInput> = z.object({
  where: z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LocationsOnPartsUpdateWithoutPartInputSchema),z.lazy(() => LocationsOnPartsUncheckedUpdateWithoutPartInputSchema) ]),
}).strict();

export const LocationsOnPartsUpdateManyWithWhereWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateManyWithWhereWithoutPartInput> = z.object({
  where: z.lazy(() => LocationsOnPartsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LocationsOnPartsUpdateManyMutationInputSchema),z.lazy(() => LocationsOnPartsUncheckedUpdateManyWithoutPartInputSchema) ]),
}).strict();

export const LocationsOnPartsScalarWhereInputSchema: z.ZodType<Prisma.LocationsOnPartsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => LocationsOnPartsScalarWhereInputSchema),z.lazy(() => LocationsOnPartsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => LocationsOnPartsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => LocationsOnPartsScalarWhereInputSchema),z.lazy(() => LocationsOnPartsScalarWhereInputSchema).array() ]).optional(),
  partId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  locationId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  quantity: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  unit: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const VendorOnPartsUpsertWithWhereUniqueWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsUpsertWithWhereUniqueWithoutPartInput> = z.object({
  where: z.lazy(() => VendorOnPartsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VendorOnPartsUpdateWithoutPartInputSchema),z.lazy(() => VendorOnPartsUncheckedUpdateWithoutPartInputSchema) ]),
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutPartInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutPartInputSchema) ]),
}).strict();

export const VendorOnPartsUpdateWithWhereUniqueWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateWithWhereUniqueWithoutPartInput> = z.object({
  where: z.lazy(() => VendorOnPartsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VendorOnPartsUpdateWithoutPartInputSchema),z.lazy(() => VendorOnPartsUncheckedUpdateWithoutPartInputSchema) ]),
}).strict();

export const VendorOnPartsUpdateManyWithWhereWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateManyWithWhereWithoutPartInput> = z.object({
  where: z.lazy(() => VendorOnPartsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VendorOnPartsUpdateManyMutationInputSchema),z.lazy(() => VendorOnPartsUncheckedUpdateManyWithoutPartInputSchema) ]),
}).strict();

export const VendorOnPartsScalarWhereInputSchema: z.ZodType<Prisma.VendorOnPartsScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => VendorOnPartsScalarWhereInputSchema),z.lazy(() => VendorOnPartsScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => VendorOnPartsScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => VendorOnPartsScalarWhereInputSchema),z.lazy(() => VendorOnPartsScalarWhereInputSchema).array() ]).optional(),
  partId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  vendorId: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  cost: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
}).strict();

export const UserUpsertWithoutCreatedPartsInputSchema: z.ZodType<Prisma.UserUpsertWithoutCreatedPartsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutCreatedPartsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedPartsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutCreatedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutCreatedPartsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutCreatedPartsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutCreatedPartsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutCreatedPartsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutCreatedPartsInputSchema) ]),
}).strict();

export const UserUpdateWithoutCreatedPartsInputSchema: z.ZodType<Prisma.UserUpdateWithoutCreatedPartsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUpdateManyWithoutUserNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutCreatedPartsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutCreatedPartsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedUpdateManyWithoutUpdateAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutUpdatedPartsInputSchema: z.ZodType<Prisma.UserUpsertWithoutUpdatedPartsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUpdatedPartsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUpdatedPartsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUpdatedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUpdatedPartsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUpdatedPartsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUpdatedPartsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUpdatedPartsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUpdatedPartsInputSchema) ]),
}).strict();

export const UserUpdateWithoutUpdatedPartsInputSchema: z.ZodType<Prisma.UserUpdateWithoutUpdatedPartsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUpdatedPartsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUpdatedPartsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  deletedParts: z.lazy(() => PartUncheckedUpdateManyWithoutDeletionAuthorNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutDeletedPartsInputSchema: z.ZodType<Prisma.UserUpsertWithoutDeletedPartsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutDeletedPartsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDeletedPartsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutDeletedPartsInputSchema),z.lazy(() => UserUncheckedCreateWithoutDeletedPartsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutDeletedPartsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutDeletedPartsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutDeletedPartsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutDeletedPartsInputSchema) ]),
}).strict();

export const UserUpdateWithoutDeletedPartsInputSchema: z.ZodType<Prisma.UserUpdateWithoutDeletedPartsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUpdateManyWithoutUpdateAuthorNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutDeletedPartsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutDeletedPartsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  emailVerified: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  image: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accounts: z.lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  sessions: z.lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  companyUsers: z.lazy(() => CompanyUserUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  createdParts: z.lazy(() => PartUncheckedUpdateManyWithoutCreationAuthorNestedInputSchema).optional(),
  updatedParts: z.lazy(() => PartUncheckedUpdateManyWithoutUpdateAuthorNestedInputSchema).optional()
}).strict();

export const CategoriesOnPartsCreateWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateWithoutCategoryInput> = z.object({
  part: z.lazy(() => PartCreateNestedOneWithoutCategoriesInputSchema)
}).strict();

export const CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedCreateWithoutCategoryInput> = z.object({
  partId: z.string()
}).strict();

export const CategoriesOnPartsCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateOrConnectWithoutCategoryInput> = z.object({
  where: z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const CategoriesOnPartsCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.CategoriesOnPartsCreateManyCategoryInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => CategoriesOnPartsCreateManyCategoryInputSchema),z.lazy(() => CategoriesOnPartsCreateManyCategoryInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const CategoriesOnPartsUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpsertWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => CategoriesOnPartsUpdateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUncheckedUpdateWithoutCategoryInputSchema) ]),
  create: z.union([ z.lazy(() => CategoriesOnPartsCreateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUncheckedCreateWithoutCategoryInputSchema) ]),
}).strict();

export const CategoriesOnPartsUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateWithWhereUniqueWithoutCategoryInput> = z.object({
  where: z.lazy(() => CategoriesOnPartsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => CategoriesOnPartsUpdateWithoutCategoryInputSchema),z.lazy(() => CategoriesOnPartsUncheckedUpdateWithoutCategoryInputSchema) ]),
}).strict();

export const CategoriesOnPartsUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateManyWithWhereWithoutCategoryInput> = z.object({
  where: z.lazy(() => CategoriesOnPartsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => CategoriesOnPartsUpdateManyMutationInputSchema),z.lazy(() => CategoriesOnPartsUncheckedUpdateManyWithoutCategoryInputSchema) ]),
}).strict();

export const LocationsOnPartsCreateWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateWithoutLocationInput> = z.object({
  quantity: z.number().int(),
  unit: z.string(),
  part: z.lazy(() => PartCreateNestedOneWithoutLocationsInputSchema)
}).strict();

export const LocationsOnPartsUncheckedCreateWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedCreateWithoutLocationInput> = z.object({
  partId: z.string(),
  quantity: z.number().int(),
  unit: z.string()
}).strict();

export const LocationsOnPartsCreateOrConnectWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateOrConnectWithoutLocationInput> = z.object({
  where: z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const LocationsOnPartsCreateManyLocationInputEnvelopeSchema: z.ZodType<Prisma.LocationsOnPartsCreateManyLocationInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => LocationsOnPartsCreateManyLocationInputSchema),z.lazy(() => LocationsOnPartsCreateManyLocationInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const LocationsOnPartsUpsertWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsUpsertWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => LocationsOnPartsUpdateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUncheckedUpdateWithoutLocationInputSchema) ]),
  create: z.union([ z.lazy(() => LocationsOnPartsCreateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUncheckedCreateWithoutLocationInputSchema) ]),
}).strict();

export const LocationsOnPartsUpdateWithWhereUniqueWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateWithWhereUniqueWithoutLocationInput> = z.object({
  where: z.lazy(() => LocationsOnPartsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => LocationsOnPartsUpdateWithoutLocationInputSchema),z.lazy(() => LocationsOnPartsUncheckedUpdateWithoutLocationInputSchema) ]),
}).strict();

export const LocationsOnPartsUpdateManyWithWhereWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateManyWithWhereWithoutLocationInput> = z.object({
  where: z.lazy(() => LocationsOnPartsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => LocationsOnPartsUpdateManyMutationInputSchema),z.lazy(() => LocationsOnPartsUncheckedUpdateManyWithoutLocationInputSchema) ]),
}).strict();

export const VendorOnPartsCreateWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsCreateWithoutVendorInput> = z.object({
  cost: z.number(),
  part: z.lazy(() => PartCreateNestedOneWithoutVendorsInputSchema)
}).strict();

export const VendorOnPartsUncheckedCreateWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedCreateWithoutVendorInput> = z.object({
  partId: z.string(),
  cost: z.number()
}).strict();

export const VendorOnPartsCreateOrConnectWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsCreateOrConnectWithoutVendorInput> = z.object({
  where: z.lazy(() => VendorOnPartsWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export const VendorOnPartsCreateManyVendorInputEnvelopeSchema: z.ZodType<Prisma.VendorOnPartsCreateManyVendorInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => VendorOnPartsCreateManyVendorInputSchema),z.lazy(() => VendorOnPartsCreateManyVendorInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const VendorOnPartsUpsertWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsUpsertWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => VendorOnPartsWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => VendorOnPartsUpdateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUncheckedUpdateWithoutVendorInputSchema) ]),
  create: z.union([ z.lazy(() => VendorOnPartsCreateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUncheckedCreateWithoutVendorInputSchema) ]),
}).strict();

export const VendorOnPartsUpdateWithWhereUniqueWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateWithWhereUniqueWithoutVendorInput> = z.object({
  where: z.lazy(() => VendorOnPartsWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => VendorOnPartsUpdateWithoutVendorInputSchema),z.lazy(() => VendorOnPartsUncheckedUpdateWithoutVendorInputSchema) ]),
}).strict();

export const VendorOnPartsUpdateManyWithWhereWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateManyWithWhereWithoutVendorInput> = z.object({
  where: z.lazy(() => VendorOnPartsScalarWhereInputSchema),
  data: z.union([ z.lazy(() => VendorOnPartsUpdateManyMutationInputSchema),z.lazy(() => VendorOnPartsUncheckedUpdateManyWithoutVendorInputSchema) ]),
}).strict();

export const PartCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.PartCreateWithoutCategoriesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  locations: z.lazy(() => LocationsOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  creationAuthor: z.lazy(() => UserCreateNestedOneWithoutCreatedPartsInputSchema),
  updateAuthor: z.lazy(() => UserCreateNestedOneWithoutUpdatedPartsInputSchema),
  deletionAuthor: z.lazy(() => UserCreateNestedOneWithoutDeletedPartsInputSchema)
}).strict();

export const PartUncheckedCreateWithoutCategoriesInputSchema: z.ZodType<Prisma.PartUncheckedCreateWithoutCategoriesInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  createdBy: z.string(),
  updatedBy: z.string(),
  deletedBy: z.string(),
  locations: z.lazy(() => LocationsOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional()
}).strict();

export const PartCreateOrConnectWithoutCategoriesInputSchema: z.ZodType<Prisma.PartCreateOrConnectWithoutCategoriesInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PartCreateWithoutCategoriesInputSchema),z.lazy(() => PartUncheckedCreateWithoutCategoriesInputSchema) ]),
}).strict();

export const CategoryCreateWithoutPartsInputSchema: z.ZodType<Prisma.CategoryCreateWithoutPartsInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const CategoryUncheckedCreateWithoutPartsInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutPartsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const CategoryCreateOrConnectWithoutPartsInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutPartsInput> = z.object({
  where: z.lazy(() => CategoryWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => CategoryCreateWithoutPartsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutPartsInputSchema) ]),
}).strict();

export const PartUpsertWithoutCategoriesInputSchema: z.ZodType<Prisma.PartUpsertWithoutCategoriesInput> = z.object({
  update: z.union([ z.lazy(() => PartUpdateWithoutCategoriesInputSchema),z.lazy(() => PartUncheckedUpdateWithoutCategoriesInputSchema) ]),
  create: z.union([ z.lazy(() => PartCreateWithoutCategoriesInputSchema),z.lazy(() => PartUncheckedCreateWithoutCategoriesInputSchema) ]),
  where: z.lazy(() => PartWhereInputSchema).optional()
}).strict();

export const PartUpdateToOneWithWhereWithoutCategoriesInputSchema: z.ZodType<Prisma.PartUpdateToOneWithWhereWithoutCategoriesInput> = z.object({
  where: z.lazy(() => PartWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PartUpdateWithoutCategoriesInputSchema),z.lazy(() => PartUncheckedUpdateWithoutCategoriesInputSchema) ]),
}).strict();

export const PartUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.PartUpdateWithoutCategoriesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  locations: z.lazy(() => LocationsOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  creationAuthor: z.lazy(() => UserUpdateOneRequiredWithoutCreatedPartsNestedInputSchema).optional(),
  updateAuthor: z.lazy(() => UserUpdateOneRequiredWithoutUpdatedPartsNestedInputSchema).optional(),
  deletionAuthor: z.lazy(() => UserUpdateOneRequiredWithoutDeletedPartsNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateWithoutCategoriesInputSchema: z.ZodType<Prisma.PartUncheckedUpdateWithoutCategoriesInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional()
}).strict();

export const CategoryUpsertWithoutPartsInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutPartsInput> = z.object({
  update: z.union([ z.lazy(() => CategoryUpdateWithoutPartsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutPartsInputSchema) ]),
  create: z.union([ z.lazy(() => CategoryCreateWithoutPartsInputSchema),z.lazy(() => CategoryUncheckedCreateWithoutPartsInputSchema) ]),
  where: z.lazy(() => CategoryWhereInputSchema).optional()
}).strict();

export const CategoryUpdateToOneWithWhereWithoutPartsInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutPartsInput> = z.object({
  where: z.lazy(() => CategoryWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => CategoryUpdateWithoutPartsInputSchema),z.lazy(() => CategoryUncheckedUpdateWithoutPartsInputSchema) ]),
}).strict();

export const CategoryUpdateWithoutPartsInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutPartsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CategoryUncheckedUpdateWithoutPartsInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutPartsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PartCreateWithoutLocationsInputSchema: z.ZodType<Prisma.PartCreateWithoutLocationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  creationAuthor: z.lazy(() => UserCreateNestedOneWithoutCreatedPartsInputSchema),
  updateAuthor: z.lazy(() => UserCreateNestedOneWithoutUpdatedPartsInputSchema),
  deletionAuthor: z.lazy(() => UserCreateNestedOneWithoutDeletedPartsInputSchema)
}).strict();

export const PartUncheckedCreateWithoutLocationsInputSchema: z.ZodType<Prisma.PartUncheckedCreateWithoutLocationsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  createdBy: z.string(),
  updatedBy: z.string(),
  deletedBy: z.string(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional()
}).strict();

export const PartCreateOrConnectWithoutLocationsInputSchema: z.ZodType<Prisma.PartCreateOrConnectWithoutLocationsInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PartCreateWithoutLocationsInputSchema),z.lazy(() => PartUncheckedCreateWithoutLocationsInputSchema) ]),
}).strict();

export const LocationCreateWithoutPartsInputSchema: z.ZodType<Prisma.LocationCreateWithoutPartsInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const LocationUncheckedCreateWithoutPartsInputSchema: z.ZodType<Prisma.LocationUncheckedCreateWithoutPartsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const LocationCreateOrConnectWithoutPartsInputSchema: z.ZodType<Prisma.LocationCreateOrConnectWithoutPartsInput> = z.object({
  where: z.lazy(() => LocationWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => LocationCreateWithoutPartsInputSchema),z.lazy(() => LocationUncheckedCreateWithoutPartsInputSchema) ]),
}).strict();

export const PartUpsertWithoutLocationsInputSchema: z.ZodType<Prisma.PartUpsertWithoutLocationsInput> = z.object({
  update: z.union([ z.lazy(() => PartUpdateWithoutLocationsInputSchema),z.lazy(() => PartUncheckedUpdateWithoutLocationsInputSchema) ]),
  create: z.union([ z.lazy(() => PartCreateWithoutLocationsInputSchema),z.lazy(() => PartUncheckedCreateWithoutLocationsInputSchema) ]),
  where: z.lazy(() => PartWhereInputSchema).optional()
}).strict();

export const PartUpdateToOneWithWhereWithoutLocationsInputSchema: z.ZodType<Prisma.PartUpdateToOneWithWhereWithoutLocationsInput> = z.object({
  where: z.lazy(() => PartWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PartUpdateWithoutLocationsInputSchema),z.lazy(() => PartUncheckedUpdateWithoutLocationsInputSchema) ]),
}).strict();

export const PartUpdateWithoutLocationsInputSchema: z.ZodType<Prisma.PartUpdateWithoutLocationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  creationAuthor: z.lazy(() => UserUpdateOneRequiredWithoutCreatedPartsNestedInputSchema).optional(),
  updateAuthor: z.lazy(() => UserUpdateOneRequiredWithoutUpdatedPartsNestedInputSchema).optional(),
  deletionAuthor: z.lazy(() => UserUpdateOneRequiredWithoutDeletedPartsNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateWithoutLocationsInputSchema: z.ZodType<Prisma.PartUncheckedUpdateWithoutLocationsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional()
}).strict();

export const LocationUpsertWithoutPartsInputSchema: z.ZodType<Prisma.LocationUpsertWithoutPartsInput> = z.object({
  update: z.union([ z.lazy(() => LocationUpdateWithoutPartsInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutPartsInputSchema) ]),
  create: z.union([ z.lazy(() => LocationCreateWithoutPartsInputSchema),z.lazy(() => LocationUncheckedCreateWithoutPartsInputSchema) ]),
  where: z.lazy(() => LocationWhereInputSchema).optional()
}).strict();

export const LocationUpdateToOneWithWhereWithoutPartsInputSchema: z.ZodType<Prisma.LocationUpdateToOneWithWhereWithoutPartsInput> = z.object({
  where: z.lazy(() => LocationWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => LocationUpdateWithoutPartsInputSchema),z.lazy(() => LocationUncheckedUpdateWithoutPartsInputSchema) ]),
}).strict();

export const LocationUpdateWithoutPartsInputSchema: z.ZodType<Prisma.LocationUpdateWithoutPartsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const LocationUncheckedUpdateWithoutPartsInputSchema: z.ZodType<Prisma.LocationUncheckedUpdateWithoutPartsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const PartCreateWithoutVendorsInputSchema: z.ZodType<Prisma.PartCreateWithoutVendorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsCreateNestedManyWithoutPartInputSchema).optional(),
  creationAuthor: z.lazy(() => UserCreateNestedOneWithoutCreatedPartsInputSchema),
  updateAuthor: z.lazy(() => UserCreateNestedOneWithoutUpdatedPartsInputSchema),
  deletionAuthor: z.lazy(() => UserCreateNestedOneWithoutDeletedPartsInputSchema)
}).strict();

export const PartUncheckedCreateWithoutVendorsInputSchema: z.ZodType<Prisma.PartUncheckedCreateWithoutVendorsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  createdBy: z.string(),
  updatedBy: z.string(),
  deletedBy: z.string(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedCreateNestedManyWithoutPartInputSchema).optional()
}).strict();

export const PartCreateOrConnectWithoutVendorsInputSchema: z.ZodType<Prisma.PartCreateOrConnectWithoutVendorsInput> = z.object({
  where: z.lazy(() => PartWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => PartCreateWithoutVendorsInputSchema),z.lazy(() => PartUncheckedCreateWithoutVendorsInputSchema) ]),
}).strict();

export const VendorCreateWithoutPartsInputSchema: z.ZodType<Prisma.VendorCreateWithoutPartsInput> = z.object({
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const VendorUncheckedCreateWithoutPartsInputSchema: z.ZodType<Prisma.VendorUncheckedCreateWithoutPartsInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable()
}).strict();

export const VendorCreateOrConnectWithoutPartsInputSchema: z.ZodType<Prisma.VendorCreateOrConnectWithoutPartsInput> = z.object({
  where: z.lazy(() => VendorWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => VendorCreateWithoutPartsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutPartsInputSchema) ]),
}).strict();

export const PartUpsertWithoutVendorsInputSchema: z.ZodType<Prisma.PartUpsertWithoutVendorsInput> = z.object({
  update: z.union([ z.lazy(() => PartUpdateWithoutVendorsInputSchema),z.lazy(() => PartUncheckedUpdateWithoutVendorsInputSchema) ]),
  create: z.union([ z.lazy(() => PartCreateWithoutVendorsInputSchema),z.lazy(() => PartUncheckedCreateWithoutVendorsInputSchema) ]),
  where: z.lazy(() => PartWhereInputSchema).optional()
}).strict();

export const PartUpdateToOneWithWhereWithoutVendorsInputSchema: z.ZodType<Prisma.PartUpdateToOneWithWhereWithoutVendorsInput> = z.object({
  where: z.lazy(() => PartWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => PartUpdateWithoutVendorsInputSchema),z.lazy(() => PartUncheckedUpdateWithoutVendorsInputSchema) ]),
}).strict();

export const PartUpdateWithoutVendorsInputSchema: z.ZodType<Prisma.PartUpdateWithoutVendorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  creationAuthor: z.lazy(() => UserUpdateOneRequiredWithoutCreatedPartsNestedInputSchema).optional(),
  updateAuthor: z.lazy(() => UserUpdateOneRequiredWithoutUpdatedPartsNestedInputSchema).optional(),
  deletionAuthor: z.lazy(() => UserUpdateOneRequiredWithoutDeletedPartsNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateWithoutVendorsInputSchema: z.ZodType<Prisma.PartUncheckedUpdateWithoutVendorsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional()
}).strict();

export const VendorUpsertWithoutPartsInputSchema: z.ZodType<Prisma.VendorUpsertWithoutPartsInput> = z.object({
  update: z.union([ z.lazy(() => VendorUpdateWithoutPartsInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutPartsInputSchema) ]),
  create: z.union([ z.lazy(() => VendorCreateWithoutPartsInputSchema),z.lazy(() => VendorUncheckedCreateWithoutPartsInputSchema) ]),
  where: z.lazy(() => VendorWhereInputSchema).optional()
}).strict();

export const VendorUpdateToOneWithWhereWithoutPartsInputSchema: z.ZodType<Prisma.VendorUpdateToOneWithWhereWithoutPartsInput> = z.object({
  where: z.lazy(() => VendorWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => VendorUpdateWithoutPartsInputSchema),z.lazy(() => VendorUncheckedUpdateWithoutPartsInputSchema) ]),
}).strict();

export const VendorUpdateWithoutPartsInputSchema: z.ZodType<Prisma.VendorUpdateWithoutPartsInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const VendorUncheckedUpdateWithoutPartsInputSchema: z.ZodType<Prisma.VendorUncheckedUpdateWithoutPartsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> = z.object({
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
}).strict();

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  sessionToken: z.string(),
  expires: z.coerce.date()
}).strict();

export const CompanyUserCreateManyUserInputSchema: z.ZodType<Prisma.CompanyUserCreateManyUserInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  companyId: z.string()
}).strict();

export const PartCreateManyCreationAuthorInputSchema: z.ZodType<Prisma.PartCreateManyCreationAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  updatedBy: z.string(),
  deletedBy: z.string()
}).strict();

export const PartCreateManyUpdateAuthorInputSchema: z.ZodType<Prisma.PartCreateManyUpdateAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  createdBy: z.string(),
  deletedBy: z.string()
}).strict();

export const PartCreateManyDeletionAuthorInputSchema: z.ZodType<Prisma.PartCreateManyDeletionAuthorInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  number: z.number().int(),
  criticalQty: z.number().int(),
  upc: z.number().int(),
  description: z.string(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional().nullable(),
  createdBy: z.string(),
  updatedBy: z.string()
}).strict();

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  type: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  provider: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  providerAccountId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  refresh_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  access_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  expires_at: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  token_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  scope: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  id_token: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  session_state: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  sessionToken: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expires: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUserUpdateWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  company: z.lazy(() => CompanyUpdateOneRequiredWithoutUsersNestedInputSchema).optional()
}).strict();

export const CompanyUserUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUserUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.CompanyUserUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  companyId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PartUpdateWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartUpdateWithoutCreationAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  updateAuthor: z.lazy(() => UserUpdateOneRequiredWithoutUpdatedPartsNestedInputSchema).optional(),
  deletionAuthor: z.lazy(() => UserUpdateOneRequiredWithoutDeletedPartsNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartUncheckedUpdateWithoutCreationAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateManyWithoutCreationAuthorInputSchema: z.ZodType<Prisma.PartUncheckedUpdateManyWithoutCreationAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PartUpdateWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartUpdateWithoutUpdateAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  creationAuthor: z.lazy(() => UserUpdateOneRequiredWithoutCreatedPartsNestedInputSchema).optional(),
  deletionAuthor: z.lazy(() => UserUpdateOneRequiredWithoutDeletedPartsNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartUncheckedUpdateWithoutUpdateAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateManyWithoutUpdateAuthorInputSchema: z.ZodType<Prisma.PartUncheckedUpdateManyWithoutUpdateAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  deletedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const PartUpdateWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartUpdateWithoutDeletionAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  categories: z.lazy(() => CategoriesOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUpdateManyWithoutPartNestedInputSchema).optional(),
  creationAuthor: z.lazy(() => UserUpdateOneRequiredWithoutCreatedPartsNestedInputSchema).optional(),
  updateAuthor: z.lazy(() => UserUpdateOneRequiredWithoutUpdatedPartsNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartUncheckedUpdateWithoutDeletionAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  categories: z.lazy(() => CategoriesOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  locations: z.lazy(() => LocationsOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional(),
  vendors: z.lazy(() => VendorOnPartsUncheckedUpdateManyWithoutPartNestedInputSchema).optional()
}).strict();

export const PartUncheckedUpdateManyWithoutDeletionAuthorInputSchema: z.ZodType<Prisma.PartUncheckedUpdateManyWithoutDeletionAuthorInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  number: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  criticalQty: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  upc: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  description: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  extendedPartData: z.union([ z.lazy(() => NullableJsonNullValueInputSchema),InputJsonValueSchema ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  deletedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  updatedBy: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ClientCreateManyCompanyInputSchema: z.ZodType<Prisma.ClientCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  email: z.string(),
  phoneNumber: z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),
  avatar: z.string().optional().nullable()
}).strict();

export const CompanyUserCreateManyCompanyInputSchema: z.ZodType<Prisma.CompanyUserCreateManyCompanyInput> = z.object({
  id: z.string().cuid().optional(),
  role: z.lazy(() => RoleSchema).optional(),
  userId: z.string()
}).strict();

export const ClientUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.ClientUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ClientUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ClientUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.ClientUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  email: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  phoneNumber: z.union([ z.string().regex(new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/), { message:"Invalid Number!"}),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  avatar: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const CompanyUserUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutCompanyUsersNestedInputSchema).optional()
}).strict();

export const CompanyUserUncheckedUpdateWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserUncheckedUpdateWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CompanyUserUncheckedUpdateManyWithoutCompanyInputSchema: z.ZodType<Prisma.CompanyUserUncheckedUpdateManyWithoutCompanyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => RoleSchema),z.lazy(() => EnumRoleFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriesOnPartsCreateManyPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateManyPartInput> = z.object({
  categoryId: z.number().int()
}).strict();

export const LocationsOnPartsCreateManyPartInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateManyPartInput> = z.object({
  locationId: z.number().int(),
  quantity: z.number().int(),
  unit: z.string()
}).strict();

export const VendorOnPartsCreateManyPartInputSchema: z.ZodType<Prisma.VendorOnPartsCreateManyPartInput> = z.object({
  vendorId: z.number().int(),
  cost: z.number()
}).strict();

export const CategoriesOnPartsUpdateWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateWithoutPartInput> = z.object({
  category: z.lazy(() => CategoryUpdateOneRequiredWithoutPartsNestedInputSchema).optional()
}).strict();

export const CategoriesOnPartsUncheckedUpdateWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedUpdateWithoutPartInput> = z.object({
  categoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriesOnPartsUncheckedUpdateManyWithoutPartInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedUpdateManyWithoutPartInput> = z.object({
  categoryId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationsOnPartsUpdateWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateWithoutPartInput> = z.object({
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  Location: z.lazy(() => LocationUpdateOneRequiredWithoutPartsNestedInputSchema).optional()
}).strict();

export const LocationsOnPartsUncheckedUpdateWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedUpdateWithoutPartInput> = z.object({
  locationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationsOnPartsUncheckedUpdateManyWithoutPartInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedUpdateManyWithoutPartInput> = z.object({
  locationId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VendorOnPartsUpdateWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateWithoutPartInput> = z.object({
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  vendor: z.lazy(() => VendorUpdateOneRequiredWithoutPartsNestedInputSchema).optional()
}).strict();

export const VendorOnPartsUncheckedUpdateWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedUpdateWithoutPartInput> = z.object({
  vendorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VendorOnPartsUncheckedUpdateManyWithoutPartInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedUpdateManyWithoutPartInput> = z.object({
  vendorId: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriesOnPartsCreateManyCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsCreateManyCategoryInput> = z.object({
  partId: z.string()
}).strict();

export const CategoriesOnPartsUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateWithoutCategoryInput> = z.object({
  part: z.lazy(() => PartUpdateOneRequiredWithoutCategoriesNestedInputSchema).optional()
}).strict();

export const CategoriesOnPartsUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedUpdateWithoutCategoryInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const CategoriesOnPartsUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.CategoriesOnPartsUncheckedUpdateManyWithoutCategoryInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationsOnPartsCreateManyLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsCreateManyLocationInput> = z.object({
  partId: z.string(),
  quantity: z.number().int(),
  unit: z.string()
}).strict();

export const LocationsOnPartsUpdateWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsUpdateWithoutLocationInput> = z.object({
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.lazy(() => PartUpdateOneRequiredWithoutLocationsNestedInputSchema).optional()
}).strict();

export const LocationsOnPartsUncheckedUpdateWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedUpdateWithoutLocationInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const LocationsOnPartsUncheckedUpdateManyWithoutLocationInputSchema: z.ZodType<Prisma.LocationsOnPartsUncheckedUpdateManyWithoutLocationInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  quantity: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  unit: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VendorOnPartsCreateManyVendorInputSchema: z.ZodType<Prisma.VendorOnPartsCreateManyVendorInput> = z.object({
  partId: z.string(),
  cost: z.number()
}).strict();

export const VendorOnPartsUpdateWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsUpdateWithoutVendorInput> = z.object({
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  part: z.lazy(() => PartUpdateOneRequiredWithoutVendorsNestedInputSchema).optional()
}).strict();

export const VendorOnPartsUncheckedUpdateWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedUpdateWithoutVendorInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const VendorOnPartsUncheckedUpdateManyWithoutVendorInputSchema: z.ZodType<Prisma.VendorOnPartsUncheckedUpdateManyWithoutVendorInput> = z.object({
  partId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  cost: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ AccountScalarFieldEnumSchema,AccountScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithRelationInputSchema.array(),AccountOrderByWithRelationInputSchema ]).optional(),
  cursor: AccountWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
  orderBy: z.union([ AccountOrderByWithAggregationInputSchema.array(),AccountOrderByWithAggregationInputSchema ]).optional(),
  by: AccountScalarFieldEnumSchema.array(),
  having: AccountScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ SessionScalarFieldEnumSchema,SessionScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithRelationInputSchema.array(),SessionOrderByWithRelationInputSchema ]).optional(),
  cursor: SessionWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
  orderBy: z.union([ SessionOrderByWithAggregationInputSchema.array(),SessionOrderByWithAggregationInputSchema ]).optional(),
  by: SessionScalarFieldEnumSchema.array(),
  having: SessionScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindFirstArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindFirstOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenFindManyArgsSchema: z.ZodType<Prisma.VerificationTokenFindManyArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VerificationTokenScalarFieldEnumSchema,VerificationTokenScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VerificationTokenAggregateArgsSchema: z.ZodType<Prisma.VerificationTokenAggregateArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithRelationInputSchema.array(),VerificationTokenOrderByWithRelationInputSchema ]).optional(),
  cursor: VerificationTokenWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenGroupByArgsSchema: z.ZodType<Prisma.VerificationTokenGroupByArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
  orderBy: z.union([ VerificationTokenOrderByWithAggregationInputSchema.array(),VerificationTokenOrderByWithAggregationInputSchema ]).optional(),
  by: VerificationTokenScalarFieldEnumSchema.array(),
  having: VerificationTokenScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VerificationTokenFindUniqueArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationTokenFindUniqueOrThrowArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const CompanyUserFindFirstArgsSchema: z.ZodType<Prisma.CompanyUserFindFirstArgs> = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([ CompanyUserOrderByWithRelationInputSchema.array(),CompanyUserOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyUserScalarFieldEnumSchema,CompanyUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyUserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyUserFindFirstOrThrowArgs> = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([ CompanyUserOrderByWithRelationInputSchema.array(),CompanyUserOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyUserScalarFieldEnumSchema,CompanyUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyUserFindManyArgsSchema: z.ZodType<Prisma.CompanyUserFindManyArgs> = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([ CompanyUserOrderByWithRelationInputSchema.array(),CompanyUserOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyUserScalarFieldEnumSchema,CompanyUserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyUserAggregateArgsSchema: z.ZodType<Prisma.CompanyUserAggregateArgs> = z.object({
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([ CompanyUserOrderByWithRelationInputSchema.array(),CompanyUserOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyUserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyUserGroupByArgsSchema: z.ZodType<Prisma.CompanyUserGroupByArgs> = z.object({
  where: CompanyUserWhereInputSchema.optional(),
  orderBy: z.union([ CompanyUserOrderByWithAggregationInputSchema.array(),CompanyUserOrderByWithAggregationInputSchema ]).optional(),
  by: CompanyUserScalarFieldEnumSchema.array(),
  having: CompanyUserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyUserFindUniqueArgsSchema: z.ZodType<Prisma.CompanyUserFindUniqueArgs> = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereUniqueInputSchema,
}).strict() ;

export const CompanyUserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyUserFindUniqueOrThrowArgs> = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereUniqueInputSchema,
}).strict() ;

export const ClientFindFirstArgsSchema: z.ZodType<Prisma.ClientFindFirstArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ClientFindFirstOrThrowArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientFindManyArgsSchema: z.ZodType<Prisma.ClientFindManyArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ClientScalarFieldEnumSchema,ClientScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ClientAggregateArgsSchema: z.ZodType<Prisma.ClientAggregateArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithRelationInputSchema.array(),ClientOrderByWithRelationInputSchema ]).optional(),
  cursor: ClientWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClientGroupByArgsSchema: z.ZodType<Prisma.ClientGroupByArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
  orderBy: z.union([ ClientOrderByWithAggregationInputSchema.array(),ClientOrderByWithAggregationInputSchema ]).optional(),
  by: ClientScalarFieldEnumSchema.array(),
  having: ClientScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ClientFindUniqueArgsSchema: z.ZodType<Prisma.ClientFindUniqueArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ClientFindUniqueOrThrowArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const CompanyFindFirstArgsSchema: z.ZodType<Prisma.CompanyFindFirstArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindFirstOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyFindManyArgsSchema: z.ZodType<Prisma.CompanyFindManyArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CompanyScalarFieldEnumSchema,CompanyScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CompanyAggregateArgsSchema: z.ZodType<Prisma.CompanyAggregateArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithRelationInputSchema.array(),CompanyOrderByWithRelationInputSchema ]).optional(),
  cursor: CompanyWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyGroupByArgsSchema: z.ZodType<Prisma.CompanyGroupByArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
  orderBy: z.union([ CompanyOrderByWithAggregationInputSchema.array(),CompanyOrderByWithAggregationInputSchema ]).optional(),
  by: CompanyScalarFieldEnumSchema.array(),
  having: CompanyScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CompanyFindUniqueArgsSchema: z.ZodType<Prisma.CompanyFindUniqueArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CompanyFindUniqueOrThrowArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const PartFindFirstArgsSchema: z.ZodType<Prisma.PartFindFirstArgs> = z.object({
  select: PartSelectSchema.optional(),
  include: PartIncludeSchema.optional(),
  where: PartWhereInputSchema.optional(),
  orderBy: z.union([ PartOrderByWithRelationInputSchema.array(),PartOrderByWithRelationInputSchema ]).optional(),
  cursor: PartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PartScalarFieldEnumSchema,PartScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PartFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PartFindFirstOrThrowArgs> = z.object({
  select: PartSelectSchema.optional(),
  include: PartIncludeSchema.optional(),
  where: PartWhereInputSchema.optional(),
  orderBy: z.union([ PartOrderByWithRelationInputSchema.array(),PartOrderByWithRelationInputSchema ]).optional(),
  cursor: PartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PartScalarFieldEnumSchema,PartScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PartFindManyArgsSchema: z.ZodType<Prisma.PartFindManyArgs> = z.object({
  select: PartSelectSchema.optional(),
  include: PartIncludeSchema.optional(),
  where: PartWhereInputSchema.optional(),
  orderBy: z.union([ PartOrderByWithRelationInputSchema.array(),PartOrderByWithRelationInputSchema ]).optional(),
  cursor: PartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ PartScalarFieldEnumSchema,PartScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const PartAggregateArgsSchema: z.ZodType<Prisma.PartAggregateArgs> = z.object({
  where: PartWhereInputSchema.optional(),
  orderBy: z.union([ PartOrderByWithRelationInputSchema.array(),PartOrderByWithRelationInputSchema ]).optional(),
  cursor: PartWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PartGroupByArgsSchema: z.ZodType<Prisma.PartGroupByArgs> = z.object({
  where: PartWhereInputSchema.optional(),
  orderBy: z.union([ PartOrderByWithAggregationInputSchema.array(),PartOrderByWithAggregationInputSchema ]).optional(),
  by: PartScalarFieldEnumSchema.array(),
  having: PartScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const PartFindUniqueArgsSchema: z.ZodType<Prisma.PartFindUniqueArgs> = z.object({
  select: PartSelectSchema.optional(),
  include: PartIncludeSchema.optional(),
  where: PartWhereUniqueInputSchema,
}).strict() ;

export const PartFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PartFindUniqueOrThrowArgs> = z.object({
  select: PartSelectSchema.optional(),
  include: PartIncludeSchema.optional(),
  where: PartWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoryScalarFieldEnumSchema,CategoryScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithRelationInputSchema.array(),CategoryOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoryWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
  orderBy: z.union([ CategoryOrderByWithAggregationInputSchema.array(),CategoryOrderByWithAggregationInputSchema ]).optional(),
  by: CategoryScalarFieldEnumSchema.array(),
  having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const LocationFindFirstArgsSchema: z.ZodType<Prisma.LocationFindFirstArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationFindFirstOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationFindManyArgsSchema: z.ZodType<Prisma.LocationFindManyArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationScalarFieldEnumSchema,LocationScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationAggregateArgsSchema: z.ZodType<Prisma.LocationAggregateArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithRelationInputSchema.array(),LocationOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationGroupByArgsSchema: z.ZodType<Prisma.LocationGroupByArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
  orderBy: z.union([ LocationOrderByWithAggregationInputSchema.array(),LocationOrderByWithAggregationInputSchema ]).optional(),
  by: LocationScalarFieldEnumSchema.array(),
  having: LocationScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationFindUniqueArgsSchema: z.ZodType<Prisma.LocationFindUniqueArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationFindUniqueOrThrowArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const VendorFindFirstArgsSchema: z.ZodType<Prisma.VendorFindFirstArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithRelationInputSchema.array(),VendorOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VendorScalarFieldEnumSchema,VendorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VendorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VendorFindFirstOrThrowArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithRelationInputSchema.array(),VendorOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VendorScalarFieldEnumSchema,VendorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VendorFindManyArgsSchema: z.ZodType<Prisma.VendorFindManyArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithRelationInputSchema.array(),VendorOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VendorScalarFieldEnumSchema,VendorScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VendorAggregateArgsSchema: z.ZodType<Prisma.VendorAggregateArgs> = z.object({
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithRelationInputSchema.array(),VendorOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VendorGroupByArgsSchema: z.ZodType<Prisma.VendorGroupByArgs> = z.object({
  where: VendorWhereInputSchema.optional(),
  orderBy: z.union([ VendorOrderByWithAggregationInputSchema.array(),VendorOrderByWithAggregationInputSchema ]).optional(),
  by: VendorScalarFieldEnumSchema.array(),
  having: VendorScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VendorFindUniqueArgsSchema: z.ZodType<Prisma.VendorFindUniqueArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
}).strict() ;

export const VendorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VendorFindUniqueOrThrowArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
}).strict() ;

export const CategoriesOnPartsFindFirstArgsSchema: z.ZodType<Prisma.CategoriesOnPartsFindFirstArgs> = z.object({
  select: CategoriesOnPartsSelectSchema.optional(),
  include: CategoriesOnPartsIncludeSchema.optional(),
  where: CategoriesOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOnPartsOrderByWithRelationInputSchema.array(),CategoriesOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesOnPartsScalarFieldEnumSchema,CategoriesOnPartsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoriesOnPartsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoriesOnPartsFindFirstOrThrowArgs> = z.object({
  select: CategoriesOnPartsSelectSchema.optional(),
  include: CategoriesOnPartsIncludeSchema.optional(),
  where: CategoriesOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOnPartsOrderByWithRelationInputSchema.array(),CategoriesOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesOnPartsScalarFieldEnumSchema,CategoriesOnPartsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoriesOnPartsFindManyArgsSchema: z.ZodType<Prisma.CategoriesOnPartsFindManyArgs> = z.object({
  select: CategoriesOnPartsSelectSchema.optional(),
  include: CategoriesOnPartsIncludeSchema.optional(),
  where: CategoriesOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOnPartsOrderByWithRelationInputSchema.array(),CategoriesOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ CategoriesOnPartsScalarFieldEnumSchema,CategoriesOnPartsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const CategoriesOnPartsAggregateArgsSchema: z.ZodType<Prisma.CategoriesOnPartsAggregateArgs> = z.object({
  where: CategoriesOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOnPartsOrderByWithRelationInputSchema.array(),CategoriesOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: CategoriesOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoriesOnPartsGroupByArgsSchema: z.ZodType<Prisma.CategoriesOnPartsGroupByArgs> = z.object({
  where: CategoriesOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ CategoriesOnPartsOrderByWithAggregationInputSchema.array(),CategoriesOnPartsOrderByWithAggregationInputSchema ]).optional(),
  by: CategoriesOnPartsScalarFieldEnumSchema.array(),
  having: CategoriesOnPartsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const CategoriesOnPartsFindUniqueArgsSchema: z.ZodType<Prisma.CategoriesOnPartsFindUniqueArgs> = z.object({
  select: CategoriesOnPartsSelectSchema.optional(),
  include: CategoriesOnPartsIncludeSchema.optional(),
  where: CategoriesOnPartsWhereUniqueInputSchema,
}).strict() ;

export const CategoriesOnPartsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoriesOnPartsFindUniqueOrThrowArgs> = z.object({
  select: CategoriesOnPartsSelectSchema.optional(),
  include: CategoriesOnPartsIncludeSchema.optional(),
  where: CategoriesOnPartsWhereUniqueInputSchema,
}).strict() ;

export const LocationsOnPartsFindFirstArgsSchema: z.ZodType<Prisma.LocationsOnPartsFindFirstArgs> = z.object({
  select: LocationsOnPartsSelectSchema.optional(),
  include: LocationsOnPartsIncludeSchema.optional(),
  where: LocationsOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ LocationsOnPartsOrderByWithRelationInputSchema.array(),LocationsOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationsOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationsOnPartsScalarFieldEnumSchema,LocationsOnPartsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationsOnPartsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.LocationsOnPartsFindFirstOrThrowArgs> = z.object({
  select: LocationsOnPartsSelectSchema.optional(),
  include: LocationsOnPartsIncludeSchema.optional(),
  where: LocationsOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ LocationsOnPartsOrderByWithRelationInputSchema.array(),LocationsOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationsOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationsOnPartsScalarFieldEnumSchema,LocationsOnPartsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationsOnPartsFindManyArgsSchema: z.ZodType<Prisma.LocationsOnPartsFindManyArgs> = z.object({
  select: LocationsOnPartsSelectSchema.optional(),
  include: LocationsOnPartsIncludeSchema.optional(),
  where: LocationsOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ LocationsOnPartsOrderByWithRelationInputSchema.array(),LocationsOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationsOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ LocationsOnPartsScalarFieldEnumSchema,LocationsOnPartsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const LocationsOnPartsAggregateArgsSchema: z.ZodType<Prisma.LocationsOnPartsAggregateArgs> = z.object({
  where: LocationsOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ LocationsOnPartsOrderByWithRelationInputSchema.array(),LocationsOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: LocationsOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationsOnPartsGroupByArgsSchema: z.ZodType<Prisma.LocationsOnPartsGroupByArgs> = z.object({
  where: LocationsOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ LocationsOnPartsOrderByWithAggregationInputSchema.array(),LocationsOnPartsOrderByWithAggregationInputSchema ]).optional(),
  by: LocationsOnPartsScalarFieldEnumSchema.array(),
  having: LocationsOnPartsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const LocationsOnPartsFindUniqueArgsSchema: z.ZodType<Prisma.LocationsOnPartsFindUniqueArgs> = z.object({
  select: LocationsOnPartsSelectSchema.optional(),
  include: LocationsOnPartsIncludeSchema.optional(),
  where: LocationsOnPartsWhereUniqueInputSchema,
}).strict() ;

export const LocationsOnPartsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.LocationsOnPartsFindUniqueOrThrowArgs> = z.object({
  select: LocationsOnPartsSelectSchema.optional(),
  include: LocationsOnPartsIncludeSchema.optional(),
  where: LocationsOnPartsWhereUniqueInputSchema,
}).strict() ;

export const VendorOnPartsFindFirstArgsSchema: z.ZodType<Prisma.VendorOnPartsFindFirstArgs> = z.object({
  select: VendorOnPartsSelectSchema.optional(),
  include: VendorOnPartsIncludeSchema.optional(),
  where: VendorOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ VendorOnPartsOrderByWithRelationInputSchema.array(),VendorOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VendorOnPartsScalarFieldEnumSchema,VendorOnPartsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VendorOnPartsFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VendorOnPartsFindFirstOrThrowArgs> = z.object({
  select: VendorOnPartsSelectSchema.optional(),
  include: VendorOnPartsIncludeSchema.optional(),
  where: VendorOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ VendorOnPartsOrderByWithRelationInputSchema.array(),VendorOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VendorOnPartsScalarFieldEnumSchema,VendorOnPartsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VendorOnPartsFindManyArgsSchema: z.ZodType<Prisma.VendorOnPartsFindManyArgs> = z.object({
  select: VendorOnPartsSelectSchema.optional(),
  include: VendorOnPartsIncludeSchema.optional(),
  where: VendorOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ VendorOnPartsOrderByWithRelationInputSchema.array(),VendorOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ VendorOnPartsScalarFieldEnumSchema,VendorOnPartsScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const VendorOnPartsAggregateArgsSchema: z.ZodType<Prisma.VendorOnPartsAggregateArgs> = z.object({
  where: VendorOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ VendorOnPartsOrderByWithRelationInputSchema.array(),VendorOnPartsOrderByWithRelationInputSchema ]).optional(),
  cursor: VendorOnPartsWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VendorOnPartsGroupByArgsSchema: z.ZodType<Prisma.VendorOnPartsGroupByArgs> = z.object({
  where: VendorOnPartsWhereInputSchema.optional(),
  orderBy: z.union([ VendorOnPartsOrderByWithAggregationInputSchema.array(),VendorOnPartsOrderByWithAggregationInputSchema ]).optional(),
  by: VendorOnPartsScalarFieldEnumSchema.array(),
  having: VendorOnPartsScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const VendorOnPartsFindUniqueArgsSchema: z.ZodType<Prisma.VendorOnPartsFindUniqueArgs> = z.object({
  select: VendorOnPartsSelectSchema.optional(),
  include: VendorOnPartsIncludeSchema.optional(),
  where: VendorOnPartsWhereUniqueInputSchema,
}).strict() ;

export const VendorOnPartsFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VendorOnPartsFindUniqueOrThrowArgs> = z.object({
  select: VendorOnPartsSelectSchema.optional(),
  include: VendorOnPartsIncludeSchema.optional(),
  where: VendorOnPartsWhereUniqueInputSchema,
}).strict() ;

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
}).strict() ;

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
  create: z.union([ AccountCreateInputSchema,AccountUncheckedCreateInputSchema ]),
  update: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
}).strict() ;

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> = z.object({
  data: z.union([ AccountCreateManyInputSchema,AccountCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z.object({
  select: AccountSelectSchema.optional(),
  include: AccountIncludeSchema.optional(),
  data: z.union([ AccountUpdateInputSchema,AccountUncheckedUpdateInputSchema ]),
  where: AccountWhereUniqueInputSchema,
}).strict() ;

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> = z.object({
  data: z.union([ AccountUpdateManyMutationInputSchema,AccountUncheckedUpdateManyInputSchema ]),
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> = z.object({
  where: AccountWhereInputSchema.optional(),
}).strict() ;

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
}).strict() ;

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
  create: z.union([ SessionCreateInputSchema,SessionUncheckedCreateInputSchema ]),
  update: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
}).strict() ;

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> = z.object({
  data: z.union([ SessionCreateManyInputSchema,SessionCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z.object({
  select: SessionSelectSchema.optional(),
  include: SessionIncludeSchema.optional(),
  data: z.union([ SessionUpdateInputSchema,SessionUncheckedUpdateInputSchema ]),
  where: SessionWhereUniqueInputSchema,
}).strict() ;

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> = z.object({
  data: z.union([ SessionUpdateManyMutationInputSchema,SessionUncheckedUpdateManyInputSchema ]),
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> = z.object({
  where: SessionWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenCreateArgsSchema: z.ZodType<Prisma.VerificationTokenCreateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
}).strict() ;

export const VerificationTokenUpsertArgsSchema: z.ZodType<Prisma.VerificationTokenUpsertArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
  create: z.union([ VerificationTokenCreateInputSchema,VerificationTokenUncheckedCreateInputSchema ]),
  update: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
}).strict() ;

export const VerificationTokenCreateManyArgsSchema: z.ZodType<Prisma.VerificationTokenCreateManyArgs> = z.object({
  data: z.union([ VerificationTokenCreateManyInputSchema,VerificationTokenCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VerificationTokenDeleteArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateArgs> = z.object({
  select: VerificationTokenSelectSchema.optional(),
  data: z.union([ VerificationTokenUpdateInputSchema,VerificationTokenUncheckedUpdateInputSchema ]),
  where: VerificationTokenWhereUniqueInputSchema,
}).strict() ;

export const VerificationTokenUpdateManyArgsSchema: z.ZodType<Prisma.VerificationTokenUpdateManyArgs> = z.object({
  data: z.union([ VerificationTokenUpdateManyMutationInputSchema,VerificationTokenUncheckedUpdateManyInputSchema ]),
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const VerificationTokenDeleteManyArgsSchema: z.ZodType<Prisma.VerificationTokenDeleteManyArgs> = z.object({
  where: VerificationTokenWhereInputSchema.optional(),
}).strict() ;

export const CompanyUserCreateArgsSchema: z.ZodType<Prisma.CompanyUserCreateArgs> = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  data: z.union([ CompanyUserCreateInputSchema,CompanyUserUncheckedCreateInputSchema ]),
}).strict() ;

export const CompanyUserUpsertArgsSchema: z.ZodType<Prisma.CompanyUserUpsertArgs> = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereUniqueInputSchema,
  create: z.union([ CompanyUserCreateInputSchema,CompanyUserUncheckedCreateInputSchema ]),
  update: z.union([ CompanyUserUpdateInputSchema,CompanyUserUncheckedUpdateInputSchema ]),
}).strict() ;

export const CompanyUserCreateManyArgsSchema: z.ZodType<Prisma.CompanyUserCreateManyArgs> = z.object({
  data: z.union([ CompanyUserCreateManyInputSchema,CompanyUserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CompanyUserDeleteArgsSchema: z.ZodType<Prisma.CompanyUserDeleteArgs> = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  where: CompanyUserWhereUniqueInputSchema,
}).strict() ;

export const CompanyUserUpdateArgsSchema: z.ZodType<Prisma.CompanyUserUpdateArgs> = z.object({
  select: CompanyUserSelectSchema.optional(),
  include: CompanyUserIncludeSchema.optional(),
  data: z.union([ CompanyUserUpdateInputSchema,CompanyUserUncheckedUpdateInputSchema ]),
  where: CompanyUserWhereUniqueInputSchema,
}).strict() ;

export const CompanyUserUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUserUpdateManyArgs> = z.object({
  data: z.union([ CompanyUserUpdateManyMutationInputSchema,CompanyUserUncheckedUpdateManyInputSchema ]),
  where: CompanyUserWhereInputSchema.optional(),
}).strict() ;

export const CompanyUserDeleteManyArgsSchema: z.ZodType<Prisma.CompanyUserDeleteManyArgs> = z.object({
  where: CompanyUserWhereInputSchema.optional(),
}).strict() ;

export const ClientCreateArgsSchema: z.ZodType<Prisma.ClientCreateArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ ClientCreateInputSchema,ClientUncheckedCreateInputSchema ]),
}).strict() ;

export const ClientUpsertArgsSchema: z.ZodType<Prisma.ClientUpsertArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
  create: z.union([ ClientCreateInputSchema,ClientUncheckedCreateInputSchema ]),
  update: z.union([ ClientUpdateInputSchema,ClientUncheckedUpdateInputSchema ]),
}).strict() ;

export const ClientCreateManyArgsSchema: z.ZodType<Prisma.ClientCreateManyArgs> = z.object({
  data: z.union([ ClientCreateManyInputSchema,ClientCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ClientDeleteArgsSchema: z.ZodType<Prisma.ClientDeleteArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientUpdateArgsSchema: z.ZodType<Prisma.ClientUpdateArgs> = z.object({
  select: ClientSelectSchema.optional(),
  include: ClientIncludeSchema.optional(),
  data: z.union([ ClientUpdateInputSchema,ClientUncheckedUpdateInputSchema ]),
  where: ClientWhereUniqueInputSchema,
}).strict() ;

export const ClientUpdateManyArgsSchema: z.ZodType<Prisma.ClientUpdateManyArgs> = z.object({
  data: z.union([ ClientUpdateManyMutationInputSchema,ClientUncheckedUpdateManyInputSchema ]),
  where: ClientWhereInputSchema.optional(),
}).strict() ;

export const ClientDeleteManyArgsSchema: z.ZodType<Prisma.ClientDeleteManyArgs> = z.object({
  where: ClientWhereInputSchema.optional(),
}).strict() ;

export const CompanyCreateArgsSchema: z.ZodType<Prisma.CompanyCreateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
}).strict() ;

export const CompanyUpsertArgsSchema: z.ZodType<Prisma.CompanyUpsertArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
  create: z.union([ CompanyCreateInputSchema,CompanyUncheckedCreateInputSchema ]),
  update: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
}).strict() ;

export const CompanyCreateManyArgsSchema: z.ZodType<Prisma.CompanyCreateManyArgs> = z.object({
  data: z.union([ CompanyCreateManyInputSchema,CompanyCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CompanyDeleteArgsSchema: z.ZodType<Prisma.CompanyDeleteArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyUpdateArgsSchema: z.ZodType<Prisma.CompanyUpdateArgs> = z.object({
  select: CompanySelectSchema.optional(),
  include: CompanyIncludeSchema.optional(),
  data: z.union([ CompanyUpdateInputSchema,CompanyUncheckedUpdateInputSchema ]),
  where: CompanyWhereUniqueInputSchema,
}).strict() ;

export const CompanyUpdateManyArgsSchema: z.ZodType<Prisma.CompanyUpdateManyArgs> = z.object({
  data: z.union([ CompanyUpdateManyMutationInputSchema,CompanyUncheckedUpdateManyInputSchema ]),
  where: CompanyWhereInputSchema.optional(),
}).strict() ;

export const CompanyDeleteManyArgsSchema: z.ZodType<Prisma.CompanyDeleteManyArgs> = z.object({
  where: CompanyWhereInputSchema.optional(),
}).strict() ;

export const PartCreateArgsSchema: z.ZodType<Prisma.PartCreateArgs> = z.object({
  select: PartSelectSchema.optional(),
  include: PartIncludeSchema.optional(),
  data: z.union([ PartCreateInputSchema,PartUncheckedCreateInputSchema ]),
}).strict() ;

export const PartUpsertArgsSchema: z.ZodType<Prisma.PartUpsertArgs> = z.object({
  select: PartSelectSchema.optional(),
  include: PartIncludeSchema.optional(),
  where: PartWhereUniqueInputSchema,
  create: z.union([ PartCreateInputSchema,PartUncheckedCreateInputSchema ]),
  update: z.union([ PartUpdateInputSchema,PartUncheckedUpdateInputSchema ]),
}).strict() ;

export const PartCreateManyArgsSchema: z.ZodType<Prisma.PartCreateManyArgs> = z.object({
  data: z.union([ PartCreateManyInputSchema,PartCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const PartDeleteArgsSchema: z.ZodType<Prisma.PartDeleteArgs> = z.object({
  select: PartSelectSchema.optional(),
  include: PartIncludeSchema.optional(),
  where: PartWhereUniqueInputSchema,
}).strict() ;

export const PartUpdateArgsSchema: z.ZodType<Prisma.PartUpdateArgs> = z.object({
  select: PartSelectSchema.optional(),
  include: PartIncludeSchema.optional(),
  data: z.union([ PartUpdateInputSchema,PartUncheckedUpdateInputSchema ]),
  where: PartWhereUniqueInputSchema,
}).strict() ;

export const PartUpdateManyArgsSchema: z.ZodType<Prisma.PartUpdateManyArgs> = z.object({
  data: z.union([ PartUpdateManyMutationInputSchema,PartUncheckedUpdateManyInputSchema ]),
  where: PartWhereInputSchema.optional(),
}).strict() ;

export const PartDeleteManyArgsSchema: z.ZodType<Prisma.PartDeleteManyArgs> = z.object({
  where: PartWhereInputSchema.optional(),
}).strict() ;

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
  create: z.union([ CategoryCreateInputSchema,CategoryUncheckedCreateInputSchema ]),
  update: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> = z.object({
  data: z.union([ CategoryCreateManyInputSchema,CategoryCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z.object({
  select: CategorySelectSchema.optional(),
  include: CategoryIncludeSchema.optional(),
  data: z.union([ CategoryUpdateInputSchema,CategoryUncheckedUpdateInputSchema ]),
  where: CategoryWhereUniqueInputSchema,
}).strict() ;

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> = z.object({
  data: z.union([ CategoryUpdateManyMutationInputSchema,CategoryUncheckedUpdateManyInputSchema ]),
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> = z.object({
  where: CategoryWhereInputSchema.optional(),
}).strict() ;

export const LocationCreateArgsSchema: z.ZodType<Prisma.LocationCreateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
}).strict() ;

export const LocationUpsertArgsSchema: z.ZodType<Prisma.LocationUpsertArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
  create: z.union([ LocationCreateInputSchema,LocationUncheckedCreateInputSchema ]),
  update: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
}).strict() ;

export const LocationCreateManyArgsSchema: z.ZodType<Prisma.LocationCreateManyArgs> = z.object({
  data: z.union([ LocationCreateManyInputSchema,LocationCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LocationDeleteArgsSchema: z.ZodType<Prisma.LocationDeleteArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationUpdateArgsSchema: z.ZodType<Prisma.LocationUpdateArgs> = z.object({
  select: LocationSelectSchema.optional(),
  include: LocationIncludeSchema.optional(),
  data: z.union([ LocationUpdateInputSchema,LocationUncheckedUpdateInputSchema ]),
  where: LocationWhereUniqueInputSchema,
}).strict() ;

export const LocationUpdateManyArgsSchema: z.ZodType<Prisma.LocationUpdateManyArgs> = z.object({
  data: z.union([ LocationUpdateManyMutationInputSchema,LocationUncheckedUpdateManyInputSchema ]),
  where: LocationWhereInputSchema.optional(),
}).strict() ;

export const LocationDeleteManyArgsSchema: z.ZodType<Prisma.LocationDeleteManyArgs> = z.object({
  where: LocationWhereInputSchema.optional(),
}).strict() ;

export const VendorCreateArgsSchema: z.ZodType<Prisma.VendorCreateArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  data: z.union([ VendorCreateInputSchema,VendorUncheckedCreateInputSchema ]),
}).strict() ;

export const VendorUpsertArgsSchema: z.ZodType<Prisma.VendorUpsertArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
  create: z.union([ VendorCreateInputSchema,VendorUncheckedCreateInputSchema ]),
  update: z.union([ VendorUpdateInputSchema,VendorUncheckedUpdateInputSchema ]),
}).strict() ;

export const VendorCreateManyArgsSchema: z.ZodType<Prisma.VendorCreateManyArgs> = z.object({
  data: z.union([ VendorCreateManyInputSchema,VendorCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VendorDeleteArgsSchema: z.ZodType<Prisma.VendorDeleteArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  where: VendorWhereUniqueInputSchema,
}).strict() ;

export const VendorUpdateArgsSchema: z.ZodType<Prisma.VendorUpdateArgs> = z.object({
  select: VendorSelectSchema.optional(),
  include: VendorIncludeSchema.optional(),
  data: z.union([ VendorUpdateInputSchema,VendorUncheckedUpdateInputSchema ]),
  where: VendorWhereUniqueInputSchema,
}).strict() ;

export const VendorUpdateManyArgsSchema: z.ZodType<Prisma.VendorUpdateManyArgs> = z.object({
  data: z.union([ VendorUpdateManyMutationInputSchema,VendorUncheckedUpdateManyInputSchema ]),
  where: VendorWhereInputSchema.optional(),
}).strict() ;

export const VendorDeleteManyArgsSchema: z.ZodType<Prisma.VendorDeleteManyArgs> = z.object({
  where: VendorWhereInputSchema.optional(),
}).strict() ;

export const CategoriesOnPartsCreateArgsSchema: z.ZodType<Prisma.CategoriesOnPartsCreateArgs> = z.object({
  select: CategoriesOnPartsSelectSchema.optional(),
  include: CategoriesOnPartsIncludeSchema.optional(),
  data: z.union([ CategoriesOnPartsCreateInputSchema,CategoriesOnPartsUncheckedCreateInputSchema ]),
}).strict() ;

export const CategoriesOnPartsUpsertArgsSchema: z.ZodType<Prisma.CategoriesOnPartsUpsertArgs> = z.object({
  select: CategoriesOnPartsSelectSchema.optional(),
  include: CategoriesOnPartsIncludeSchema.optional(),
  where: CategoriesOnPartsWhereUniqueInputSchema,
  create: z.union([ CategoriesOnPartsCreateInputSchema,CategoriesOnPartsUncheckedCreateInputSchema ]),
  update: z.union([ CategoriesOnPartsUpdateInputSchema,CategoriesOnPartsUncheckedUpdateInputSchema ]),
}).strict() ;

export const CategoriesOnPartsCreateManyArgsSchema: z.ZodType<Prisma.CategoriesOnPartsCreateManyArgs> = z.object({
  data: z.union([ CategoriesOnPartsCreateManyInputSchema,CategoriesOnPartsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const CategoriesOnPartsDeleteArgsSchema: z.ZodType<Prisma.CategoriesOnPartsDeleteArgs> = z.object({
  select: CategoriesOnPartsSelectSchema.optional(),
  include: CategoriesOnPartsIncludeSchema.optional(),
  where: CategoriesOnPartsWhereUniqueInputSchema,
}).strict() ;

export const CategoriesOnPartsUpdateArgsSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateArgs> = z.object({
  select: CategoriesOnPartsSelectSchema.optional(),
  include: CategoriesOnPartsIncludeSchema.optional(),
  data: z.union([ CategoriesOnPartsUpdateInputSchema,CategoriesOnPartsUncheckedUpdateInputSchema ]),
  where: CategoriesOnPartsWhereUniqueInputSchema,
}).strict() ;

export const CategoriesOnPartsUpdateManyArgsSchema: z.ZodType<Prisma.CategoriesOnPartsUpdateManyArgs> = z.object({
  data: z.union([ CategoriesOnPartsUpdateManyMutationInputSchema,CategoriesOnPartsUncheckedUpdateManyInputSchema ]),
  where: CategoriesOnPartsWhereInputSchema.optional(),
}).strict() ;

export const CategoriesOnPartsDeleteManyArgsSchema: z.ZodType<Prisma.CategoriesOnPartsDeleteManyArgs> = z.object({
  where: CategoriesOnPartsWhereInputSchema.optional(),
}).strict() ;

export const LocationsOnPartsCreateArgsSchema: z.ZodType<Prisma.LocationsOnPartsCreateArgs> = z.object({
  select: LocationsOnPartsSelectSchema.optional(),
  include: LocationsOnPartsIncludeSchema.optional(),
  data: z.union([ LocationsOnPartsCreateInputSchema,LocationsOnPartsUncheckedCreateInputSchema ]),
}).strict() ;

export const LocationsOnPartsUpsertArgsSchema: z.ZodType<Prisma.LocationsOnPartsUpsertArgs> = z.object({
  select: LocationsOnPartsSelectSchema.optional(),
  include: LocationsOnPartsIncludeSchema.optional(),
  where: LocationsOnPartsWhereUniqueInputSchema,
  create: z.union([ LocationsOnPartsCreateInputSchema,LocationsOnPartsUncheckedCreateInputSchema ]),
  update: z.union([ LocationsOnPartsUpdateInputSchema,LocationsOnPartsUncheckedUpdateInputSchema ]),
}).strict() ;

export const LocationsOnPartsCreateManyArgsSchema: z.ZodType<Prisma.LocationsOnPartsCreateManyArgs> = z.object({
  data: z.union([ LocationsOnPartsCreateManyInputSchema,LocationsOnPartsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const LocationsOnPartsDeleteArgsSchema: z.ZodType<Prisma.LocationsOnPartsDeleteArgs> = z.object({
  select: LocationsOnPartsSelectSchema.optional(),
  include: LocationsOnPartsIncludeSchema.optional(),
  where: LocationsOnPartsWhereUniqueInputSchema,
}).strict() ;

export const LocationsOnPartsUpdateArgsSchema: z.ZodType<Prisma.LocationsOnPartsUpdateArgs> = z.object({
  select: LocationsOnPartsSelectSchema.optional(),
  include: LocationsOnPartsIncludeSchema.optional(),
  data: z.union([ LocationsOnPartsUpdateInputSchema,LocationsOnPartsUncheckedUpdateInputSchema ]),
  where: LocationsOnPartsWhereUniqueInputSchema,
}).strict() ;

export const LocationsOnPartsUpdateManyArgsSchema: z.ZodType<Prisma.LocationsOnPartsUpdateManyArgs> = z.object({
  data: z.union([ LocationsOnPartsUpdateManyMutationInputSchema,LocationsOnPartsUncheckedUpdateManyInputSchema ]),
  where: LocationsOnPartsWhereInputSchema.optional(),
}).strict() ;

export const LocationsOnPartsDeleteManyArgsSchema: z.ZodType<Prisma.LocationsOnPartsDeleteManyArgs> = z.object({
  where: LocationsOnPartsWhereInputSchema.optional(),
}).strict() ;

export const VendorOnPartsCreateArgsSchema: z.ZodType<Prisma.VendorOnPartsCreateArgs> = z.object({
  select: VendorOnPartsSelectSchema.optional(),
  include: VendorOnPartsIncludeSchema.optional(),
  data: z.union([ VendorOnPartsCreateInputSchema,VendorOnPartsUncheckedCreateInputSchema ]),
}).strict() ;

export const VendorOnPartsUpsertArgsSchema: z.ZodType<Prisma.VendorOnPartsUpsertArgs> = z.object({
  select: VendorOnPartsSelectSchema.optional(),
  include: VendorOnPartsIncludeSchema.optional(),
  where: VendorOnPartsWhereUniqueInputSchema,
  create: z.union([ VendorOnPartsCreateInputSchema,VendorOnPartsUncheckedCreateInputSchema ]),
  update: z.union([ VendorOnPartsUpdateInputSchema,VendorOnPartsUncheckedUpdateInputSchema ]),
}).strict() ;

export const VendorOnPartsCreateManyArgsSchema: z.ZodType<Prisma.VendorOnPartsCreateManyArgs> = z.object({
  data: z.union([ VendorOnPartsCreateManyInputSchema,VendorOnPartsCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const VendorOnPartsDeleteArgsSchema: z.ZodType<Prisma.VendorOnPartsDeleteArgs> = z.object({
  select: VendorOnPartsSelectSchema.optional(),
  include: VendorOnPartsIncludeSchema.optional(),
  where: VendorOnPartsWhereUniqueInputSchema,
}).strict() ;

export const VendorOnPartsUpdateArgsSchema: z.ZodType<Prisma.VendorOnPartsUpdateArgs> = z.object({
  select: VendorOnPartsSelectSchema.optional(),
  include: VendorOnPartsIncludeSchema.optional(),
  data: z.union([ VendorOnPartsUpdateInputSchema,VendorOnPartsUncheckedUpdateInputSchema ]),
  where: VendorOnPartsWhereUniqueInputSchema,
}).strict() ;

export const VendorOnPartsUpdateManyArgsSchema: z.ZodType<Prisma.VendorOnPartsUpdateManyArgs> = z.object({
  data: z.union([ VendorOnPartsUpdateManyMutationInputSchema,VendorOnPartsUncheckedUpdateManyInputSchema ]),
  where: VendorOnPartsWhereInputSchema.optional(),
}).strict() ;

export const VendorOnPartsDeleteManyArgsSchema: z.ZodType<Prisma.VendorOnPartsDeleteManyArgs> = z.object({
  where: VendorOnPartsWhereInputSchema.optional(),
}).strict() ;