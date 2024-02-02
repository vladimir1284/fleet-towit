import { userPrisma, tenantPrisma, prisma } from "$lib/prisma";

type editUserType = {userId: string, email: string, name?: string, image?: string}

export const getTenantUsers = async({userId}: {userId: string}) => {
    /*const baseTenantUsers = await userContext.tenantUser.findMany({where:{userId: userId},
    select: {
        id: true,
        tenantId: true,
        userId: true,
        tenant: true
    }})*/
    const userContext = userPrisma(userId);
    const baseTenantUsers = await userContext.tenantUser.findMany({where:{userId: userId}})
    const augmentedTenantUsers = await Promise.all(
        baseTenantUsers.map(async(tenantUser) => {
            const tenantContext = tenantPrisma(tenantUser.tenantId);
            const tenant = await tenantContext.tenant.findUnique({where: {id: tenantUser.tenantId}})

            return {...tenantUser, tenant}
        })
    )
    return augmentedTenantUsers
}

export const editUser = async ({userId, email, name, image}: editUserType) => {
    await prisma.user.update({where: {id: userId}, data: {email, name, image}})
}
  