import { tenantPrisma } from "$lib/prisma";
import { Role } from "@prisma/client";

type createNewUserType = {tenantId: string, email: string, role?: Role}

export const createNewUser = async({tenantId, email, role=Role.STAFF}: createNewUserType) => {
    const companyContext = tenantPrisma(tenantId);
    const tenant = await companyContext.tenant.findUnique({where: {id: tenantId}})
    let user = await companyContext.user.findUnique({where: {email: email}});
    if (!user) {
        user = await companyContext.user.create({data: {email: email}});
    };
    const tenantUser = await companyContext.tenantUser.create({data:{
        tenantId: tenantId,
        userId: user.id,
        role: role
    }});
    return {...tenantUser, user, tenant}
}

export const getTenantUsers = async({tenantId}:{tenantId: string}) => {
    const tenantContext = tenantPrisma(tenantId)
    const basetenantUsers = await tenantContext.tenantUser.findMany();
    return basetenantUsers
}