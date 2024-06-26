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
import { AuditLogFromJSON, AuditLogFromJSONTyped, AuditLogToJSON } from './AuditLog';
import type { InvoiceItem } from './InvoiceItem';
import { InvoiceItemFromJSON, InvoiceItemFromJSONTyped, InvoiceItemToJSON } from './InvoiceItem';

/**
 *
 * @export
 * @interface Invoice
 */
export interface Invoice {
	/**
	 *
	 * @type {number}
	 * @memberof Invoice
	 */
	amount?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Invoice
	 */
	currency?: InvoiceCurrencyEnum;
	/**
	 *
	 * @type {string}
	 * @memberof Invoice
	 */
	status?: InvoiceStatusEnum;
	/**
	 *
	 * @type {number}
	 * @memberof Invoice
	 */
	creditAdj?: number;
	/**
	 *
	 * @type {number}
	 * @memberof Invoice
	 */
	refundAdj?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Invoice
	 */
	invoiceId?: string;
	/**
	 *
	 * @type {Date}
	 * @memberof Invoice
	 */
	invoiceDate?: Date;
	/**
	 *
	 * @type {Date}
	 * @memberof Invoice
	 */
	targetDate?: Date;
	/**
	 *
	 * @type {string}
	 * @memberof Invoice
	 */
	invoiceNumber?: string;
	/**
	 *
	 * @type {number}
	 * @memberof Invoice
	 */
	balance?: number;
	/**
	 *
	 * @type {string}
	 * @memberof Invoice
	 */
	accountId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Invoice
	 */
	bundleKeys?: string;
	/**
	 *
	 * @type {Array<InvoiceItem>}
	 * @memberof Invoice
	 */
	credits?: Array<InvoiceItem>;
	/**
	 *
	 * @type {Array<InvoiceItem>}
	 * @memberof Invoice
	 */
	items?: Array<InvoiceItem>;
	/**
	 *
	 * @type {Array<string>}
	 * @memberof Invoice
	 */
	trackingIds?: Array<string>;
	/**
	 *
	 * @type {boolean}
	 * @memberof Invoice
	 */
	isParentInvoice?: boolean;
	/**
	 *
	 * @type {string}
	 * @memberof Invoice
	 */
	parentInvoiceId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof Invoice
	 */
	parentAccountId?: string;
	/**
	 *
	 * @type {Array<AuditLog>}
	 * @memberof Invoice
	 */
	auditLogs?: Array<AuditLog>;
}

/**
 * @export
 */
export const InvoiceCurrencyEnum = {
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
export type InvoiceCurrencyEnum = (typeof InvoiceCurrencyEnum)[keyof typeof InvoiceCurrencyEnum];

/**
 * @export
 */
export const InvoiceStatusEnum = {
	Draft: 'DRAFT',
	Committed: 'COMMITTED',
	Void: 'VOID'
} as const;
export type InvoiceStatusEnum = (typeof InvoiceStatusEnum)[keyof typeof InvoiceStatusEnum];

/**
 * Check if a given object implements the Invoice interface.
 */
export function instanceOfInvoice(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function InvoiceFromJSON(json: any): Invoice {
	return InvoiceFromJSONTyped(json, false);
}

export function InvoiceFromJSONTyped(json: any, ignoreDiscriminator: boolean): Invoice {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		amount: !exists(json, 'amount') ? undefined : json['amount'],
		currency: !exists(json, 'currency') ? undefined : json['currency'],
		status: !exists(json, 'status') ? undefined : json['status'],
		creditAdj: !exists(json, 'creditAdj') ? undefined : json['creditAdj'],
		refundAdj: !exists(json, 'refundAdj') ? undefined : json['refundAdj'],
		invoiceId: !exists(json, 'invoiceId') ? undefined : json['invoiceId'],
		invoiceDate: !exists(json, 'invoiceDate') ? undefined : new Date(json['invoiceDate']),
		targetDate: !exists(json, 'targetDate') ? undefined : new Date(json['targetDate']),
		invoiceNumber: !exists(json, 'invoiceNumber') ? undefined : json['invoiceNumber'],
		balance: !exists(json, 'balance') ? undefined : json['balance'],
		accountId: !exists(json, 'accountId') ? undefined : json['accountId'],
		bundleKeys: !exists(json, 'bundleKeys') ? undefined : json['bundleKeys'],
		credits: !exists(json, 'credits')
			? undefined
			: (json['credits'] as Array<any>).map(InvoiceItemFromJSON),
		items: !exists(json, 'items')
			? undefined
			: (json['items'] as Array<any>).map(InvoiceItemFromJSON),
		trackingIds: !exists(json, 'trackingIds') ? undefined : json['trackingIds'],
		isParentInvoice: !exists(json, 'isParentInvoice') ? undefined : json['isParentInvoice'],
		parentInvoiceId: !exists(json, 'parentInvoiceId') ? undefined : json['parentInvoiceId'],
		parentAccountId: !exists(json, 'parentAccountId') ? undefined : json['parentAccountId'],
		auditLogs: !exists(json, 'auditLogs')
			? undefined
			: (json['auditLogs'] as Array<any>).map(AuditLogFromJSON)
	};
}

export function InvoiceToJSON(value?: Invoice | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		amount: value.amount,
		currency: value.currency,
		status: value.status,
		creditAdj: value.creditAdj,
		refundAdj: value.refundAdj,
		invoiceId: value.invoiceId,
		invoiceDate:
			value.invoiceDate === undefined ? undefined : value.invoiceDate.toISOString().substr(0, 10),
		targetDate:
			value.targetDate === undefined ? undefined : value.targetDate.toISOString().substr(0, 10),
		invoiceNumber: value.invoiceNumber,
		balance: value.balance,
		accountId: value.accountId,
		bundleKeys: value.bundleKeys,
		credits:
			value.credits === undefined
				? undefined
				: (value.credits as Array<any>).map(InvoiceItemToJSON),
		items:
			value.items === undefined ? undefined : (value.items as Array<any>).map(InvoiceItemToJSON),
		trackingIds: value.trackingIds,
		isParentInvoice: value.isParentInvoice,
		parentInvoiceId: value.parentInvoiceId,
		parentAccountId: value.parentAccountId,
		auditLogs:
			value.auditLogs === undefined
				? undefined
				: (value.auditLogs as Array<any>).map(AuditLogToJSON)
	};
}
