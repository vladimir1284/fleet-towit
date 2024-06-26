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
import type { Price } from './Price';
import { PriceFromJSON, PriceFromJSONTyped, PriceToJSON } from './Price';

/**
 *
 * @export
 * @interface TieredBlock
 */
export interface TieredBlock {
	/**
	 *
	 * @type {string}
	 * @memberof TieredBlock
	 */
	unit?: string;
	/**
	 *
	 * @type {string}
	 * @memberof TieredBlock
	 */
	size?: string;
	/**
	 *
	 * @type {string}
	 * @memberof TieredBlock
	 */
	max?: string;
	/**
	 *
	 * @type {Array<Price>}
	 * @memberof TieredBlock
	 */
	prices?: Array<Price>;
}

/**
 * Check if a given object implements the TieredBlock interface.
 */
export function instanceOfTieredBlock(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function TieredBlockFromJSON(json: any): TieredBlock {
	return TieredBlockFromJSONTyped(json, false);
}

export function TieredBlockFromJSONTyped(json: any, ignoreDiscriminator: boolean): TieredBlock {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		unit: !exists(json, 'unit') ? undefined : json['unit'],
		size: !exists(json, 'size') ? undefined : json['size'],
		max: !exists(json, 'max') ? undefined : json['max'],
		prices: !exists(json, 'prices') ? undefined : (json['prices'] as Array<any>).map(PriceFromJSON)
	};
}

export function TieredBlockToJSON(value?: TieredBlock | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		unit: value.unit,
		size: value.size,
		max: value.max,
		prices: value.prices === undefined ? undefined : (value.prices as Array<any>).map(PriceToJSON)
	};
}
