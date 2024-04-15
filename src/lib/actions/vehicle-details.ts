import { json } from '@sveltejs/kit';
import type { PrismaClient } from '@prisma/client';

const getVehicleDetails = async (
	instance: PrismaClient,
	vin: string,
	detailsCategory: string
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
	detailsCategory = detailsCategory.toLowerCase();

	const select: { [key: string]: boolean } = {
		nickname: true
	};

	select[detailsCategory] = true;

	try {
		const vehicle = await instance.vehicle.findUnique({
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
