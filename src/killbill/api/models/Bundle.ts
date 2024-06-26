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
import type { AuditLog } from './AuditLog';
import { AuditLogFromJSON, AuditLogFromJSONTyped, AuditLogToJSON } from './AuditLog';
import type { BundleTimeline } from './BundleTimeline';
import {
	BundleTimelineFromJSON,
	BundleTimelineFromJSONTyped,
	BundleTimelineToJSON
} from './BundleTimeline';
import type { Subscription } from './Subscription';
import {
	SubscriptionFromJSON,
	SubscriptionFromJSONTyped,
	SubscriptionToJSON
} from './Subscription';

/**
 *
 * @export
 * @interface Bundle
 */
export interface Bundle {
	/**
	 *
	 * @type {string}
	 * @memberof Bundle
	 */
	accountId: string;
	/**
	 *
	 * @type {string}
	 * @memberof Bundle
	 */
	bundleId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Bundle
	 */
	externalKey?: string;
	/**
	 *
	 * @type {Array<Subscription>}
	 * @memberof Bundle
	 */
	subscriptions?: Array<Subscription>;
	/**
	 *
	 * @type {BundleTimeline}
	 * @memberof Bundle
	 */
	timeline?: BundleTimeline;
	/**
	 *
	 * @type {Array<AuditLog>}
	 * @memberof Bundle
	 */
	auditLogs?: Array<AuditLog>;
}

/**
 * Check if a given object implements the Bundle interface.
 */
export function instanceOfBundle(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'accountId' in value;

	return isInstance;
}

export function BundleFromJSON(json: any): Bundle {
	return BundleFromJSONTyped(json, false);
}

export function BundleFromJSONTyped(json: any, ignoreDiscriminator: boolean): Bundle {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		accountId: json['accountId'],
		bundleId: !exists(json, 'bundleId') ? undefined : json['bundleId'],
		externalKey: !exists(json, 'externalKey') ? undefined : json['externalKey'],
		subscriptions: !exists(json, 'subscriptions')
			? undefined
			: (json['subscriptions'] as Array<any>).map(SubscriptionFromJSON),
		timeline: !exists(json, 'timeline') ? undefined : BundleTimelineFromJSON(json['timeline']),
		auditLogs: !exists(json, 'auditLogs')
			? undefined
			: (json['auditLogs'] as Array<any>).map(AuditLogFromJSON)
	};
}

export function BundleToJSON(value?: Bundle | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		accountId: value.accountId,
		bundleId: value.bundleId,
		externalKey: value.externalKey,
		subscriptions:
			value.subscriptions === undefined
				? undefined
				: (value.subscriptions as Array<any>).map(SubscriptionToJSON),
		timeline: BundleTimelineToJSON(value.timeline),
		auditLogs:
			value.auditLogs === undefined
				? undefined
				: (value.auditLogs as Array<any>).map(AuditLogToJSON)
	};
}
