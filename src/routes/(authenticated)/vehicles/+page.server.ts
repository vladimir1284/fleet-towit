//@ts-nocheck

import path from "path"
import type { PageServerLoad } from "../../$types"
import { PrismaClient } from '@prisma/client'
//import { TableSolid, ImageSolid, BookSolid, ChartSolid, EyeSolid } from 'flowbite-svelte-icons'

const prisma = new PrismaClient()

export const load: PageServerLoad = async () => {
  try {
    const vehiclesData = await prisma.vehicle.findMany({
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
      "documents",
      "costs",
      "extraFields",
    ]

    const ICONS = {
      extraFields: 'TableSolid',
      vehiclePictures: 'ImageSolid',
      documents: 'BookSolid',
      costs: 'ChartSolid',
      moreDetails: 'EyeSolid'
    }


    return {
      vehiclesData
    }

  } catch (error) {
    //@ts-expect-error This expects any error
    console.log(error)
  }
}