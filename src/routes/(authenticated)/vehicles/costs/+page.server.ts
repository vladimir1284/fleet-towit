import type { PageServerLoad } from "./$types";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const load: PageServerLoad = async () => {
  try {
    const results = await prisma.cost.findMany()
    let costs = []

    if (results) {
      if (results.length) {
        costs = results.map(async entry => {
          const cost = {
            concept: entry.concept,
            category: entry.category,
            date: entry.date,
            user: "",
            vehicleType: "",
            mileage: 0,
            licence_plate: ""
          }

          const user = await prisma.user.findUnique({
            where: {
              id: entry.userId
            }
          })

          if (user) {
            cost.user = user.name
          }

          const vehicle = await prisma.vehicle.findUnique({
            where: {
              id: entry.vehicleId
            }
          })

          if (vehicle) {
            cost.vehicleType = vehicle.type,
              cost.mileage = vehicle.odometer,
              cost.licence_plate = vehicle.plate
          }
        })
      }
    }

    return { costs }

  } catch (error) {
    console.log(error.message)
  }
}