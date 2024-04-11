import { bypassPrisma } from "$lib/prisma";


export const validateRequest = async (session: any, currentTenant: number ) => {
    if (!session?.user) {
        return false
    }
    const adminTenant = await bypassPrisma.tenant.findFirst({ where: { isAdmin: true } });
    if (adminTenant?.id === currentTenant) {
        return true
    }
    if (!session.user.tenantUsers.some((user: any) => user.tenant.id === currentTenant)) {
        return false
    } else {
        return true
    }
}