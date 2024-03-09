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
 * @interface Duration
 */
export interface Duration {
    /**
     * 
     * @type {string}
     * @memberof Duration
     */
    unit?: DurationUnitEnum;
    /**
     * 
     * @type {number}
     * @memberof Duration
     */
    number?: number;
}


/**
 * @export
 */
export const DurationUnitEnum = {
    Days: 'DAYS',
    Weeks: 'WEEKS',
    Months: 'MONTHS',
    Years: 'YEARS',
    Unlimited: 'UNLIMITED'
} as const;
export type DurationUnitEnum = typeof DurationUnitEnum[keyof typeof DurationUnitEnum];


/**
 * Check if a given object implements the Duration interface.
 */
export function instanceOfDuration(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function DurationFromJSON(json: any): Duration {
    return DurationFromJSONTyped(json, false);
}

export function DurationFromJSONTyped(json: any, ignoreDiscriminator: boolean): Duration {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'unit': !exists(json, 'unit') ? undefined : json['unit'],
        'number': !exists(json, 'number') ? undefined : json['number'],
    };
}

export function DurationToJSON(value?: Duration | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'unit': value.unit,
        'number': value.number,
    };
}

