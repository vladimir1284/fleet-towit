import { bypassPrisma } from '$lib/prisma';

import seedVehicles from "./seeders/vehicle.seed";
import seedCompanyUsers from "./seeders/companyUsers.seed";

const prisma = bypassPrisma

async function main() {
	await seedCompanyUsers(prisma)
	await seedVehicles(prisma)
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
