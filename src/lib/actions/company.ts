import { companyPrisma } from "$lib/prisma";
import { Role } from "@prisma/client";

type createNewUserType = {companyId: string, email: string, role?: Role}

export const createNewUser = async({companyId, email, role=Role.STAFF}: createNewUserType) => {
    const companyContext = companyPrisma(companyId);
    const company = await companyContext.company.findUnique({where: {id: companyId}})
    let user = await companyContext.user.findUnique({where: {email: email}});
    if (!user) {
        user = await companyContext.user.create({data: {email: email}});
    };
    const companyUser = await companyContext.companyUser.create({data:{
        companyId: companyId,
        userId: user.id,
        role: role
    }});
    return {...companyUser, user, company}
}

export const getCompanyUsers = async({companyId}:{companyId: string}) => {
    const companyContext = companyPrisma(companyId)
    //const company = await companyContext.company.findUnique({where: {id: companyId}});
    const baseCompanyUsers = await companyContext.companyUser.findMany();
    return baseCompanyUsers
}