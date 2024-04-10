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

/**
 *
 * @export
 * @interface TenantKeyValue
 */
export interface TenantKeyValue {
	/**
	 *
	 * @type {string}
	 * @memberof TenantKeyValue
	 */
	key?: string;
	/**
	 *
	 * @type {Array<string>}
	 * @memberof TenantKeyValue
	 */
	values?: Array<string>;
	/**
	 *
	 * @type {Array<AuditLog>}
	 * @memberof TenantKeyValue
	 */
	auditLogs?: Array<AuditLog>;
}

/**
 * Check if a given object implements the TenantKeyValue interface.
 */
export function instanceOfTenantKeyValue(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function TenantKeyValueFromJSON(json: any): TenantKeyValue {
	return TenantKeyValueFromJSONTyped(json, false);
}

export function TenantKeyValueFromJSONTyped(
	json: any,
	ignoreDiscriminator: boolean
): TenantKeyValue {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		key: !exists(json, 'key') ? undefined : json['key'],
		values: !exists(json, 'values') ? undefined : json['values'],
		auditLogs: !exists(json, 'auditLogs')
			? undefined
			: (json['auditLogs'] as Array<any>).map(AuditLogFromJSON)
	};
}

export function TenantKeyValueToJSON(value?: TenantKeyValue | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		key: value.key,
		values: value.values,
		auditLogs:
			value.auditLogs === undefined
				? undefined
				: (value.auditLogs as Array<any>).map(AuditLogToJSON)
	};
}
