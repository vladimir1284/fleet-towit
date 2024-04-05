//@ts-nocheck

import path from "path"
import type { PageServerLoad } from "../../$types"
import { PrismaClient } from '@prisma/client'
//import { TableSolid, ImageSolid, BookSolid, ChartSolid, EyeSolid } from 'flowbite-svelte-icons'

const prisma = new PrismaClient()

const toSimpleValue = (entry, key) => {
  let value = {}

  if (Array.isArray(entry[key])) {
    entry[key].forEach(el => {
      value[key] = { value: el[key], type: 'simple' }
    })
  } else if (typeof entry === 'object') {
    const ks = Object.keys(entry[key])
    ks.forEach(k => {
      value[k] = { value: entry[key][k], type: 'simple' }
    })
  } else {
    value = entry[key]
  }

  return value
}

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

    const vehicles = results.map(entry => {
      const keys = Object.keys(entry)
      let vehicle = {}

      for (const key of keys) {
        if (MORE_DETAILS_FIELDS.includes(key)) {
          let moreDetails = {}

          if (Object.keys(vehicle).includes('moreDetails')) {
            moreDetails = { ...vehicle['moreDetails'].value }
          }

          if (COMPOUND_FIELDS.includes(key)) {

            const value = toSimpleValue(entry, key)

            moreDetails[key] = {
              value,
              type: 'compound',
              button: {
                icon: ICONS[key],
                text: key
              },
              uri: path.join(BASEURL, entry['vin'], key)
            }
          } else {
            moreDetails[key] = {
              value: entry[key],
              type: 'simple'
            }
          }

          vehicle['moreDetails'] = {
            value: moreDetails,
            type: 'moreDetails',
            button: {
              icon: ICONS['moreDetails'],
              text: 'More details'
            },
            uri: path.join(BASEURL, entry['vin'], key)
          }
        } else if (COMPOUND_FIELDS.includes(key)) {
          vehicle[key] = {
            value: toSimpleValue(entry, key),
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

    const headers = Array.isArray(data) ? (data.length ? Object.keys(data[0]) : []) : Object.keys(data);

    console.log('HEADERS:', headers);

    // console.log('MORE DETAILS\n' + JSON.stringify(vehicles.map(vehicle => vehicle['moreDetails']), null, 4))

    // console.log('VEHICLES:', JSON.stringify(vehicles, null, 4))

    return {
      data: {
        headers,
        vehicles: results
      }
    }

  } catch (error) {
    //@ts-expect-error This expects any error
    console.log(error.message)
  }
}