import { PrismaClient } from '@prisma/client';
import { bypassRLS, forTenant, forUser } from './rls_prisma';
//import { KillBillPExt } from '../killbill/prisma_ext';
//import { KILLBILL } from '$env/static/private';

export let _prisma: PrismaClient;

declare global {
	const prisma: undefined | PrismaClient;
}

if (process.env.NODE_ENV === 'production') {
	_prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}

	_prisma = global.prisma;
}

export let prisma = _prisma;
/*
if (KILLBILL) {
	console.log('Kill Bill live sync!');
	prisma = _prisma.$extends(KillBillPExt);
}
*/
export const bypassPrisma = prisma.$extends(bypassRLS());
export function tenantPrisma(tenant: number) {
	const extended = prisma.$extends(forTenant(tenant));
	return extended;
}
export function userPrisma(user: string) {
	const extended = prisma.$extends(forUser(user));
	return extended;
}

// Use these types along with prisma extensions.
export type ExtendedBypassPrismaClient = typeof bypassPrisma;
export type ExtendedTenantPrismaClient = ReturnType<typeof tenantPrisma>;
export type ExtendedUserPrismaClient = ReturnType<typeof userPrisma>;
