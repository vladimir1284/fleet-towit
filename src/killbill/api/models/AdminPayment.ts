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
 * @interface AdminPayment
 */
export interface AdminPayment {
    /**
     * 
     * @type {string}
     * @memberof AdminPayment
     */
    lastSuccessPaymentState?: string;
    /**
     * 
     * @type {string}
     * @memberof AdminPayment
     */
    currentPaymentStateName?: string;
    /**
     * 
     * @type {string}
     * @memberof AdminPayment
     */
    transactionStatus?: string;
}

/**
 * Check if a given object implements the AdminPayment interface.
 */
export function instanceOfAdminPayment(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AdminPaymentFromJSON(json: any): AdminPayment {
    return AdminPaymentFromJSONTyped(json, false);
}

export function AdminPaymentFromJSONTyped(json: any, ignoreDiscriminator: boolean): AdminPayment {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'lastSuccessPaymentState': !exists(json, 'lastSuccessPaymentState') ? undefined : json['lastSuccessPaymentState'],
        'currentPaymentStateName': !exists(json, 'currentPaymentStateName') ? undefined : json['currentPaymentStateName'],
        'transactionStatus': !exists(json, 'transactionStatus') ? undefined : json['transactionStatus'],
    };
}

export function AdminPaymentToJSON(value?: AdminPayment | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'lastSuccessPaymentState': value.lastSuccessPaymentState,
        'currentPaymentStateName': value.currentPaymentStateName,
        'transactionStatus': value.transactionStatus,
    };
}
