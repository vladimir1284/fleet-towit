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
import type { Account } from './Account';
import {
    AccountFromJSON,
    AccountFromJSONTyped,
    AccountToJSON,
} from './Account';
import type { AuditLog } from './AuditLog';
import {
    AuditLogFromJSON,
    AuditLogFromJSONTyped,
    AuditLogToJSON,
} from './AuditLog';
import type { HostedPaymentPageFields } from './HostedPaymentPageFields';
import {
    HostedPaymentPageFieldsFromJSON,
    HostedPaymentPageFieldsFromJSONTyped,
    HostedPaymentPageFieldsToJSON,
} from './HostedPaymentPageFields';
import type { PaymentMethod } from './PaymentMethod';
import {
    PaymentMethodFromJSON,
    PaymentMethodFromJSONTyped,
    PaymentMethodToJSON,
} from './PaymentMethod';
import type { PluginProperty } from './PluginProperty';
import {
    PluginPropertyFromJSON,
    PluginPropertyFromJSONTyped,
    PluginPropertyToJSON,
} from './PluginProperty';

/**
 * 
 * @export
 * @interface ComboHostedPaymentPage
 */
export interface ComboHostedPaymentPage {
    /**
     * 
     * @type {Account}
     * @memberof ComboHostedPaymentPage
     */
    account?: Account;
    /**
     * 
     * @type {PaymentMethod}
     * @memberof ComboHostedPaymentPage
     */
    paymentMethod?: PaymentMethod;
    /**
     * 
     * @type {HostedPaymentPageFields}
     * @memberof ComboHostedPaymentPage
     */
    hostedPaymentPageFields?: HostedPaymentPageFields;
    /**
     * 
     * @type {Array<PluginProperty>}
     * @memberof ComboHostedPaymentPage
     */
    paymentMethodPluginProperties?: Array<PluginProperty>;
    /**
     * 
     * @type {Array<AuditLog>}
     * @memberof ComboHostedPaymentPage
     */
    auditLogs?: Array<AuditLog>;
}

/**
 * Check if a given object implements the ComboHostedPaymentPage interface.
 */
export function instanceOfComboHostedPaymentPage(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ComboHostedPaymentPageFromJSON(json: any): ComboHostedPaymentPage {
    return ComboHostedPaymentPageFromJSONTyped(json, false);
}

export function ComboHostedPaymentPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComboHostedPaymentPage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'account': !exists(json, 'account') ? undefined : AccountFromJSON(json['account']),
        'paymentMethod': !exists(json, 'paymentMethod') ? undefined : PaymentMethodFromJSON(json['paymentMethod']),
        'hostedPaymentPageFields': !exists(json, 'hostedPaymentPageFields') ? undefined : HostedPaymentPageFieldsFromJSON(json['hostedPaymentPageFields']),
        'paymentMethodPluginProperties': !exists(json, 'paymentMethodPluginProperties') ? undefined : ((json['paymentMethodPluginProperties'] as Array<any>).map(PluginPropertyFromJSON)),
        'auditLogs': !exists(json, 'auditLogs') ? undefined : ((json['auditLogs'] as Array<any>).map(AuditLogFromJSON)),
    };
}

export function ComboHostedPaymentPageToJSON(value?: ComboHostedPaymentPage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'account': AccountToJSON(value.account),
        'paymentMethod': PaymentMethodToJSON(value.paymentMethod),
        'hostedPaymentPageFields': HostedPaymentPageFieldsToJSON(value.hostedPaymentPageFields),
        'paymentMethodPluginProperties': value.paymentMethodPluginProperties === undefined ? undefined : ((value.paymentMethodPluginProperties as Array<any>).map(PluginPropertyToJSON)),
        'auditLogs': value.auditLogs === undefined ? undefined : ((value.auditLogs as Array<any>).map(AuditLogToJSON)),
    };
}
