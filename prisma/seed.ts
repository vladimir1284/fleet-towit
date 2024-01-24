import { PrismaClient } from '@prisma/client';
import { createCompanyUser } from "$lib/actions/admin";
import { bypassPrisma } from '$lib/prisma';
import { Role } from "@prisma/client";
const prisma = bypassPrisma

async function main() {
	const existingAdminCompany = await prisma.company.findUnique({
        where: {
            name: 'admin'
        }
    });

	if(!existingAdminCompany){
		const admin_company = await prisma.company.create({
			data: {
				name: 'admin',
				email: 'gissell111284@gmail.com',
				isAdmin: true
			}
		});
		const admin_user_0 = await createCompanyUser({email: 'gissell1184@gmail.com', userRole: Role.ADMIN, companyId: admin_company.id})
		const admin_user_1 = await createCompanyUser({email: 'luis.ulloa75360@gmail.com', userRole: Role.ADMIN, companyId: admin_company.id})
	}else {
		const admin_user_0 = await createCompanyUser({email: 'gissell1184@gmail.com', userRole: Role.ADMIN, companyId: existingAdminCompany.id})
		const admin_user_1 = await createCompanyUser({email: 'luis.ulloa75360@gmail.com', userRole: Role.ADMIN, companyId: existingAdminCompany.id})
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
