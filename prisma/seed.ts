import { PrismaClient } from '@prisma/client';
import { createCompanyUser } from "$lib/actions/admin";
import { bypassPrisma } from '$lib/prisma';
const prisma = bypassPrisma

async function main() {
	const admin_company = await prisma.company.create({
		data: {
			name: 'admin',
			email: 'gissell111284@gmail.com',
			isAdmin: true
		}
	});
	//const admin_user = await createCompanyUser({email: 'gissell1184@gmail.com', companyId: admin_company.id})
	const admin_user = await createCompanyUser({email: 'gsg2604@gmail.com', companyId: admin_company.id})
	const admin_user_1 = await createCompanyUser({email: 'luis.ulloa75360@gmail.com', companyId: admin_company.id})

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
