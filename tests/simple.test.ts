// test/sample.test.ts

import { expect, test, vi } from 'vitest'
import { bypassPrisma, companyPrisma, prisma } from '../src/lib/prisma';
import type { Prisma, PrismaPromise } from '@prisma/client';

let company: any
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
    let promise = prisma.company.create({data:{name: 'TestingCompany', email: 'test@email.com'}});
    let { status, result } = await runTest(promise, 'code: "42501"');
    expect(status).toBe(STATUS.EXPECT_ERROR)
})


test('Create new company using bypass RLS prisma client',
    async() => {
        let promise = bypassPrisma.company.create({data: {name:'BypassPrisma', email:'example@company.com'}})
        let {status, result} = await runTest(promise);
        expect(status).toBe(STATUS.DONE)
        expect(result.name).toBe('BypassPrisma');
        company = result
    }
)

test('Testing Select to Company table without any context. Expected: 0-length result array',
    async() => {
        let promise = prisma.company.findMany();
        let {status, result} = await runTest(promise);
        expect(status).toBe(STATUS.DONE);
        expect(result.length).toBe(0)
    }
)

test('Creates new user on Company',
    async() => {
        const newPrisma = companyPrisma(company.id);
        let promise: any = prisma.user.create({data:{
            name: 'Test',
        }})
        let res = await runTest(promise);
        expect(res.status).toBe(STATUS.DONE);
        expect(res.result.name).toBe('Test');

        let user = res.result

        promise = newPrisma.companyUser.create({data:{userId: user.id, companyId: company.id}})
        res = await runTest(promise);

        expect(res.status).toBe(STATUS.DONE);

        promise = prisma.user.delete({where:{id:user.id}});
        res = await runTest(promise);
        expect(res.status).toBe(STATUS.DONE);


    }
)

test("Delete company using company's ID as context",
    async() => {
        const newPrisma = companyPrisma(company.id);
        let promise: any = newPrisma.company.delete({where:{id: company.id}})
        let {status, result} = await runTest(promise);
        expect(status).toBe(STATUS.DONE);

        promise = newPrisma.company.findMany();
        let res = await runTest(promise);
        expect(res.result.length).toBe(0)


    }
)
