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

	let existingTenant = await prisma.tenant.findFirst({
		where: {
			name: 'TEST'
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

	if (!existingTenant) {
		existingTenant = await prisma.tenant.create({
			data: {
				name: 'TEST',
				email: 'gissell111284@gmail.com',
				isAdmin: false
			}
		});
	}

	const users_admin_emails = [
		'gsg2604@gmail.com',
		'luis.ulloa75360@gmail.com',
		'vladimir.rdguez@gmail.com',
		'raulodev@gmail.com',
		'ymansfarroll@gmail.com'
		];

	for (const email of users_admin_emails) {
		await createTenantUser({
			email: email,
			userRole: Role.ADMIN,
			tenantId: existingAdminTenant.id
		});
		await createTenantUser({
			email: email,
			userRole: Role.ADMIN,
			tenantId: existingTenant.id
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
