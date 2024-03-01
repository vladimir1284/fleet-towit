import { Stage } from '@prisma/client'
import { Periodicity } from '@prisma/client'

export const seedContracts = async (prisma) => {
    const tenant = await prisma.tenant.create({
        data: {
            name: 'seedExample',
            email: 'example@example.com'
        }
    })
    const vehicle = await prisma.vehicle.findFirstOrThrow()
    await prisma.contract.create({
        data: {
            client: {
                create: {
                    name: 'NotNewClient',
                    email: 'email@example.com',
                    phoneNumber: '+1(123)4567-8910',
                    tenantId: tenant.id
                },
            },
            stage: {
                create: {
                    stage: Stage.PENDING,
                    date: new Date(Date.now())
                }
            },
            rentalPlan: {
                create: {
                    name: 'NewRentalPlan',
                    periodicity: Periodicity.MONTHLY,
                    amount: 100,
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