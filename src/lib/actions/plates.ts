import type { PrismaClient } from '@prisma/client';

export const getAllPlates = async (instance: PrismaClient) => {
	const plates = await instance.vehiclePlate.findMany({
		include: {
			vehicle: true
		}
	});
	return plates;
};

export const getPlateById = async (instance: PrismaClient, { id }: { id: number }) => {
	const plate = await instance.vehiclePlate.findUnique({
		where: {
			id
		},
		include: {
			vehicle: true
		}
	});
	return plate;
};

export const getPlatesByVehicleId = async (
	instance: PrismaClient,
	{ vehicleId }: { vehicleId: number },
	activeOnly: false
) => {
	let plates;
	if (activeOnly) {
		plates = await instance.vehiclePlate.findMany({
			where: {
				vehicleId,
				isActive: true
			}
		});
	} else {
		plates = await instance.vehiclePlate.findMany({
			where: {
				vehicleId
			}
		});
	}
	return plates;
};
