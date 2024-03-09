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
import type { PriceList } from './PriceList';
import {
    PriceListFromJSON,
    PriceListFromJSONTyped,
    PriceListToJSON,
} from './PriceList';
import type { Product } from './Product';
import {
    ProductFromJSON,
    ProductFromJSONTyped,
    ProductToJSON,
} from './Product';
import type { Unit } from './Unit';
import {
    UnitFromJSON,
    UnitFromJSONTyped,
    UnitToJSON,
} from './Unit';

/**
 * 
 * @export
 * @interface Catalog
 */
export interface Catalog {
    /**
     * 
     * @type {string}
     * @memberof Catalog
     */
    name?: string;
    /**
     * 
     * @type {Date}
     * @memberof Catalog
     */
    effectiveDate?: Date;
    /**
     * 
     * @type {Array<string>}
     * @memberof Catalog
     */
    currencies?: Array<CatalogCurrenciesEnum>;
    /**
     * 
     * @type {Array<Unit>}
     * @memberof Catalog
     */
    units?: Array<Unit>;
    /**
     * 
     * @type {Array<Product>}
     * @memberof Catalog
     */
    products?: Array<Product>;
    /**
     * 
     * @type {Array<PriceList>}
     * @memberof Catalog
     */
    priceLists?: Array<PriceList>;
}


/**
 * @export
 */
export const CatalogCurrenciesEnum = {
    Aed: 'AED',
    Afn: 'AFN',
    All: 'ALL',
    Amd: 'AMD',
    Ang: 'ANG',
    Aoa: 'AOA',
    Ars: 'ARS',
    Aud: 'AUD',
    Awg: 'AWG',
    Azn: 'AZN',
    Bam: 'BAM',
    Bbd: 'BBD',
    Bdt: 'BDT',
    Bgn: 'BGN',
    Bhd: 'BHD',
    Bif: 'BIF',
    Bmd: 'BMD',
    Bnd: 'BND',
    Bob: 'BOB',
    Brl: 'BRL',
    Bsd: 'BSD',
    Btn: 'BTN',
    Bwp: 'BWP',
    Byr: 'BYR',
    Bzd: 'BZD',
    Cad: 'CAD',
    Cdf: 'CDF',
    Chf: 'CHF',
    Clp: 'CLP',
    Cny: 'CNY',
    Cop: 'COP',
    Crc: 'CRC',
    Cuc: 'CUC',
    Cup: 'CUP',
    Cve: 'CVE',
    Czk: 'CZK',
    Djf: 'DJF',
    Dkk: 'DKK',
    Dop: 'DOP',
    Dzd: 'DZD',
    Egp: 'EGP',
    Ern: 'ERN',
    Etb: 'ETB',
    Eur: 'EUR',
    Fjd: 'FJD',
    Fkp: 'FKP',
    Gbp: 'GBP',
    Gel: 'GEL',
    Ggp: 'GGP',
    Ghs: 'GHS',
    Gip: 'GIP',
    Gmd: 'GMD',
    Gnf: 'GNF',
    Gtq: 'GTQ',
    Gyd: 'GYD',
    Hkd: 'HKD',
    Hnl: 'HNL',
    Hrk: 'HRK',
    Htg: 'HTG',
    Huf: 'HUF',
    Idr: 'IDR',
    Ils: 'ILS',
    Imp: 'IMP',
    Inr: 'INR',
    Iqd: 'IQD',
    Irr: 'IRR',
    Isk: 'ISK',
    Jep: 'JEP',
    Jmd: 'JMD',
    Jod: 'JOD',
    Jpy: 'JPY',
    Kes: 'KES',
    Kgs: 'KGS',
    Khr: 'KHR',
    Kmf: 'KMF',
    Kpw: 'KPW',
    Krw: 'KRW',
    Kwd: 'KWD',
    Kyd: 'KYD',
    Kzt: 'KZT',
    Lak: 'LAK',
    Lbp: 'LBP',
    Lkr: 'LKR',
    Lrd: 'LRD',
    Lsl: 'LSL',
    Ltl: 'LTL',
    Lvl: 'LVL',
    Lyd: 'LYD',
    Mad: 'MAD',
    Mdl: 'MDL',
    Mga: 'MGA',
    Mkd: 'MKD',
    Mmk: 'MMK',
    Mnt: 'MNT',
    Mop: 'MOP',
    Mro: 'MRO',
    Mur: 'MUR',
    Mvr: 'MVR',
    Mwk: 'MWK',
    Mxn: 'MXN',
    Myr: 'MYR',
    Mzn: 'MZN',
    Nad: 'NAD',
    Ngn: 'NGN',
    Nio: 'NIO',
    Nok: 'NOK',
    Npr: 'NPR',
    Nzd: 'NZD',
    Omr: 'OMR',
    Pab: 'PAB',
    Pen: 'PEN',
    Pgk: 'PGK',
    Php: 'PHP',
    Pkr: 'PKR',
    Pln: 'PLN',
    Pyg: 'PYG',
    Qar: 'QAR',
    Ron: 'RON',
    Rsd: 'RSD',
    Rub: 'RUB',
    Rwf: 'RWF',
    Sar: 'SAR',
    Sbd: 'SBD',
    Scr: 'SCR',
    Sdg: 'SDG',
    Sek: 'SEK',
    Sgd: 'SGD',
    Shp: 'SHP',
    Sll: 'SLL',
    Sos: 'SOS',
    Spl: 'SPL',
    Srd: 'SRD',
    Std: 'STD',
    Svc: 'SVC',
    Syp: 'SYP',
    Szl: 'SZL',
    Thb: 'THB',
    Tjs: 'TJS',
    Tmt: 'TMT',
    Tnd: 'TND',
    Top: 'TOP',
    Try: 'TRY',
    Ttd: 'TTD',
    Tvd: 'TVD',
    Twd: 'TWD',
    Tzs: 'TZS',
    Uah: 'UAH',
    Ugx: 'UGX',
    Usd: 'USD',
    Uyu: 'UYU',
    Uzs: 'UZS',
    Vef: 'VEF',
    Vnd: 'VND',
    Vuv: 'VUV',
    Wst: 'WST',
    Xaf: 'XAF',
    Xcd: 'XCD',
    Xdr: 'XDR',
    Xof: 'XOF',
    Xpf: 'XPF',
    Yer: 'YER',
    Zar: 'ZAR',
    Zmw: 'ZMW',
    Zwd: 'ZWD',
    Btc: 'BTC'
} as const;
export type CatalogCurrenciesEnum = typeof CatalogCurrenciesEnum[keyof typeof CatalogCurrenciesEnum];


