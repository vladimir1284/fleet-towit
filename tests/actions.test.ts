import { createCompany, createUser, deleteCompany, deleteUser } from "$lib/actions/admin";
import { expect, test } from "vitest";
import { bypassPrisma } from "$lib/prisma";

let company: any
let user: any

test('Creating company using admin actions', async() => {
    let newCompany = await createCompany({name: 'JustATestCompany'});
    expect(newCompany.name).toBe('JustATestCompany');
    company = newCompany
})

test('Creating new companyUser of JATC company', async() => {
    let newUser = await createUser({email: 'example@email.com', companyId: company.id});
    expect(newUser.companyId).toBe(company.id);
    expect(newUser.userId).toBeTruthy();
    user = newUser
})

test('Deleting the companyUser', async() => {
    let result = await deleteUser({companyUserId: user.id});
    expect(result).toBe(true);
    
    // cleanup
    await bypassPrisma.user.delete({where:{id: user.userId}});
})

test('Deleting JATC company', async() => {
    let result = await deleteCompany({companyId: company.id})
    expect(result).toBe(true)
})