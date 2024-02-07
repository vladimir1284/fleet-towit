import type { User } from '@auth/core/types';
import type { TenantUser, Tenant, Part, Category, Location, Vendor } from '@prisma/client';

export interface CustomTenantUser extends TenantUser {
	tenant: Tenant;
}

export interface CustomUserSession extends User {
	tenantUsers: CustomTenantUser[];
}

export interface QueryContraint {
	[key: string]: string;
}

export interface CustomInventoryPart extends Part {
	categories: Category[];
	locations: Location[];
	vendors: Vendor[];
}
