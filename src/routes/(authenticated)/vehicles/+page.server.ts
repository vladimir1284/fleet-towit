import path from "path"
import type { PageServerLoad } from "../../$types"
import { PrismaClient } from '@prisma/client'
//import { TableSolid, ImageSolid, BookSolid, ChartSolid, EyeSolid } from 'flowbite-svelte-icons'

const prisma = new PrismaClient()

export const load: PageServerLoad = async () => {
  try {
    const results = await prisma.vehicle.findMany({
      include: {
        vehiclePictures: {
          select: {
            image: true
          }
        },
        documents: {
          select: {
            name: true,
            file: true
          }
        },
        costs: {
          select: {
            value: true,
            concept: true,
            category: true,
            date: true
          }
        },
        contracts: {
        },
        tolls: {

        },
        inspections: {}
      }
    })

    const BASEURL = '/api/v1/vehicles/'

    const MORE_DETAILS_FIELDS = [
      'model',
      'trim',
      'vin',
      'spare_tires',
      "documents",
      "costs",
      "contracts",
      "tolls",
      "inspections",
      "extraFields",
    ]

    const COMPOUND_FIELDS = [
      "vehiclePictures",
    ]

    const ICONS = {
      extraFields: 'TableSolid',
      vehiclePictures: 'ImageSolid',
      documents: 'BookSolid',
      costs: 'ChartSolid',
      moreDetails: 'EyeSolid'
    }

    const vehicles = results.map(entry => {
      const keys = Object.keys(entry)
      let vehicle = {}

      for (let key of keys) {
        if (MORE_DETAILS_FIELDS.includes(key)) {


          let moreDetails = {}

          if (Object.keys(vehicle).includes('moreDetails')) {
            moreDetails = { ...vehicle['moreDetails'].value }
          }

          moreDetails[key] = entry[key]

          vehicle['moreDetails'] = {
            value: moreDetails,
            type: 'moreDetails',
            button: {
              icon: ICONS['moreDetails'],
              text: 'More details'
            },
            uri: path.join(BASEURL, entry['vin'], key)
          }

          console.log('MORE DETAILS:', JSON.stringify(vehicle['moreDetails'], null, 2))
        } else if (COMPOUND_FIELDS.includes(key)) {
          vehicle[key] = {
            value: entry[key],
            type: 'compound',
            button: {
              icon: ICONS[key],
              text: key
            },
            uri: path.join(BASEURL, entry['vin'], key)
          }
        } else {
          vehicle[key] = {
            value: entry[key],
            type: 'simple'
          }
        }
      }

      vehicle = {
        nickname: vehicle.nickname,
        type: vehicle.type,
        make: vehicle.make,
        year: vehicle.year,
        odometer: vehicle.odometer,
        status: vehicle.status,
        plate: vehicle.plate,
        vehiclePictures: vehicle.vehiclePictures,
        moreDetails: vehicle.moreDetails,
      }

      return vehicle
    })

    // console.log('VEHICLES:', JSON.stringify(vehicles, null, 4))

    return { vehicles }

  } catch (error) {
    //@ts-expect-error This expects any error
    console.log(error.message)
  }
}