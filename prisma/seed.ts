/* eslint-disable @typescript-eslint/no-unused-vars */
import { PrismaClient } from '@prisma/client';
import { createTenantUser } from "$lib/actions/admin";
import { bypassPrisma } from '$lib/prisma';
import { Role } from "@prisma/client";
const prisma = bypassPrisma

async function main() {
	const usersData = [
        { email: 'luis.ulloa75360@gmail.com', userRole: Role.ADMIN },
        { email: 'vladimir.rdguez@gmail.com', userRole: Role.ADMIN },
        { email: 'raulodev@gmail.com', userRole: Role.ADMIN },
        { email: 'ymansfarroll@gmail.com', userRole: Role.ADMIN },
        // Add more users as needed
    ];
	const existingAdminTenant = await prisma.tenant.findFirst({
        where: {
            isAdmin: true
        }
    });

    let tenantId;
    if (!existingAdminTenant) {
        const admin_tenant = await prisma.tenant.create({
            data: {
                name: 'admin',
                email: 'gissell111284@gmail.com',
                isAdmin: true
            }
        });
        tenantId = admin_tenant.id;
    } else {
        tenantId = existingAdminTenant.id;
    }

    for (const userData of usersData) {
		const existingUser = await prisma.user.findUnique({
			where: { email: userData.email }
		});
	
		if (!existingUser) {
			await createTenantUser({ ...userData, tenantId });
		}
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


