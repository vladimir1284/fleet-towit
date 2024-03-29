import type { PageServerLoad } from "./$types";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const load: PageServerLoad = async () => {
  try {
    const results = await prisma.cost.findMany({
      include: {
        vehicle: {
          select: {
            plate: true,
            type: true,
            odometer: true
          }
        },
        category: {
          select: {
            name: true
          }
        }
      }
    })

    const costs = results.map(entry => ({
      value: "$" + entry.value.toFixed(2),
      concept: entry.concept,
      category: entry.category.name,
      date: entry.date,
      plate: entry.vehicle.plate,
      type: entry.vehicle.type,
      odometer: entry.vehicle.odometer + " mi."
    }))

    return { costs }

  } catch (error) {
    //@ts-expect-error This expects any error
    console.log(error.message)
  }
}