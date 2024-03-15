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
import type { Entity } from './Entity';
import {
    EntityFromJSON,
    EntityFromJSONTyped,
    EntityToJSON,
} from './Entity';

/**
 * 
 * @export
 * @interface AuditLog
 */
export interface AuditLog {
    /**
     * 
     * @type {string}
     * @memberof AuditLog
     */
    changeType?: string;
    /**
     * 
     * @type {Date}
     * @memberof AuditLog
     */
    changeDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof AuditLog
     */
    objectType?: AuditLogObjectTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AuditLog
     */
    objectId?: string;
    /**
     * 
     * @type {string}
     * @memberof AuditLog
     */
    changedBy?: string;
    /**
     * 
     * @type {string}
     * @memberof AuditLog
     */
    reasonCode?: string;
    /**
     * 
     * @type {string}
     * @memberof AuditLog
     */
    comments?: string;
    /**
     * 
     * @type {string}
     * @memberof AuditLog
     */
    userToken?: string;
    /**
     * 
     * @type {Entity}
     * @memberof AuditLog
     */
    history?: Entity;
}


/**
 * @export
 */
export const AuditLogObjectTypeEnum = {
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
export type AuditLogObjectTypeEnum = typeof AuditLogObjectTypeEnum[keyof typeof AuditLogObjectTypeEnum];


/**
 * Check if a given object implements the AuditLog interface.
 */
export function instanceOfAuditLog(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AuditLogFromJSON(json: any): AuditLog {
    return AuditLogFromJSONTyped(json, false);
}

export function AuditLogFromJSONTyped(json: any, ignoreDiscriminator: boolean): AuditLog {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'changeType': !exists(json, 'changeType') ? undefined : json['changeType'],
        'changeDate': !exists(json, 'changeDate') ? undefined : (new Date(json['changeDate'])),
        'objectType': !exists(json, 'objectType') ? undefined : json['objectType'],
        'objectId': !exists(json, 'objectId') ? undefined : json['objectId'],
        'changedBy': !exists(json, 'changedBy') ? undefined : json['changedBy'],
        'reasonCode': !exists(json, 'reasonCode') ? undefined : json['reasonCode'],
        'comments': !exists(json, 'comments') ? undefined : json['comments'],
        'userToken': !exists(json, 'userToken') ? undefined : json['userToken'],
        'history': !exists(json, 'history') ? undefined : EntityFromJSON(json['history']),
    };
}

export function AuditLogToJSON(value?: AuditLog | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'changeType': value.changeType,
        'changeDate': value.changeDate === undefined ? undefined : (value.changeDate.toISOString()),
        'objectType': value.objectType,
        'objectId': value.objectId,
        'changedBy': value.changedBy,
        'reasonCode': value.reasonCode,
        'comments': value.comments,
        'userToken': value.userToken,
        'history': EntityToJSON(value.history),
    };
}

