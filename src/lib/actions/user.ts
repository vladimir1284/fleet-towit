import { userPrisma, companyPrisma } from "$lib/prisma";

export const getCompanyUsers = async({userId}: {userId: string}) => {
    const userContext = userPrisma(userId);
    const baseCompanyUsers = await userContext.companyUser.findMany({where:{userId: userId}})
    const augmentedCompanyUsers = await Promise.all(
        baseCompanyUsers.map(async(companyUser) => {
            const companyContext = companyPrisma(companyUser.companyId);
            const company = await companyContext.company.findUnique({where: {id: companyUser.companyId}})

            return {...companyUser, company}
        })
    )
    return augmentedCompanyUsers
}
  