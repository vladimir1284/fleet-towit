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
 * @interface UsageRecord
 */
export interface UsageRecord {
	/**
	 *
	 * @type {Date}
	 * @memberof UsageRecord
	 */
	recordDate?: Date;
	/**
	 *
	 * @type {number}
	 * @memberof UsageRecord
	 */
	amount?: number;
}

/**
 * Check if a given object implements the UsageRecord interface.
 */
export function instanceOfUsageRecord(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function UsageRecordFromJSON(json: any): UsageRecord {
	return UsageRecordFromJSONTyped(json, false);
}

export function UsageRecordFromJSONTyped(json: any, ignoreDiscriminator: boolean): UsageRecord {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		recordDate: !exists(json, 'recordDate') ? undefined : new Date(json['recordDate']),
		amount: !exists(json, 'amount') ? undefined : json['amount']
	};
}

export function UsageRecordToJSON(value?: UsageRecord | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		recordDate: value.recordDate === undefined ? undefined : value.recordDate.toISOString(),
		amount: value.amount
	};
}
