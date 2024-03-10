import { setContext } from 'svelte';
import { writable } from 'svelte/store';

import type { CustomInventoryPart, PartCreationWizard } from '$lib/types';

export const setPartListContext = (PartList: CustomInventoryPart[]): void => {
	const parts = writable(PartList);
	setContext('PartList', parts);
};

export const setPartCreationWizardContext = (PartWizardData: PartCreationWizard): void => {
	const partCreationFormStore = writable(PartWizardData);
	setContext('PartCreationWizard', partCreationFormStore);
};
