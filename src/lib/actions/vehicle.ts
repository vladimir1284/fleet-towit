import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma-client';

const getVehicle = async (vin: string) => {
	try {
		const vehicle = await prisma.vehicle.findUnique({
			where: {
				vin
			},
			include: {
				vehiclePictures: true,
				documents: true,
				costs: true,
				contracts: true,
				tolls: true,
				inspections: true
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
