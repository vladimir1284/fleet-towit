//@ts-nocheck
import type { PageServerLoad } from './$types';
import { bypassPrisma } from "$lib/prisma";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.getSession();
    let companies = await Promise.all(session?.user?.companyUsers.map(async (companyUser: { companyId: any; }) => {
        return await bypassPrisma.company.findUnique({where: {id: companyUser.companyId}})
    }))


    return {session: session, aviableCompanies: companies}
}