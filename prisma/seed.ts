/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { createTenantUser } from '$lib/actions/admin';
import { bypassPrisma } from '$lib/prisma';
import { Role } from '@prisma/client';
const prisma = bypassPrisma;

async function main() {
	const existingAdminTenant = await prisma.tenant.findFirst({
		where: {
			name: 'admin'
		}
	});

	if (!existingAdminTenant) {
		const admin_tenant = await prisma.tenant.create({
			data: {
				name: 'admin',
				email: 'gissell111284@gmail.com',
				isAdmin: true
			}
		});
		const admin_user_0 = await createTenantUser({
			email: 'gsg2604@gmail.com',
			userRole: Role.ADMIN,
			tenantId: admin_tenant.id
		});
		const admin_user_1 = await createTenantUser({
			email: 'luis.ulloa75360@gmail.com',
			userRole: Role.ADMIN,
			tenantId: admin_tenant.id
		});
		const admin_user_3 = await createTenantUser({
			email: 'vladimir.rdguez@gmail.com',
			userRole: Role.ADMIN,
			tenantId: admin_tenant.id
		});
		const admin_user_5 = await createTenantUser({
			email: 'ymansfarroll@gmail.com',
			userRole: Role.ADMIN,
			tenantId: admin_tenant.id
		});
	} else {
		const admin_user_0 = await createTenantUser({
			email: 'gissell1184@gmail.com',
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		});
		const admin_user_1 = await createTenantUser({
			email: 'vladimir.rdguez@gmail.com',
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		});
		const admin_user_3 = await createTenantUser({
			email: 'luis.ulloa75360@gmail.com',
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		});
		const admin_user_5 = await createTenantUser({
			email: 'ymansfarroll@gmail.com',
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		});
	}
}
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