/**
 * Check if a given object implements the Catalog interface.
 */
export function instanceOfCatalog(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CatalogFromJSON(json: any): Catalog {
    return CatalogFromJSONTyped(json, false);
}

export function CatalogFromJSONTyped(json: any, ignoreDiscriminator: boolean): Catalog {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'name': !exists(json, 'name') ? undefined : json['name'],
        'effectiveDate': !exists(json, 'effectiveDate') ? undefined : (new Date(json['effectiveDate'])),
        'currencies': !exists(json, 'currencies') ? undefined : json['currencies'],
        'units': !exists(json, 'units') ? undefined : ((json['units'] as Array<any>).map(UnitFromJSON)),
        'products': !exists(json, 'products') ? undefined : ((json['products'] as Array<any>).map(ProductFromJSON)),
        'priceLists': !exists(json, 'priceLists') ? undefined : ((json['priceLists'] as Array<any>).map(PriceListFromJSON)),
    };
}

export function CatalogToJSON(value?: Catalog | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'name': value.name,
        'effectiveDate': value.effectiveDate === undefined ? undefined : (value.effectiveDate.toISOString()),
        'currencies': value.currencies,
        'units': value.units === undefined ? undefined : ((value.units as Array<any>).map(UnitToJSON)),
        'products': value.products === undefined ? undefined : ((value.products as Array<any>).map(ProductToJSON)),
        'priceLists': value.priceLists === undefined ? undefined : ((value.priceLists as Array<any>).map(PriceListToJSON)),
    };
}

