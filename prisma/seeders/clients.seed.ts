import { Stage } from '@prisma/client'

export const seedClients = async (prisma) => {
    const tenant = await prisma.tenant.create({
        data: {
            name: 'seedExample2',
            email: 'example2@example.com'
        }
    })

    const vehicle = await prisma.vehicle.findFirstOrThrow()
    const rentalPlan = await prisma.rentalPlan.findFirstOrThrow()

    const newClient = await prisma.client.create({
        data: {
            // id: '492',       // external-id for http://kaui.towithouston.com/home
            name: 'NotNewClient4KillBill',
            email: 'emial2@example.com',
            phoneNumber: '+1(222)2222-2222',
            tenantId: tenant.id ,
        }
    })

    await prisma.contract.create({
        data: {
            client: {
                connect: {
                    id: newClient.id 
                },
            },
            stage: {
                create: {
                    stage: Stage.PENDING,
                    date: new Date(Date.now())
                }
            },
            rentalPlan: {
                connect: {
                    id: rentalPlan.id 
                }
            },
            vehicle: {
                connect: {
                    id: vehicle.id 
                }
            }
        }
    })
}