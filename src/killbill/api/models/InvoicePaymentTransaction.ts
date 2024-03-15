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
import type { InvoiceItem } from './InvoiceItem';
import {
    InvoiceItemFromJSON,
    InvoiceItemFromJSONTyped,
    InvoiceItemToJSON,
} from './InvoiceItem';
import type { PluginProperty } from './PluginProperty';
import {
    PluginPropertyFromJSON,
    PluginPropertyFromJSONTyped,
    PluginPropertyToJSON,
} from './PluginProperty';

/**
 * 
 * @export
 * @interface InvoicePaymentTransaction
 */
export interface InvoicePaymentTransaction {
    /**
     * 
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    transactionId?: string;
    /**
     * 
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    transactionExternalKey?: string;
    /**
     * Associated payment id, required when notifying state transitions
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    paymentId?: string;
    /**
     * 
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    paymentExternalKey?: string;
    /**
     * 
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    transactionType?: InvoicePaymentTransactionTransactionTypeEnum;
    /**
     * Transaction amount, required except for void operations
     * @type {number}
     * @memberof InvoicePaymentTransaction
     */
    amount?: number;
    /**
     * Amount currency (account currency unless specified)
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    currency?: InvoicePaymentTransactionCurrencyEnum;
    /**
     * 
     * @type {Date}
     * @memberof InvoicePaymentTransaction
     */
    effectiveDate?: Date;
    /**
     * 
     * @type {number}
     * @memberof InvoicePaymentTransaction
     */
    processedAmount?: number;
    /**
     * 
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    processedCurrency?: InvoicePaymentTransactionProcessedCurrencyEnum;
    /**
     * Transaction status, required for state change notifications
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    status?: InvoicePaymentTransactionStatusEnum;
    /**
     * 
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    gatewayErrorCode?: string;
    /**
     * 
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    gatewayErrorMsg?: string;
    /**
     * 
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    firstPaymentReferenceId?: string;
    /**
     * 
     * @type {string}
     * @memberof InvoicePaymentTransaction
     */
    secondPaymentReferenceId?: string;
    /**
     * 
     * @type {Array<PluginProperty>}
     * @memberof InvoicePaymentTransaction
     */
    properties?: Array<PluginProperty>;
    /**
     * 
     * @type {boolean}
     * @memberof InvoicePaymentTransaction
     */
    isAdjusted?: boolean;
    /**
     * 
     * @type {Array<InvoiceItem>}
     * @memberof InvoicePaymentTransaction
     */
    adjustments?: Array<InvoiceItem>;
    /**
     * 
     * @type {Array<AuditLog>}
     * @memberof InvoicePaymentTransaction
     */
    auditLogs?: Array<AuditLog>;
}


/**
 * @export
 */
export const InvoicePaymentTransactionTransactionTypeEnum = {
    Authorize: 'AUTHORIZE',
    Capture: 'CAPTURE',
    Chargeback: 'CHARGEBACK',
    Credit: 'CREDIT',
    Purchase: 'PURCHASE',
    Refund: 'REFUND',
    Void: 'VOID'
} as const;
export type InvoicePaymentTransactionTransactionTypeEnum = typeof InvoicePaymentTransactionTransactionTypeEnum[keyof typeof InvoicePaymentTransactionTransactionTypeEnum];

/**
 * @export
 */
