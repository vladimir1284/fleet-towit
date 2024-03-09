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
import type { Limit } from './Limit';
import {
    LimitFromJSON,
    LimitFromJSONTyped,
    LimitToJSON,
} from './Limit';
import type { Price } from './Price';
import {
    PriceFromJSON,
    PriceFromJSONTyped,
    PriceToJSON,
} from './Price';
import type { TieredBlock } from './TieredBlock';
import {
    TieredBlockFromJSON,
    TieredBlockFromJSONTyped,
    TieredBlockToJSON,
} from './TieredBlock';

/**
 * 
 * @export
 * @interface Tier
 */
export interface Tier {
    /**
     * 
     * @type {Array<Limit>}
     * @memberof Tier
     */
    limits?: Array<Limit>;
    /**
     * 
     * @type {Array<Price>}
     * @memberof Tier
     */
    fixedPrice?: Array<Price>;
    /**
     * 
     * @type {Array<Price>}
     * @memberof Tier
     */
    recurringPrice?: Array<Price>;
    /**
     * 
     * @type {Array<TieredBlock>}
     * @memberof Tier
     */
    blocks?: Array<TieredBlock>;
}

/**
 * Check if a given object implements the Tier interface.
 */
export function instanceOfTier(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function TierFromJSON(json: any): Tier {
    return TierFromJSONTyped(json, false);
}

export function TierFromJSONTyped(json: any, ignoreDiscriminator: boolean): Tier {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'limits': !exists(json, 'limits') ? undefined : ((json['limits'] as Array<any>).map(LimitFromJSON)),
        'fixedPrice': !exists(json, 'fixedPrice') ? undefined : ((json['fixedPrice'] as Array<any>).map(PriceFromJSON)),
        'recurringPrice': !exists(json, 'recurringPrice') ? undefined : ((json['recurringPrice'] as Array<any>).map(PriceFromJSON)),
        'blocks': !exists(json, 'blocks') ? undefined : ((json['blocks'] as Array<any>).map(TieredBlockFromJSON)),
    };
}

export function TierToJSON(value?: Tier | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'limits': value.limits === undefined ? undefined : ((value.limits as Array<any>).map(LimitToJSON)),
        'fixedPrice': value.fixedPrice === undefined ? undefined : ((value.fixedPrice as Array<any>).map(PriceToJSON)),
        'recurringPrice': value.recurringPrice === undefined ? undefined : ((value.recurringPrice as Array<any>).map(PriceToJSON)),
        'blocks': value.blocks === undefined ? undefined : ((value.blocks as Array<any>).map(TieredBlockToJSON)),
    };
}

