//@ts-nocheck
import type { PageServerLoad } from '../../$types';
import { PrismaClient } from '@prisma/client';
//import { TableSolid, ImageSolid, BookSolid, ChartSolid, EyeSolid } from 'flowbite-svelte-icons'

const prisma = new PrismaClient();

export const load: PageServerLoad = async () => {
	try {
		const vehicles =
			await prisma.vehicle.findMany(/*{
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
    }*/);

		const details = {
			pictures: {
				icon: 'ImageSolid'
			},
			documents: {
				icon: 'BookSolid'
			},
			costs: {
				icon: 'ChartSolid'
			},
			contracts: {
				icon: 'BookSolid'
			},
			tolls: {
				icon: 'BookSolid'
			},
			inspections: {
				icon: 'BookSolid'
			}
		};

		return {
			vehicles,
			details
		};
	} catch (error) {
		//@ts-expect-error This expects any error
		console.log(error);
	}
};
