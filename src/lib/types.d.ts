import type { User } from '@auth/core/types';
import type { TenantUser, Tenant } from '@prisma/client';

export interface CustomTenantUser extends TenantUser {
	tenant: Tenant;
}

export interface CustomUserSession extends User {
	tenantUsers: CustomTenantUser[];
}

export type QueryContraint = {
	[key: string]: string;
};
