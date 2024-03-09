//import { bypassPrisma } from '$lib/prisma';
import prisma from "$lib/prisma-client";

export const getAllVehicles = async () => {
	//const vehicles = await bypassPrisma.vehicle.findMany({});

	const vehicles = await prisma.vehicle.findMany({
		select: {
			id: true,
			vin: true,
			nickname: true,
			type: true,
			year: true,
			make: true,
			model: true,
		}
	});

	return vehicles;
};
