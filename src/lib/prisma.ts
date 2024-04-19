/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { PrismaClient } from '@prisma/client';
import { bypassRLS, forTenant, forUser } from './rls_prisma';

export let prisma: PrismaClient;

declare global {
	const prisma: undefined | PrismaClient;
}

if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}

	prisma = global.prisma;
}


export const bypassPrisma = prisma.$extends(bypassRLS());
export function tenantPrisma(tenant: number) {
	const extended = prisma.$extends(forTenant(tenant));
	return extended;
}
export function userPrisma(user: string) {
	const extended = prisma.$extends(forUser(user));
	return extended;
}

export type ExtendedBypassPrismaClient = typeof bypassPrisma;
export type ExtendedTenantPrismaClient = ReturnType<typeof tenantPrisma>;
export type ExtendedUserPrismaClient = ReturnType<typeof userPrisma>;
