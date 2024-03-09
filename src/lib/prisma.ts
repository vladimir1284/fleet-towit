import { PrismaClient } from '@prisma/client';
import { bypassRLS, forTenant, forUser } from './rls_prisma';
import { KillBillPExt } from '../killbill/prisma_ext';

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

export let prisma = _prisma.$extends(KillBillPExt);

export const bypassPrisma = prisma.$extends(bypassRLS());
export function tenantPrisma(tenant: number) {
	const extended = prisma.$extends(forTenant(tenant));
	return extended;
}
export function userPrisma(user: string) {
	const extended = prisma.$extends(forUser(user));
	return extended;
}
