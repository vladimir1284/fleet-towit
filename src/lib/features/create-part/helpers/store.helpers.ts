import { v4 as uuidv4 } from 'uuid';

import type { WizardPickedVendor, WizardPickedLocation } from '$lib/types';

export const createDefaultPartVendor = (): WizardPickedVendor => ({
	// Part vendor-like.
	uuid: uuidv4(),
	name: '',
	// Garantee the placeholder display.
	cost: ''
});

export const createDefaultPartLocation = (): WizardPickedLocation => ({
	// Part location-like.
	uuid: uuidv4(),
	name: '',
	// Garantee the placeholder display.
	unit: '',
	quantity: ''
});
