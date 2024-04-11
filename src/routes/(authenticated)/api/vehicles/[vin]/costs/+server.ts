import getVehicleDetails from '$lib/actions/vehicle-details.js';

export const GET = async ({ locals, params }) => {
	const vin = params.vin;
	return getVehicleDetails(locals.currentInstance.currentPrismaClient, vin, 'costs');
};
