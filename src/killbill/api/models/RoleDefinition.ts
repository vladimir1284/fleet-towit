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
 * @interface RoleDefinition
 */
export interface RoleDefinition {
	/**
	 *
	 * @type {string}
	 * @memberof RoleDefinition
	 */
	role: string;
	/**
	 *
	 * @type {Array<string>}
	 * @memberof RoleDefinition
	 */
	permissions: Array<string>;
}

/**
 * Check if a given object implements the RoleDefinition interface.
 */
export function instanceOfRoleDefinition(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'role' in value;
	isInstance = isInstance && 'permissions' in value;

	return isInstance;
}

export function RoleDefinitionFromJSON(json: any): RoleDefinition {
	return RoleDefinitionFromJSONTyped(json, false);
}

export function RoleDefinitionFromJSONTyped(
	json: any,
	ignoreDiscriminator: boolean
): RoleDefinition {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		role: json['role'],
		permissions: json['permissions']
	};
}

export function RoleDefinitionToJSON(value?: RoleDefinition | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		role: value.role,
		permissions: value.permissions
	};
}
