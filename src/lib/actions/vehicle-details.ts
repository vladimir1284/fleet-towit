import { json } from '@sveltejs/kit';
import prisma from '$lib/prisma-client';

const getVehicleDetails = async (vin: string, detailsCategory: string): any => {
	detailsCategory = detailsCategory.toLowerCase();

	const select = {
		nickname: true
	};

	select[detailsCategory] = true;

	try {
		const vehicle = await prisma.vehicle.findUnique({
			where: {
				vin
			},
			select
		});

		if (!vehicle) throw new Error('Vehicle not found');

		const nickname = vehicle.nickname;
		const records = vehicle[detailsCategory];

		return json(
			{
				records,
				nickname
			},
			{
				status: 201,
				statusText: 'Data sent'
			}
		);
	} catch (error) {
		//@ts-expect-error This expects any error
		console.log(error.message);

		return json(
			{
				costs: [],
				nickname: 'N\\A'
			},
			{
				status: 500,
				//@ts-expect-error This expects any error
				statusText: error.message
			}
		);
	}
};

export default getVehicleDetails;
