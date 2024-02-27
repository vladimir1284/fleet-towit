import { bypassPrisma } from '$lib/prisma';

export const getAllVehicles = async () => {
	const vehicles = await bypassPrisma.vehicle.findMany({});
	return vehicles;
};
