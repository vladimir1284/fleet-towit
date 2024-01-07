import type { PageServerLoad } from './$types';
import { prisma, bypassPrisma, companyPrisma } from '$lib/prisma';

export const load = (async () => {
    const newCompany = await bypassPrisma.company.create({
        data: {
            name: "MyCompanyTest",
            email: "CompanyEmail@email.com",
        }
    })
    let context = companyPrisma(newCompany.id);
    let user = await context.user.create({data:{
        companyId: newCompany.id
    }})

    return {text: 'Hello', company: newCompany, user: user.id}
}) satisfies PageServerLoad;