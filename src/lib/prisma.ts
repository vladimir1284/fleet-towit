import { PrismaClient } from "@prisma/client";
import { bypassRLS, forCompany, forUser } from "./test_models";

export const prisma = new PrismaClient();

export const bypassPrisma = prisma.$extends(bypassRLS());
export  function companyPrisma(company: string) {
    const extended = prisma.$extends(forCompany(company));
    return extended
}
export  function userPrisma(user: string) {
    const extended = prisma.$extends(forUser(user));
    return extended
}