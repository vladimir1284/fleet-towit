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
import type { PluginProperty } from './PluginProperty';
import {
	PluginPropertyFromJSON,
	PluginPropertyFromJSONTyped,
	PluginPropertyToJSON
} from './PluginProperty';

/**
 *
 * @export
 * @interface PaymentMethodPluginDetail
 */
export interface PaymentMethodPluginDetail {
	/**
	 *
	 * @type {string}
	 * @memberof PaymentMethodPluginDetail
	 */
	externalPaymentMethodId?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof PaymentMethodPluginDetail
	 */
	isDefaultPaymentMethod?: boolean;
	/**
	 *
	 * @type {Array<PluginProperty>}
	 * @memberof PaymentMethodPluginDetail
	 */
	properties?: Array<PluginProperty>;
}

/**
 * Check if a given object implements the PaymentMethodPluginDetail interface.
 */
export function instanceOfPaymentMethodPluginDetail(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function PaymentMethodPluginDetailFromJSON(json: any): PaymentMethodPluginDetail {
	return PaymentMethodPluginDetailFromJSONTyped(json, false);
}

export function PaymentMethodPluginDetailFromJSONTyped(
	json: any,
	ignoreDiscriminator: boolean
): PaymentMethodPluginDetail {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		externalPaymentMethodId: !exists(json, 'externalPaymentMethodId')
			? undefined
			: json['externalPaymentMethodId'],
		isDefaultPaymentMethod: !exists(json, 'isDefaultPaymentMethod')
			? undefined
			: json['isDefaultPaymentMethod'],
		properties: !exists(json, 'properties')
			? undefined
			: (json['properties'] as Array<any>).map(PluginPropertyFromJSON)
	};
}

export function PaymentMethodPluginDetailToJSON(value?: PaymentMethodPluginDetail | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		externalPaymentMethodId: value.externalPaymentMethodId,
		isDefaultPaymentMethod: value.isDefaultPaymentMethod,
		properties:
			value.properties === undefined
				? undefined
				: (value.properties as Array<any>).map(PluginPropertyToJSON)
	};
}
