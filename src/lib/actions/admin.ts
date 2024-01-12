import { bypassPrisma } from "$lib/prisma";
import email from "@auth/sveltekit/providers/email";
import { string } from "zod";
import { Role } from "@prisma/client";

type createCompanyType = {name: string, email?: string | null};
type createUserType = {email: string, companyId: string, userRole?: Role};

export const createCompany = async({name, email=null, }: createCompanyType) => {
    let obj = await bypassPrisma.company.create({data:{
        name: name,
        email: email
    }});
    return obj
}

export const createCompanyUser = async({email, companyId, userRole=Role.STAFF}: createUserType) => {
    let user = await bypassPrisma.user.findUnique({where:{email: email}})
    if (!user) {
        user = await bypassPrisma.user.create({data: {email: email}})
    }
    let companyUser = await bypassPrisma.companyUser.create({data:{
        userId: user.id,
        companyId: companyId,
        role: userRole
    }})

    return companyUser
}

export const deleteCompany = async({companyId}:{companyId: string} ) => {
    await bypassPrisma.company.delete({where:{id: companyId}})
    return true
}

export const deleteUser = async({companyUserId}: {companyUserId: string}) => {
    await bypassPrisma.companyUser.delete({where:{id: companyUserId}})
    return true
}

export const listCompanies = async() => {
    let companies = await bypassPrisma.company.findMany();
    let augmentedCompanies = await Promise.all(companies.map(async(company) => { 
        let owner
        let _owner = await bypassPrisma.companyUser.findFirst({where:{AND:{companyId: company.id, role: Role.OWNER}}})
        if (_owner) {
            let user = await bypassPrisma.user.findUnique({where:{id: _owner.userId}})
            owner = {..._owner, user}
        } else {
            owner = _owner
        }
        return {...company, owner}
     }))
    return companies
}

export const listCompanyUsers = async({companyId}:{companyId: string}) => {
    let _users = await bypassPrisma.companyUser.findMany({where:{companyId: companyId}});
    let users = await Promise.all(_users.map(async(user) => {
        let _user = await bypassPrisma.user.findUnique({where:{id: user.userId}})
        return {...user, user: _user}
    }))
    return users
}

export const getAdminCompany = async() => {
    let company = await bypassPrisma.company.findFirst({where: {isAdmin: true}});
    return company
}