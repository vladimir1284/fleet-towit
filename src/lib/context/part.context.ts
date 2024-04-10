import { setContext } from 'svelte';
import { writable } from 'svelte/store';

import type { PartSchema } from '$lib/types';
import type { SuperValidated } from 'sveltekit-superforms';

import type { CustomInventoryPart, PartCreationWizard } from '$lib/types';

export const setPartListContext = (PartList: CustomInventoryPart[]): void => {
	const parts = writable(PartList);
	setContext('PartList', parts);
};

export const setPartCreationWizardContext = (PartWizardData: SuperValidated<PartSchema>): void => {
	const partCreationFormStore = writable(PartWizardData);
	setContext('PartCreationWizard', partCreationFormStore);
};