export const InvoicePaymentTransactionCurrencyEnum = {
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
export type InvoicePaymentTransactionCurrencyEnum = typeof InvoicePaymentTransactionCurrencyEnum[keyof typeof InvoicePaymentTransactionCurrencyEnum];

/**
 * @export
 */
export const InvoicePaymentTransactionProcessedCurrencyEnum = {
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
export type InvoicePaymentTransactionProcessedCurrencyEnum = typeof InvoicePaymentTransactionProcessedCurrencyEnum[keyof typeof InvoicePaymentTransactionProcessedCurrencyEnum];

/**
 * @export
 */
export const InvoicePaymentTransactionStatusEnum = {
    Success: 'SUCCESS',
    Unknown: 'UNKNOWN',
    Pending: 'PENDING',
    PaymentFailure: 'PAYMENT_FAILURE',
    PluginFailure: 'PLUGIN_FAILURE',
    PaymentSystemOff: 'PAYMENT_SYSTEM_OFF'
} as const;
export type InvoicePaymentTransactionStatusEnum = typeof InvoicePaymentTransactionStatusEnum[keyof typeof InvoicePaymentTransactionStatusEnum];


/**
 * Check if a given object implements the InvoicePaymentTransaction interface.
 */
export function instanceOfInvoicePaymentTransaction(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function InvoicePaymentTransactionFromJSON(json: any): InvoicePaymentTransaction {
    return InvoicePaymentTransactionFromJSONTyped(json, false);
}

export function InvoicePaymentTransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvoicePaymentTransaction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'transactionId': !exists(json, 'transactionId') ? undefined : json['transactionId'],
        'transactionExternalKey': !exists(json, 'transactionExternalKey') ? undefined : json['transactionExternalKey'],
        'paymentId': !exists(json, 'paymentId') ? undefined : json['paymentId'],
        'paymentExternalKey': !exists(json, 'paymentExternalKey') ? undefined : json['paymentExternalKey'],
        'transactionType': !exists(json, 'transactionType') ? undefined : json['transactionType'],
        'amount': !exists(json, 'amount') ? undefined : json['amount'],
        'currency': !exists(json, 'currency') ? undefined : json['currency'],
        'effectiveDate': !exists(json, 'effectiveDate') ? undefined : (new Date(json['effectiveDate'])),
        'processedAmount': !exists(json, 'processedAmount') ? undefined : json['processedAmount'],
        'processedCurrency': !exists(json, 'processedCurrency') ? undefined : json['processedCurrency'],
        'status': !exists(json, 'status') ? undefined : json['status'],
        'gatewayErrorCode': !exists(json, 'gatewayErrorCode') ? undefined : json['gatewayErrorCode'],
        'gatewayErrorMsg': !exists(json, 'gatewayErrorMsg') ? undefined : json['gatewayErrorMsg'],
        'firstPaymentReferenceId': !exists(json, 'firstPaymentReferenceId') ? undefined : json['firstPaymentReferenceId'],
        'secondPaymentReferenceId': !exists(json, 'secondPaymentReferenceId') ? undefined : json['secondPaymentReferenceId'],
        'properties': !exists(json, 'properties') ? undefined : ((json['properties'] as Array<any>).map(PluginPropertyFromJSON)),
        'isAdjusted': !exists(json, 'isAdjusted') ? undefined : json['isAdjusted'],
        'adjustments': !exists(json, 'adjustments') ? undefined : ((json['adjustments'] as Array<any>).map(InvoiceItemFromJSON)),
        'auditLogs': !exists(json, 'auditLogs') ? undefined : ((json['auditLogs'] as Array<any>).map(AuditLogFromJSON)),
    };
}

export function InvoicePaymentTransactionToJSON(value?: InvoicePaymentTransaction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'transactionId': value.transactionId,
        'transactionExternalKey': value.transactionExternalKey,
        'paymentId': value.paymentId,
        'paymentExternalKey': value.paymentExternalKey,
        'transactionType': value.transactionType,
        'amount': value.amount,
        'currency': value.currency,
        'effectiveDate': value.effectiveDate === undefined ? undefined : (value.effectiveDate.toISOString()),
        'processedAmount': value.processedAmount,
        'processedCurrency': value.processedCurrency,
        'status': value.status,
        'gatewayErrorCode': value.gatewayErrorCode,
        'gatewayErrorMsg': value.gatewayErrorMsg,
        'firstPaymentReferenceId': value.firstPaymentReferenceId,
        'secondPaymentReferenceId': value.secondPaymentReferenceId,
        'properties': value.properties === undefined ? undefined : ((value.properties as Array<any>).map(PluginPropertyToJSON)),
        'isAdjusted': value.isAdjusted,
        'adjustments': value.adjustments === undefined ? undefined : ((value.adjustments as Array<any>).map(InvoiceItemToJSON)),
        'auditLogs': value.auditLogs === undefined ? undefined : ((value.auditLogs as Array<any>).map(AuditLogToJSON)),
    };
}

