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
import type { PaymentMethodPluginDetail } from './PaymentMethodPluginDetail';
import {
    PaymentMethodPluginDetailFromJSON,
    PaymentMethodPluginDetailFromJSONTyped,
    PaymentMethodPluginDetailToJSON,
} from './PaymentMethodPluginDetail';

/**
 * 
 * @export
 * @interface PaymentMethod
 */
export interface PaymentMethod {
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    paymentMethodId?: string;
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    externalKey?: string;
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    accountId?: string;
    /**
     * 
     * @type {boolean}
     * @memberof PaymentMethod
     */
    isDefault?: boolean;
    /**
     * 
     * @type {string}
     * @memberof PaymentMethod
     */
    pluginName?: string;
    /**
     * 
     * @type {PaymentMethodPluginDetail}
     * @memberof PaymentMethod
     */
    pluginInfo?: PaymentMethodPluginDetail;
    /**
     * 
     * @type {Array<AuditLog>}
     * @memberof PaymentMethod
     */
    auditLogs?: Array<AuditLog>;
}

/**
 * Check if a given object implements the PaymentMethod interface.
 */
export function instanceOfPaymentMethod(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PaymentMethodFromJSON(json: any): PaymentMethod {
    return PaymentMethodFromJSONTyped(json, false);
}

export function PaymentMethodFromJSONTyped(json: any, ignoreDiscriminator: boolean): PaymentMethod {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'paymentMethodId': !exists(json, 'paymentMethodId') ? undefined : json['paymentMethodId'],
        'externalKey': !exists(json, 'externalKey') ? undefined : json['externalKey'],
        'accountId': !exists(json, 'accountId') ? undefined : json['accountId'],
        'isDefault': !exists(json, 'isDefault') ? undefined : json['isDefault'],
        'pluginName': !exists(json, 'pluginName') ? undefined : json['pluginName'],
        'pluginInfo': !exists(json, 'pluginInfo') ? undefined : PaymentMethodPluginDetailFromJSON(json['pluginInfo']),
        'auditLogs': !exists(json, 'auditLogs') ? undefined : ((json['auditLogs'] as Array<any>).map(AuditLogFromJSON)),
    };
}

export function PaymentMethodToJSON(value?: PaymentMethod | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'paymentMethodId': value.paymentMethodId,
        'externalKey': value.externalKey,
        'accountId': value.accountId,
        'isDefault': value.isDefault,
        'pluginName': value.pluginName,
        'pluginInfo': PaymentMethodPluginDetailToJSON(value.pluginInfo),
        'auditLogs': value.auditLogs === undefined ? undefined : ((value.auditLogs as Array<any>).map(AuditLogToJSON)),
    };
}

