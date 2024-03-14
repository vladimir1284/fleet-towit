import { createDefaultPartVendor, createDefaultPartLocation } from './store.helpers';

export const // Customized part default data.

	DEFAULT_PART_WIZARD_DATA = {
		name: '',
		description: '',
		upc: '',
		number: '',
		criticalQty: '',

		// uuid is spreaded in order to allow svelte to track component modifications.
		vendors: [createDefaultPartVendor()],
		locations: [createDefaultPartLocation()],
		categories: []
	};

export const // Part creation inputs.

	PART_NUMBER_LAYOUT_CONSTRAINT = 100,
	PART_QTY_LAYOUT_CONSTRAINT = 100,
	PART_UPC_LAYOUT_CONSTRAINT = 100;
