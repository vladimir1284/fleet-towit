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

/**
 *
 * @export
 * @interface InvoiceItem
 */
export interface InvoiceItem {
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	invoiceItemId: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	invoiceId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	linkedInvoiceItemId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	accountId: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	childAccountId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	bundleId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	subscriptionId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	productName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	planName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	phaseName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	usageName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	prettyProductName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	prettyPlanName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	prettyPhaseName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	prettyUsageName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	itemType?: InvoiceItemItemTypeEnum;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	description?: string;
	/**
	 *
	 * @type {Date}
	 * @memberof InvoiceItem
	 */
	startDate?: Date;
	/**
	 *
	 * @type {Date}
	 * @memberof InvoiceItem
	 */
	endDate?: Date;
	/**
	 *
	 * @type {number}
	 * @memberof InvoiceItem
	 */
	amount?: number;
	/**
	 *
	 * @type {number}
	 * @memberof InvoiceItem
	 */
	rate?: number;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	currency?: InvoiceItemCurrencyEnum;
	/**
	 *
	 * @type {number}
	 * @memberof InvoiceItem
	 */
	quantity?: number;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceItem
	 */
	itemDetails?: string;
	/**
	 *
	 * @type {Date}
	 * @memberof InvoiceItem
	 */
	catalogEffectiveDate?: Date;
	/**
	 *
	 * @type {Array<InvoiceItem>}
	 * @memberof InvoiceItem
	 */
	childItems?: Array<InvoiceItem>;
	/**
	 *
	 * @type {Array<AuditLog>}
	 * @memberof InvoiceItem
	 */
	auditLogs?: Array<AuditLog>;
}

/**
 * @export
 */
export const InvoiceItemItemTypeEnum = {
	ExternalCharge: 'EXTERNAL_CHARGE',
	Fixed: 'FIXED',
	Recurring: 'RECURRING',
	RepairAdj: 'REPAIR_ADJ',
	CbaAdj: 'CBA_ADJ',
	CreditAdj: 'CREDIT_ADJ',
	ItemAdj: 'ITEM_ADJ',
	Usage: 'USAGE',
	Tax: 'TAX',
	ParentSummary: 'PARENT_SUMMARY'
} as const;
export type InvoiceItemItemTypeEnum =
	(typeof InvoiceItemItemTypeEnum)[keyof typeof InvoiceItemItemTypeEnum];

/**
 * @export
 */
export const InvoiceItemCurrencyEnum = {
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
export type InvoiceItemCurrencyEnum =
	(typeof InvoiceItemCurrencyEnum)[keyof typeof InvoiceItemCurrencyEnum];

/**
 * Check if a given object implements the InvoiceItem interface.
 */
export function instanceOfInvoiceItem(value: object): boolean {
	let isInstance = true;
	isInstance = isInstance && 'invoiceItemId' in value;
	isInstance = isInstance && 'accountId' in value;

	return isInstance;
}

export function InvoiceItemFromJSON(json: any): InvoiceItem {
	return InvoiceItemFromJSONTyped(json, false);
}

export function InvoiceItemFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvoiceItem {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		invoiceItemId: json['invoiceItemId'],
		invoiceId: !exists(json, 'invoiceId') ? undefined : json['invoiceId'],
		linkedInvoiceItemId: !exists(json, 'linkedInvoiceItemId')
			? undefined
			: json['linkedInvoiceItemId'],
		accountId: json['accountId'],
		childAccountId: !exists(json, 'childAccountId') ? undefined : json['childAccountId'],
		bundleId: !exists(json, 'bundleId') ? undefined : json['bundleId'],
		subscriptionId: !exists(json, 'subscriptionId') ? undefined : json['subscriptionId'],
		productName: !exists(json, 'productName') ? undefined : json['productName'],
		planName: !exists(json, 'planName') ? undefined : json['planName'],
		phaseName: !exists(json, 'phaseName') ? undefined : json['phaseName'],
		usageName: !exists(json, 'usageName') ? undefined : json['usageName'],
		prettyProductName: !exists(json, 'prettyProductName') ? undefined : json['prettyProductName'],
		prettyPlanName: !exists(json, 'prettyPlanName') ? undefined : json['prettyPlanName'],
		prettyPhaseName: !exists(json, 'prettyPhaseName') ? undefined : json['prettyPhaseName'],
		prettyUsageName: !exists(json, 'prettyUsageName') ? undefined : json['prettyUsageName'],
		itemType: !exists(json, 'itemType') ? undefined : json['itemType'],
		description: !exists(json, 'description') ? undefined : json['description'],
		startDate: !exists(json, 'startDate') ? undefined : new Date(json['startDate']),
		endDate: !exists(json, 'endDate') ? undefined : new Date(json['endDate']),
		amount: !exists(json, 'amount') ? undefined : json['amount'],
		rate: !exists(json, 'rate') ? undefined : json['rate'],
		currency: !exists(json, 'currency') ? undefined : json['currency'],
		quantity: !exists(json, 'quantity') ? undefined : json['quantity'],
		itemDetails: !exists(json, 'itemDetails') ? undefined : json['itemDetails'],
		catalogEffectiveDate: !exists(json, 'catalogEffectiveDate')
			? undefined
			: new Date(json['catalogEffectiveDate']),
		childItems: !exists(json, 'childItems')
			? undefined
			: (json['childItems'] as Array<any>).map(InvoiceItemFromJSON),
		auditLogs: !exists(json, 'auditLogs')
			? undefined
			: (json['auditLogs'] as Array<any>).map(AuditLogFromJSON)
	};
}

export function InvoiceItemToJSON(value?: InvoiceItem | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		invoiceItemId: value.invoiceItemId,
		invoiceId: value.invoiceId,
		linkedInvoiceItemId: value.linkedInvoiceItemId,
		accountId: value.accountId,
		childAccountId: value.childAccountId,
		bundleId: value.bundleId,
		subscriptionId: value.subscriptionId,
		productName: value.productName,
		planName: value.planName,
		phaseName: value.phaseName,
		usageName: value.usageName,
		prettyProductName: value.prettyProductName,
		prettyPlanName: value.prettyPlanName,
		prettyPhaseName: value.prettyPhaseName,
		prettyUsageName: value.prettyUsageName,
		itemType: value.itemType,
		description: value.description,
		startDate:
			value.startDate === undefined ? undefined : value.startDate.toISOString().substr(0, 10),
		endDate: value.endDate === undefined ? undefined : value.endDate.toISOString().substr(0, 10),
		amount: value.amount,
		rate: value.rate,
		currency: value.currency,
		quantity: value.quantity,
		itemDetails: value.itemDetails,
		catalogEffectiveDate:
			value.catalogEffectiveDate === undefined
				? undefined
				: value.catalogEffectiveDate.toISOString(),
		childItems:
			value.childItems === undefined
				? undefined
				: (value.childItems as Array<any>).map(InvoiceItemToJSON),
		auditLogs:
			value.auditLogs === undefined
				? undefined
				: (value.auditLogs as Array<any>).map(AuditLogToJSON)
	};
}
