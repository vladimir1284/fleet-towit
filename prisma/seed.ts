/* eslint-disable @typescript-eslint/no-unused-vars */
import { createTenantUser } from '$lib/actions/admin';
import { bypassPrisma } from '$lib/prisma';
import { Role } from '@prisma/client';
const prisma = bypassPrisma;

/**
 * To run this function use: npx prisma db seed
 */
async function main() {
	let existingAdminTenant = await prisma.tenant.findFirst({
		where: {
			name: 'admin'
		}
	});

	if (!existingAdminTenant) {
		existingAdminTenant = await prisma.tenant.create({
			data: {
				name: 'admin',
				email: 'gissell111284@gmail.com',
				isAdmin: true
			}
		});
	}

	const admins = [
		{
			email: 'gsg2604@gmail.com',
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		},
		{
			email: 'luis.ulloa75360@gmail.com',
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		},
		{
			email: 'vladimir.rdguez@gmail.com',
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		},
		{
			email: 'raulodev@gmail.com',
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		},
		{
			email: 'gissell1184@gmail.com',
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		}
	];

	for (const user of admins) {
		await createTenantUser(user);
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
