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
import type { Plan } from './Plan';
import {
    PlanFromJSON,
    PlanFromJSONTyped,
    PlanToJSON,
} from './Plan';

/**
 * 
 * @export
 * @interface Product
 */
export interface Product {
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    type?: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    name?: string;
    /**
     * 
     * @type {string}
     * @memberof Product
     */
    prettyName?: string;
    /**
     * 
     * @type {Array<Plan>}
     * @memberof Product
     */
    plans?: Array<Plan>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Product
     */
    included?: Array<string>;
    /**
     * 
     * @type {Array<string>}
     * @memberof Product
     */
    available?: Array<string>;
}

/**
 * Check if a given object implements the Product interface.
 */
export function instanceOfProduct(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProductFromJSON(json: any): Product {
    return ProductFromJSONTyped(json, false);
}

export function ProductFromJSONTyped(json: any, ignoreDiscriminator: boolean): Product {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': !exists(json, 'type') ? undefined : json['type'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'prettyName': !exists(json, 'prettyName') ? undefined : json['prettyName'],
        'plans': !exists(json, 'plans') ? undefined : ((json['plans'] as Array<any>).map(PlanFromJSON)),
        'included': !exists(json, 'included') ? undefined : json['included'],
        'available': !exists(json, 'available') ? undefined : json['available'],
    };
}

export function ProductToJSON(value?: Product | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'name': value.name,
        'prettyName': value.prettyName,
        'plans': value.plans === undefined ? undefined : ((value.plans as Array<any>).map(PlanToJSON)),
        'included': value.included,
        'available': value.available,
    };
}
