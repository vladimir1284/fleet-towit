import path from 'path';
import type { PageServerLoad } from '../../$types';
import { PrismaClient } from '@prisma/client';
import { TableSolid, ImageSolid, BookSolid, ChartSolid } from 'flowbite-svelte-icons';

const prisma = new PrismaClient();

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
				}
			}
		});

		const BASEURL = '/api/v1/vehicles/';

		const COMPOUND_FIELDS = ['extraFields', 'vehiclePictures', 'documents', 'costs'];

		const ICONS = {
			extraFields: 'TableSolid',
			vehiclePictures: 'ImageSolid',
			documents: 'BookSolid',
			costs: 'ChartSolid'
		};

		const vehicles = results.map((entry) => {
			const keys = Object.keys(entry);
			const vehicle = {};

			for (let key of keys) {
				if (COMPOUND_FIELDS.includes(key)) {
					vehicle[key] = {
						value: entry[key],
						type: 'compound',
						button: {
							icon: ICONS[key],
							text: key
						},
						uri: path.join(BASEURL, entry['vin'], key)
					};
				} else {
					vehicle[key] = {
						value: entry[key],
						type: 'simple'
					};
				}
			}

			return vehicle;
		});

		console.log('VEHICLES:', JSON.stringify(vehicles, null, 4));

		return { vehicles };
	} catch (error) {
		//@ts-expect-error This expects any error
		console.log(error.message);
	}
};
