import type { PrismaClient } from '@prisma/client';

export const getAllVehicles = async (instance: PrismaClient) => {
	const vehicles = await instance.vehicle.findMany({
		include: {
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
	const vehiclesWithActualPlate = vehicles.map((v) => {
		return { ...v, plate: v.plates[0] || undefined };
	});
	return vehiclesWithActualPlate;
}