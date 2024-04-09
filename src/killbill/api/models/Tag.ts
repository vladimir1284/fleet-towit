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
 * @interface Tag
 */
export interface Tag {
	/**
	 *
	 * @type {string}
	 * @memberof Tag
	 */
	tagId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Tag
	 */
	objectType?: TagObjectTypeEnum;
	/**
	 *
	 * @type {string}
	 * @memberof Tag
	 */
	objectId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Tag
	 */
	tagDefinitionId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Tag
	 */
	tagDefinitionName?: string;
	/**
	 *
	 * @type {Array<AuditLog>}
	 * @memberof Tag
	 */
	auditLogs?: Array<AuditLog>;
}

/**
 * @export
 */
export const TagObjectTypeEnum = {
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
export type TagObjectTypeEnum = (typeof TagObjectTypeEnum)[keyof typeof TagObjectTypeEnum];

/**
 * Check if a given object implements the Tag interface.
 */
export function instanceOfTag(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function TagFromJSON(json: any): Tag {
	return TagFromJSONTyped(json, false);
}

export function TagFromJSONTyped(json: any, ignoreDiscriminator: boolean): Tag {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		tagId: !exists(json, 'tagId') ? undefined : json['tagId'],
		objectType: !exists(json, 'objectType') ? undefined : json['objectType'],
		objectId: !exists(json, 'objectId') ? undefined : json['objectId'],
		tagDefinitionId: !exists(json, 'tagDefinitionId') ? undefined : json['tagDefinitionId'],
		tagDefinitionName: !exists(json, 'tagDefinitionName') ? undefined : json['tagDefinitionName'],
		auditLogs: !exists(json, 'auditLogs')
			? undefined
			: (json['auditLogs'] as Array<any>).map(AuditLogFromJSON)
	};
}

export function TagToJSON(value?: Tag | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		tagId: value.tagId,
		objectType: value.objectType,
		objectId: value.objectId,
		tagDefinitionId: value.tagDefinitionId,
		tagDefinitionName: value.tagDefinitionName,
		auditLogs:
			value.auditLogs === undefined
				? undefined
				: (value.auditLogs as Array<any>).map(AuditLogToJSON)
	};
}
