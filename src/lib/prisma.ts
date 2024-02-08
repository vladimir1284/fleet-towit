import { PrismaClient } from '@prisma/client';
import { bypassRLS, forTenant, forUser } from './rls_prisma';

export const prisma = new PrismaClient();

export const bypassPrisma = prisma.$extends(bypassRLS());
export function tenantPrisma(tenant: string) {
	const extended = prisma.$extends(forTenant(tenant));
	return extended;
}
export function userPrisma(user: string) {
	const extended = prisma.$extends(forUser(user));
	return extended;
}
