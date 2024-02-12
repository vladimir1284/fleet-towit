import type { QueryStringifyContraint } from '../@types/types';

/**
 * Build a FECTH-API valid query parameter pattern.
 * @param {QueryContraint} constraints Custom type-constraint object.
 * @returns {string}
 */

export const buildQueryParams = (constraints: QueryStringifyContraint): string => {
	let queryContraints = '?';
	Object.entries(constraints).forEach(([key, value]) => {
		// Same as queryContraints += ...
		queryContraints = queryContraints.concat(`${key}=${value}&`);
	});
	return queryContraints.slice(0, -1); // Strip the last &.
};
