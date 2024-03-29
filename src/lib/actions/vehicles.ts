import { bypassPrisma } from '$lib/prisma';

export const getAllVehicles = async () => {
	const vehicles = await bypassPrisma.vehicle.findMany({
		include: {
			plates: {
				where: {
					isActive: true,
				}
			},
		}
	});
	const vehiclesWithActualPlate = vehicles.map((v) => {
		return { ...v, plate: v.plates[0] || undefined }
	});

	return vehiclesWithActualPlate
};
