import { json } from '@sveltejs/kit';
import type { PrismaClient } from '@prisma/client';

const getVehicle = async (instance: PrismaClient, vin: string) => {
	try {
		const vehicle = await instance.vehicle.findUnique({
			where: {
				vin
			},
			include: {
				vehiclePictures: true,
				documents: true,
				costs: true,
				contracts: true,
				inspections: true,
				plates: {
					where: {
						isActive: true
					}
				},
				tracker: {
					include: {
						heartBeats: {
							orderBy: {
								timeStamp: 'desc'
							}
						}
					}
				}
			}
		});

		if (!vehicle) throw new Error('Vehicle not found');

		vehicle.documents = vehicle.documents.map((document) => {
			const result = { ...document };

			result.isActive = result.isActive ? 'Yes' : 'No';
			result.createdAt = new Date(result.createdAt).toDateString();
			result.expiration_date = new Date(result.expiration_date).toDateString();

			return result;
		});

		return vehicle;
	} catch (error) {
		//@ts-expect-error This expects any error
		console.log(error.message);

		return json({});
	}
};

export default getVehicle;