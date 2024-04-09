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
 * @interface CustomField
 */
export interface CustomField {
	/**
	 *
	 * @type {string}
	 * @memberof CustomField
	 */
	customFieldId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof CustomField
	 */
	objectId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof CustomField
	 */
	objectType?: CustomFieldObjectTypeEnum;
	/**
	 *
	 * @type {string}
	 * @memberof CustomField
	 */
	name: string;
	/**
	 *
	 * @type {string}
	 * @memberof CustomField
	 */
	value: string;
	/**
	 *
	 * @type {Array<AuditLog>}
	 * @memberof CustomField
	 */
	auditLogs?: Array<AuditLog>;
}

/**
 * @export
 */
export const CustomFieldObjectTypeEnum = {
	Account: 'ACCOUNT',
	AccountEmail: 'ACCOUNT_EMAIL',
	BlockingStates: 'BLOCKING_STATES',
	Bundle: 'BUNDLE',
	CustomField: 'CUSTOM_FIELD',
	Invoice: 'INVOICE',
	Payment: 'PAYMENT',
	Transaction: 'TRANSACTION',
	InvoiceItem: 'INVOICE_ITEM',
	InvoicePayment: 'INVOICE_PAYMENT',
	Subscription: 'SUBSCRIPTION',
	SubscriptionEvent: 'SUBSCRIPTION_EVENT',
	ServiceBroadcast: 'SERVICE_BROADCAST',
	PaymentAttempt: 'PAYMENT_ATTEMPT',
	PaymentMethod: 'PAYMENT_METHOD',
	Tag: 'TAG',
	TagDefinition: 'TAG_DEFINITION',
	Tenant: 'TENANT',
	TenantKvs: 'TENANT_KVS'
} as const;
export type CustomFieldObjectTypeEnum =
	(typeof CustomFieldObjectTypeEnum)[keyof typeof CustomFieldObjectTypeEnum];

/**
 * Check if a given object implements the CustomField interface.
 */
export function instanceOfCustomField(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'name' in value;
	isInstance = isInstance && 'value' in value;

	return isInstance;
}

export function CustomFieldFromJSON(json: any): CustomField {
	return CustomFieldFromJSONTyped(json, false);
}

export function CustomFieldFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomField {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		customFieldId: !exists(json, 'customFieldId') ? undefined : json['customFieldId'],
		objectId: !exists(json, 'objectId') ? undefined : json['objectId'],
		objectType: !exists(json, 'objectType') ? undefined : json['objectType'],
		name: json['name'],
		value: json['value'],
		auditLogs: !exists(json, 'auditLogs')
			? undefined
			: (json['auditLogs'] as Array<any>).map(AuditLogFromJSON)
	};
}

export function CustomFieldToJSON(value?: CustomField | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		customFieldId: value.customFieldId,
		objectId: value.objectId,
		objectType: value.objectType,
		name: value.name,
		value: value.value,
		auditLogs:
			value.auditLogs === undefined
				? undefined
				: (value.auditLogs as Array<any>).map(AuditLogToJSON)
	};
}
