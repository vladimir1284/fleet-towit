import { createDefaultPartVendor, createDefaultPartLocation } from './store.helpers';

import type { PartCreationWizard } from '$lib/types';

export const // Customized part default data.

	DEFAULT_PART_CREATION_DATA: PartCreationWizard = {
		name: '',
		description: '',
		upc: 0,
		number: 0,
		criticalQty: 0,

		// uuid is spreaded in order to allow svelte to track component modifications.
		vendors: [createDefaultPartVendor()],
		locations: [createDefaultPartLocation()],
		categories: []
	};

export const // Part creation inputs.

	PART_NUMBER_LAYOUT_CONSTRAINT = 100,
	PART_QTY_LAYOUT_CONSTRAINT = 100,
	PART_UPC_LAYOUT_CONSTRAINT = 100;
