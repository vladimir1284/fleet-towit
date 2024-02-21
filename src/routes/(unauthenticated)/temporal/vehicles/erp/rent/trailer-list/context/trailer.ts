import { setContext } from 'svelte';
import { writable } from 'svelte/store';

import type { Vehicle } from '@prisma/client';

export const setTrailerListContext = (trailerList: Vehicle[]): void => {
	const trailers = writable(trailerList);
	setContext('TrailerList', trailers);
};