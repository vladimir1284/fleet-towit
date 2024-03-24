import { v4 as uuidv4 } from 'uuid';

import type { partVendorType, partLocationType } from '$lib/types';

export const createDefaultPartVendor = (): partVendorType => ({
	// Part vendor-like.
	uuid: uuidv4(),
	name: '',
	cost: 0
});

export const createDefaultPartLocation = (): partLocationType => ({
	// Part location-like.
	uuid: uuidv4(),
	name: '',
	unit: 'Foot',
	quantity: 0
});
