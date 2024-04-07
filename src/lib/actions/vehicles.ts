import { bypassPrisma } from '$lib/prisma';

export const getAllVehicles = async () => {
	const vehicles = await bypassPrisma.vehicle.findMany({
		include: {
			tracker: { include: {heartBeats: { orderBy: { timeStamp: 'desc' }}}},
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
