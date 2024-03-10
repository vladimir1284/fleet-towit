import { v4 as uuidv4 } from 'uuid';

import type { WizardPickedVendor, WizardPickedLocation } from '$lib/types';

export const createDefaultPartVendor = (): WizardPickedVendor => ({
	// Part vendor-like.
	uuid: uuidv4(),
	name: '',
	cost: 0.0
});

export const createDefaultPartLocation = (): WizardPickedLocation => ({
	// Part location-like.
	uuid: uuidv4(),
	name: '',
	quantity: 0,
	unit: ''
});
