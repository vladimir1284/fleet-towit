/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import type { PageServerLoad } from './$types';
import { bypassPrisma } from "$lib/prisma";

export const load: PageServerLoad = async (event) => {
    const session = await event.locals.getSession();
    const tenants = await Promise.all(session?.user?.tenantUsers.map(async (tenantUser: { tenantId: never; }) => {
        return await bypassPrisma.tenant.findUnique({where: {id: tenantUser.tenantId}})
    }))


    return {session: session, aviableTenants: tenants}
}