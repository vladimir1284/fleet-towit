import { createCompany, createCompanyUser, deleteCompany, deleteUser, updateCompany, updateCompanyUser, listCompanies, listCompanyUsers } from "$lib/actions/admin";
import { expect, test } from "vitest";
import { bypassPrisma } from "$lib/prisma";
import { Role } from "@prisma/client";

let company: any
let user: any

test('Creating company using admin actions', async () => {
    let newCompany = await createCompany({ name: 'JustATestCompany' });
    expect(newCompany.name).toBe('JustATestCompany');
    company = newCompany
})

test('Updating company using admin actions', async () => {
    let updatedCompany = await updateCompany({ companyId: company.id, name: 'UpdatedTestCompany', email: 'updated@email.com' });
    expect(updatedCompany.name).toBe('UpdatedTestCompany');
    expect(updatedCompany.email).toBe('updated@email.com');
})

test('Creating new companyUser of JATC company', async () => {
    let newUser = await createCompanyUser({ email: 'example@email.com', companyId: company.id });
    expect(newUser.companyId).toBe(company.id);
    expect(newUser.userId).toBeTruthy();
    user = newUser
})

test('Updating companyUser using admin actions', async () => {
    let updatedUser = await updateCompanyUser({ companyUserId: user.id, email: 'updated@email.com', companyId: company.id, userRole: Role.ADMIN });
    expect(updatedUser.role).toBe(Role.ADMIN);
})

test('Deleting the companyUser', async () => {
    let result = await deleteUser({ companyUserId: user.id });
    expect(result).toBe(true);

    // cleanup
    await bypassPrisma.user.delete({ where: { id: user.userId } });
})

test('Deleting JATC company', async () => {
    let result = await deleteCompany({ companyId: company.id })
    expect(result).toBe(true)
})

test('Listing all companies using admin actions', async () => {
    let companies = await listCompanies();
    expect(Array.isArray(companies)).toBe(true);
})

test('Listing all company users using admin actions', async() => {
    company = await createCompany({name: 'TestCompany'});
    user = await createCompanyUser({email: 'example@email.com', companyId: company.id});
    let users = await listCompanyUsers({companyId: company.id});
    expect(Array.isArray(users)).toBe(true);
    expect(users[0].user?.email).toBe('example@email.com');

    // cleanup
    await bypassPrisma.user.delete({ where: { id: user.userId } });
    await bypassPrisma.company.delete({where: {id: company.id}})
   })