import { PrismaClient } from "@prisma/client";
import { bypassRLS, forCompany } from "./test_models";

export const prisma = new PrismaClient();

export const bypassPrisma = prisma.$extends(bypassRLS());
export  function companyPrisma(company: string) {
    const extended = prisma.$extends(forCompany(company));
    return extended
}