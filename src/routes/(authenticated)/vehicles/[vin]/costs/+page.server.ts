//@ts-nocheck
import type { PageServerLoad } from '../../../$types';

export const load: PageServerLoad = async ({ params }) => {
	const vin = params.vin;

	return { vin };
};
