import { bypassPrisma } from '$lib/prisma';

export const getAllPlates = async () => {
	const plates = await bypassPrisma.vehiclePlate.findMany({
		include: {
			vehicle: true
		}
	});
	return plates;
};

export const getPlateById = async ({ id }: { id: number }) => {
	const plate = await bypassPrisma.vehiclePlate.findUnique({
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
	{ vehicleId }: { vehicleId: number },
	activeOnly: false
) => {
	let plates;
	if (activeOnly) {
		plates = await bypassPrisma.vehiclePlate.findMany({
			where: {
				vehicleId,
				isActive: true
			}
		});
	} else {
		plates = await bypassPrisma.vehiclePlate.findMany({
			where: {
				vehicleId
			}
		});
	}
	return plates;
};
