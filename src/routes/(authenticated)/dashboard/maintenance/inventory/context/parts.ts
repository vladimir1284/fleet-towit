import { setContext } from 'svelte';
import { writable } from 'svelte/store';

import type { CustomInventoryPart } from '../@types/types';

export const setPartListContext = (PartList: CustomInventoryPart[]): void => {
	const parts = writable(PartList);
	setContext('PartList', parts);
};
