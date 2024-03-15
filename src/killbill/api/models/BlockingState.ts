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
import {
    AuditLogFromJSON,
    AuditLogFromJSONTyped,
    AuditLogToJSON,
} from './AuditLog';

/**
 * 
 * @export
 * @interface BlockingState
 */
export interface BlockingState {
    /**
     * 
     * @type {string}
     * @memberof BlockingState
     */
    blockedId?: string;
    /**
     * 
     * @type {string}
     * @memberof BlockingState
     */
    stateName?: string;
    /**
     * 
     * @type {string}
     * @memberof BlockingState
     */
    service?: string;
    /**
     * 
     * @type {boolean}
     * @memberof BlockingState
     */
    isBlockChange?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof BlockingState
     */
    isBlockEntitlement?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof BlockingState
     */
    isBlockBilling?: boolean;
    /**
     * 
     * @type {Date}
     * @memberof BlockingState
     */
    effectiveDate?: Date;
    /**
     * 
     * @type {string}
     * @memberof BlockingState
     */
    type?: BlockingStateTypeEnum;
    /**
     * 
     * @type {Array<AuditLog>}
     * @memberof BlockingState
     */
    auditLogs?: Array<AuditLog>;
}


/**
 * @export
 */
export const BlockingStateTypeEnum = {
    Subscription: 'SUBSCRIPTION',
    SubscriptionBundle: 'SUBSCRIPTION_BUNDLE',
    Account: 'ACCOUNT'
} as const;
export type BlockingStateTypeEnum = typeof BlockingStateTypeEnum[keyof typeof BlockingStateTypeEnum];


/**
 * Check if a given object implements the BlockingState interface.
 */
export function instanceOfBlockingState(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BlockingStateFromJSON(json: any): BlockingState {
    return BlockingStateFromJSONTyped(json, false);
}

export function BlockingStateFromJSONTyped(json: any, ignoreDiscriminator: boolean): BlockingState {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'blockedId': !exists(json, 'blockedId') ? undefined : json['blockedId'],
        'stateName': !exists(json, 'stateName') ? undefined : json['stateName'],
        'service': !exists(json, 'service') ? undefined : json['service'],
        'isBlockChange': !exists(json, 'isBlockChange') ? undefined : json['isBlockChange'],
        'isBlockEntitlement': !exists(json, 'isBlockEntitlement') ? undefined : json['isBlockEntitlement'],
        'isBlockBilling': !exists(json, 'isBlockBilling') ? undefined : json['isBlockBilling'],
        'effectiveDate': !exists(json, 'effectiveDate') ? undefined : (new Date(json['effectiveDate'])),
        'type': !exists(json, 'type') ? undefined : json['type'],
        'auditLogs': !exists(json, 'auditLogs') ? undefined : ((json['auditLogs'] as Array<any>).map(AuditLogFromJSON)),
    };
}

export function BlockingStateToJSON(value?: BlockingState | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'blockedId': value.blockedId,
        'stateName': value.stateName,
        'service': value.service,
        'isBlockChange': value.isBlockChange,
        'isBlockEntitlement': value.isBlockEntitlement,
        'isBlockBilling': value.isBlockBilling,
        'effectiveDate': value.effectiveDate === undefined ? undefined : (value.effectiveDate.toISOString()),
        'type': value.type,
        'auditLogs': value.auditLogs === undefined ? undefined : ((value.auditLogs as Array<any>).map(AuditLogToJSON)),
    };
}

