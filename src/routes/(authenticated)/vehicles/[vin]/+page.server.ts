import getVehicle from '$lib/actions/vehicle';

export const load = async ({ locals, params }) => {
	const vin = params.vin;
	const vehicle = await getVehicle(locals.currentInstance.currentPrismaClient, vin);

	return {
		vehicle
	};
};
