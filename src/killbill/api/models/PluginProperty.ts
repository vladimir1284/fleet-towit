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
 * @interface PluginProperty
 */
export interface PluginProperty {
	/**
	 *
	 * @type {string}
	 * @memberof PluginProperty
	 */
	key?: string;
	/**
	 *
	 * @type {string}
	 * @memberof PluginProperty
	 */
	value?: string;
	/**
	 *
	 * @type {boolean}
	 * @memberof PluginProperty
	 */
	isUpdatable?: boolean;
}

/**
 * Check if a given object implements the PluginProperty interface.
 */
export function instanceOfPluginProperty(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function PluginPropertyFromJSON(json: any): PluginProperty {
	return PluginPropertyFromJSONTyped(json, false);
}

export function PluginPropertyFromJSONTyped(
	json: any,
	ignoreDiscriminator: boolean
): PluginProperty {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		key: !exists(json, 'key') ? undefined : json['key'],
		value: !exists(json, 'value') ? undefined : json['value'],
		isUpdatable: !exists(json, 'isUpdatable') ? undefined : json['isUpdatable']
	};
}

export function PluginPropertyToJSON(value?: PluginProperty | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		key: value.key,
		value: value.value,
		isUpdatable: value.isUpdatable
	};
}
