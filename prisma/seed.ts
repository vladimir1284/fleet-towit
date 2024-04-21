import { Role, PrismaClient } from '@prisma/client';
import seedVehicles from './seeders/vehicle.seed';
import seedClients from './seeders/clients.seed';
import seedInspection from './seeders/inspections.seed';
import seedRentalPlans from './seeders/rentalPlan.seed';
import seedContract from './seeders/contracts.seed';
import seedTracker from './seeders/trackers.seed';
const prisma = new PrismaClient();

async function main() {
	try {
		await prisma.$executeRaw`TRUNCATE TABLE "Account", "Session", "VerificationToken", "User", "Tenant", "Vehicle", "Client", "Inspection", "RentalPlan", "Contract", "Tracker" CASCADE;`;
		console.log('Db clean.');
	} catch (error) {
		console.error(`Error on clean db: ${error.message}`);
		return;
	}

	const usersData = [
		{ email: 'luis.ulloa75360@gmail.com', userRole: Role.ADMIN },
		{ email: 'gsg2604@gmail.com', userRole: Role.ADMIN },
		{ email: 'vladimir.rdguez@gmail.com', userRole: Role.ADMIN },
		{ email: 'raulodev@gmail.com', userRole: Role.ADMIN },
		{ email: 'ymansfarroll@gmail.com', userRole: Role.ADMIN },
		{ email: 'julioguillermo0802@gmail.com', userRole: Role.ADMIN },
		{ email: 'towithouston@gmail.com', userRole: Role.ADMIN },
		{ email: 'albertolicea00@icloud.com', userRole: Role.ADMIN },
		{ email: 'javiercastrolop@gmail.com', userRole: Role.ADMIN },
		{ email: 'anayvisarrieta@gmail.com', userRole: Role.ADMIN }
		// Add more users as needed
	];
	const tenantsData = {
		admin: { name: 'admin', email: 'gissell111284@gmail.com', isAdmin: true },
		test: { name: 'test', email: 'gissell111284@gmail.com', isAdmin: false }
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
			const { email, userRole } = userData;
			const user = await prisma.user.findUnique({ where: { email: email } });
			if (user) {
				await prisma.tenantUser.create({
					data: {
						userId: user.id,
						tenantId: array[index],
						role: userRole,
						is_default: index === 0
					}
				});
			}
		}
	}

	// Clients
	await seedClients(prisma);
	// Rental Plans
	await seedRentalPlans(prisma);
	// Vehicles
	const createdVehiclesIds = await seedVehicles(prisma);
	// Inspection
	await seedInspection(prisma, [testTenantId, tenantId]);
	// await seedParts(prisma, [testTenantId, tenantId]);
	// Contracts
	await seedContract(prisma);
	//Trackers
	await seedTracker(prisma, createdVehiclesIds);
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
