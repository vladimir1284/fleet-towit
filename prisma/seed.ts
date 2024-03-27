import { createTenantUser } from '../src/lib/actions/admin';
import { bypassPrisma } from '../src/lib/prisma';
import { Role } from '@prisma/client';
import seedVehicles from './seeders/vehicle.seed';
import seedInspection from './seeders/inspections.seed';
import { seedContracts } from "./seeders/contracts.seed";
const prisma = bypassPrisma;

async function main() {
	const usersData = [
		{ email: 'luis.ulloa75360@gmail.com', userRole: Role.ADMIN, is_default: true },
		{ email: 'gsg2604@gmail.com', userRole: Role.ADMIN, is_default: true },
		{ email: 'vladimir.rdguez@gmail.com', userRole: Role.ADMIN, is_default: true },
		{ email: 'raulodev@gmail.com', userRole: Role.ADMIN, is_default: true },
		{ email: 'ymansfarroll@gmail.com', userRole: Role.ADMIN, is_default: true },
		{ email: 'julioguillermo0802@gmail.com', userRole: Role.ADMIN, is_default: true },
		// Add more users as needed
	];
	const tenantsData = {
		admin: { name: 'admin', email: 'gissell111284@gmail.com', isAdmin: true },
		test: { name: 'test', email: 'gissell111284@gmail.com', isAdmin: false },
		// Add more tenants as needed
	};

	// Admin tenant
	const existingAdminTenant = await prisma.tenant.findFirst({
		where: {
			isAdmin: true
		}
	});

	let tenantId;
	if (!existingAdminTenant) {
		const admin_tenant = await prisma.tenant.create({
			data: tenantsData['admin']
		});
		tenantId = admin_tenant.id;
	} else {
		tenantId = existingAdminTenant.id;
	}

	// Regular tenant
	const existingTenant = await prisma.tenant.findFirst({
		where: {
			isAdmin: false
		}
	});

	let testTenantId;
	if (!existingTenant) {
		const test_tenant = await prisma.tenant.create({
			data: tenantsData['test']
		});
		testTenantId = test_tenant.id;
	} else {
		testTenantId = existingTenant.id;
	}

	for (const userData of usersData) {
		const array = [tenantId, testTenantId];
		for (let index = 0; index < array.length; index++) {
			const existingUser = await prisma.tenantUser.findFirst({
				where: {
					tenantId: array[index],
					user: { email: userData.email }
				}
			});

			if (!existingUser) {
				await createTenantUser({ ...userData, tenantId: array[index] });
			}
		}
	}

	// Vehicles
	await seedVehicles(prisma);
	// Inspection
	await seedInspection(prisma, [testTenantId, tenantId]);
	// Contracts
	await seedContracts(prisma);

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
