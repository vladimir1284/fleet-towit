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
import type { UnitUsageRecord } from './UnitUsageRecord';
import {
	UnitUsageRecordFromJSON,
	UnitUsageRecordFromJSONTyped,
	UnitUsageRecordToJSON
} from './UnitUsageRecord';

/**
 *
 * @export
 * @interface SubscriptionUsageRecord
 */
export interface SubscriptionUsageRecord {
	/**
	 *
	 * @type {string}
	 * @memberof SubscriptionUsageRecord
	 */
	subscriptionId: string;
	/**
	 *
	 * @type {string}
	 * @memberof SubscriptionUsageRecord
	 */
	trackingId?: string;
	/**
	 *
	 * @type {Array<UnitUsageRecord>}
	 * @memberof SubscriptionUsageRecord
	 */
	unitUsageRecords: Array<UnitUsageRecord>;
}

/**
 * Check if a given object implements the SubscriptionUsageRecord interface.
 */
export function instanceOfSubscriptionUsageRecord(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'subscriptionId' in value;
	isInstance = isInstance && 'unitUsageRecords' in value;

	return isInstance;
}

export function SubscriptionUsageRecordFromJSON(json: any): SubscriptionUsageRecord {
	return SubscriptionUsageRecordFromJSONTyped(json, false);
}

export function SubscriptionUsageRecordFromJSONTyped(
	json: any,
	ignoreDiscriminator: boolean
): SubscriptionUsageRecord {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		subscriptionId: json['subscriptionId'],
		trackingId: !exists(json, 'trackingId') ? undefined : json['trackingId'],
		unitUsageRecords: (json['unitUsageRecords'] as Array<any>).map(UnitUsageRecordFromJSON)
	};
}

export function SubscriptionUsageRecordToJSON(value?: SubscriptionUsageRecord | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		subscriptionId: value.subscriptionId,
		trackingId: value.trackingId,
		unitUsageRecords: (value.unitUsageRecords as Array<any>).map(UnitUsageRecordToJSON)
	};
}
