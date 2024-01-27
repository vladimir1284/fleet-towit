import { createTenant, createTenantUser, deleteTenant, deleteUser, updateTenant, updateTenantUser, listTenants, listTenantUsersOnTenant } from "$lib/actions/admin";
import { expect, test } from "vitest";
import { bypassPrisma } from "$lib/prisma";
import { Role } from "@prisma/client";

let tenant: any
let user: any

test('Creating tenant using admin actions', async () => {
    let newTenant = await createTenant({ name: 'JustATestCompany' });
    expect(newTenant.name).toBe('JustATestCompany');
    tenant = newTenant
})

test('Updating tenant using admin actions', async () => {
    let updatedTenant = await updateTenant({ tenantId: tenant.id, name: 'UpdatedTestCompany', email: 'updated@email.com' });
    expect(updatedTenant.name).toBe('UpdatedTestCompany');
    expect(updatedTenant.email).toBe('updated@email.com');
})

test('Creating new tenantUser of JATC tenant', async () => {
    let newUser = await createTenantUser({ email: 'example@email.com', tenantId: tenant.id });
    expect(newUser.tenantId).toBe(tenant.id);
    expect(newUser.userId).toBeTruthy();
    user = newUser
})

test('Updating tenantUser using admin actions', async () => {
    let updatedUser = await updateTenantUser({ tenantUserId: user.id, email: 'updated@email.com', tenantId: tenant.id, userRole: Role.ADMIN });
    expect(updatedUser.role).toBe(Role.ADMIN);
})

test('Deleting the tenantUser', async () => {
    let result = await deleteUser({ tenantUserId: user.id });
    expect(result).toBe(true);

    // cleanup
    await bypassPrisma.user.delete({ where: { id: user.userId } });
})

test('Deleting JATC tenant', async () => {
    let result = await deleteTenant({ tenantId: tenant.id })
    expect(result).toBe(true)
})

test('Listing all tenant using admin actions', async () => {
    let tenants = await listTenants();
    expect(Array.isArray(tenants)).toBe(true);
})

test('Listing all tenant users using admin actions', async() => {
    tenant = await createTenant({name: 'TestCompany'});
    user = await createTenantUser({email: 'example@email.com', tenantId: tenant.id});
    let users = await listTenantUsersOnTenant({tenantId: tenant.id});
    expect(Array.isArray(users)).toBe(true);
    expect(users[0].user?.email).toBe('example@email.com');

    // cleanup
    await bypassPrisma.user.delete({ where: { id: user.userId } });
    await bypassPrisma.tenant.delete({where: {id: tenant.id}})
   })