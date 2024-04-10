//@ts-nocheck

import path from 'path';
import type { PageServerLoad } from '../../$types';
import { getAllVehicles } from '$lib/actions/vehicles';
//import { TableSolid, ImageSolid, BookSolid, ChartSolid, EyeSolid } from 'flowbite-svelte-icons'

export const load: PageServerLoad = async () => {
	try {
		const vehicles = (await getAllVehicles()).map((vehicle) => ({
			...vehicle,
			moreDetailsRoute: `/vehicles/${vehicle.vin}`
		}));

		return {
			vehicles
		};
	} catch (error) {
		//@ts-expect-error This expects any error
		console.log(error);
		return {
			vehicles: []
		};
	}
};
