// test/sample.test.ts

import { expect, test, vi } from 'vitest'
import { bypassPrisma, tenantPrisma, prisma } from '../src/lib/prisma';
import type { Prisma, PrismaPromise } from '@prisma/client';

let tenant: any
let user: any

enum STATUS {
    "INITIAL",
    "DONE",
    "ERROR",
    "EXPECT_ERROR"
}

async function runTest(promise: any, expectedError:string = 'UNEXPECTED') {
    let status:STATUS = STATUS.INITIAL;
    let result:any = null;
    await promise
        .then((res: any) => {
            status = STATUS.DONE;
            result = res
            
        })
        .catch((e: any) => {
            if (e.message.includes(expectedError)) {
                status = STATUS.EXPECT_ERROR
            } else {
                status = STATUS.ERROR
            }
        })

    return { status, result }
}


test('Testing Insert using default prisma client. Expected: Fail', async() => {
    let promise = prisma.tenant.create({data:{name: 'TestingCompany', email: 'test@email.com'}});
    let { status, result } = await runTest(promise, 'code: "42501"');
    expect(status).toBe(STATUS.EXPECT_ERROR)
})


test('Create new tenant using bypass RLS prisma client',
    async() => {
        let promise = bypassPrisma.tenant.create({data: {name:'BypassPrisma', email:'example@company.com'}})
        let {status, result} = await runTest(promise);
        expect(status).toBe(STATUS.DONE)
        expect(result.name).toBe('BypassPrisma');
        tenant = result
    }
)

test('Testing Select to Tenant table without any context. Expected: 0-length result array',
    async() => {
        let promise = prisma.tenant.findMany();
        let {status, result} = await runTest(promise);
        expect(status).toBe(STATUS.DONE);
        expect(result.length).toBe(0)
    }
)

test('Creates new user on Tenant',
    async() => {
        const newPrisma = tenantPrisma(tenant.id);
        let promise: any = prisma.user.create({data:{
            name: 'Test',
        }})
        let res = await runTest(promise);
        expect(res.status).toBe(STATUS.DONE);
        expect(res.result.name).toBe('Test');

        let user = res.result

        promise = newPrisma.tenantUser.create({data:{userId: user.id, tenantId: tenant.id}})
        res = await runTest(promise);

        expect(res.status).toBe(STATUS.DONE);

        promise = prisma.user.delete({where:{id:user.id}});
        res = await runTest(promise);
        expect(res.status).toBe(STATUS.DONE);


    }
)

test("Delete tenant using tenant's ID as context",
    async() => {
        const newPrisma = tenantPrisma(tenant.id);
        let promise: any = newPrisma.tenant.delete({where:{id: tenant.id}})
        let {status, result} = await runTest(promise);
        expect(status).toBe(STATUS.DONE);

        promise = newPrisma.tenant.findMany();
        let res = await runTest(promise);
        expect(res.result.length).toBe(0)


    }
)
