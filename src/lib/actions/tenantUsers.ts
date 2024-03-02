import { Role } from "@prisma/client"
import { bypassPrisma } from "$lib/prisma"
import type { PrismaClient } from "@prisma/client"


type createTenantUserType = { role: Role, tenantId: number, email: string }
type updateTenantUserType = createTenantUserType & { id: number }

export const createTenantUser = async (instance: PrismaClient, { role, tenantId, email }: createTenantUserType) => {
    let user = await bypassPrisma.user.findUnique({ where: { email: email } });
    if (!user) {
        user = await bypassPrisma.user.create({ data: { email: email } });
    }
    const tenantUser = await instance.tenantUser.create({
        data: {
            role, tenantId, userId: user.id
        }
    })
    return tenantUser
}

export const updateTenantUser = async (instance: PrismaClient, { id, role, tenantId, email }: updateTenantUserType) => {
    let user = await bypassPrisma.user.findUnique({ where: { email: email } });
    if (!user) {
        user = await bypassPrisma.user.create({ data: { email: email } });
    }
    const tenantUser = await instance.tenantUser.update({
        where: { id },
        data: { role, tenantId, userId: user.id }
    })

    return tenantUser
}

export const deleteTenantUser = async (instance: PrismaClient, { id }: { id: number }) => {
    await instance.tenantUser.delete({
        where: { id }
    })
}

export const listTenantUsers = async (instance: PrismaClient) => {
    const tenantUsers = await instance.tenantUser.findMany({
        include: {
            tenant: true,
            user: true,
        }
    })
    return tenantUsers
}