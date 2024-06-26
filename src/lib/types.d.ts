import type { User } from '@auth/core/types';
import type { TenantUser, Tenant, Part, Category, Location, Vendor } from '@prisma/client';

// Re-export definitions.
export * from './features/create-part/zod';

export interface CustomTenantUser extends TenantUser {
	tenant: Tenant;
}

export interface CustomUserSession extends User {
	tenantUsers: CustomTenantUser[];
}

export interface QueryStringifyContraint {
	[key: string]: string;
}

export interface CustomInventoryPart extends Part {
	categories: Category[];
	locations: Location[];
	vendors: Vendor[];
}

export type QueryContraint = {
	[key: string]: string;
};
