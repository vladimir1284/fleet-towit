/* tslint:disable */
/* eslint-disable */
/**
 * Kill Bill
 * Kill Bill is an open-source billing and payments platform
 *
 * The version of the OpenAPI document: 0.24.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 *
 * @export
 * @interface CatalogValidationError
 */
export interface CatalogValidationError {
	/**
	 *
	 * @type {string}
	 * @memberof CatalogValidationError
	 */
	errorDescription?: string;
}

/**
 * Check if a given object implements the CatalogValidationError interface.
 */
export function instanceOfCatalogValidationError(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function CatalogValidationErrorFromJSON(json: any): CatalogValidationError {
	return CatalogValidationErrorFromJSONTyped(json, false);
}

export function CatalogValidationErrorFromJSONTyped(
	json: any,
	ignoreDiscriminator: boolean
): CatalogValidationError {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		errorDescription: !exists(json, 'errorDescription') ? undefined : json['errorDescription']
	};
}

export function CatalogValidationErrorToJSON(value?: CatalogValidationError | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		errorDescription: value.errorDescription
	};
}
