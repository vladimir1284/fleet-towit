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
import type { PhasePrice } from './PhasePrice';
import { PhasePriceFromJSON, PhasePriceFromJSONTyped, PhasePriceToJSON } from './PhasePrice';

/**
 *
 * @export
 * @interface InvoiceDryRun
 */
export interface InvoiceDryRun {
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	dryRunType?: InvoiceDryRunDryRunTypeEnum;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	dryRunAction?: InvoiceDryRunDryRunActionEnum;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	phaseType?: InvoiceDryRunPhaseTypeEnum;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	productName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	productCategory?: InvoiceDryRunProductCategoryEnum;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	billingPeriod?: InvoiceDryRunBillingPeriodEnum;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	priceListName?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	subscriptionId?: string;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	bundleId?: string;
	/**
	 *
	 * @type {Date}
	 * @memberof InvoiceDryRun
	 */
	effectiveDate?: Date;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	billingPolicy?: InvoiceDryRunBillingPolicyEnum;
	/**
	 *
	 * @type {Array<PhasePrice>}
	 * @memberof InvoiceDryRun
	 */
	priceOverrides?: Array<PhasePrice>;
	/**
	 *
	 * @type {string}
	 * @memberof InvoiceDryRun
	 */
	planName?: string;
}

/**
 * @export
 */
export const InvoiceDryRunDryRunTypeEnum = {
	TargetDate: 'TARGET_DATE',
	UpcomingInvoice: 'UPCOMING_INVOICE',
	SubscriptionAction: 'SUBSCRIPTION_ACTION'
} as const;
export type InvoiceDryRunDryRunTypeEnum =
	(typeof InvoiceDryRunDryRunTypeEnum)[keyof typeof InvoiceDryRunDryRunTypeEnum];

/**
 * @export
 */
export const InvoiceDryRunDryRunActionEnum = {
	StartEntitlement: 'START_ENTITLEMENT',
	StartBilling: 'START_BILLING',
	PauseEntitlement: 'PAUSE_ENTITLEMENT',
	PauseBilling: 'PAUSE_BILLING',
	ResumeEntitlement: 'RESUME_ENTITLEMENT',
	ResumeBilling: 'RESUME_BILLING',
	Phase: 'PHASE',
	Change: 'CHANGE',
	StopEntitlement: 'STOP_ENTITLEMENT',
	StopBilling: 'STOP_BILLING',
	ServiceStateChange: 'SERVICE_STATE_CHANGE'
} as const;
export type InvoiceDryRunDryRunActionEnum =
	(typeof InvoiceDryRunDryRunActionEnum)[keyof typeof InvoiceDryRunDryRunActionEnum];

/**
 * @export
 */
export const InvoiceDryRunPhaseTypeEnum = {
	Trial: 'TRIAL',
	Discount: 'DISCOUNT',
	Fixedterm: 'FIXEDTERM',
	Evergreen: 'EVERGREEN'
} as const;
export type InvoiceDryRunPhaseTypeEnum =
	(typeof InvoiceDryRunPhaseTypeEnum)[keyof typeof InvoiceDryRunPhaseTypeEnum];

/**
 * @export
 */
export const InvoiceDryRunProductCategoryEnum = {
	Base: 'BASE',
	AddOn: 'ADD_ON',
	Standalone: 'STANDALONE'
} as const;
export type InvoiceDryRunProductCategoryEnum =
	(typeof InvoiceDryRunProductCategoryEnum)[keyof typeof InvoiceDryRunProductCategoryEnum];

/**
 * @export
 */
export const InvoiceDryRunBillingPeriodEnum = {
	Daily: 'DAILY',
	Weekly: 'WEEKLY',
	Biweekly: 'BIWEEKLY',
	ThirtyDays: 'THIRTY_DAYS',
	ThirtyOneDays: 'THIRTY_ONE_DAYS',
	SixtyDays: 'SIXTY_DAYS',
	NinetyDays: 'NINETY_DAYS',
	Monthly: 'MONTHLY',
	Bimestrial: 'BIMESTRIAL',
	Quarterly: 'QUARTERLY',
	Triannual: 'TRIANNUAL',
	Biannual: 'BIANNUAL',
	Annual: 'ANNUAL',
	Sesquiennial: 'SESQUIENNIAL',
	Biennial: 'BIENNIAL',
	Triennial: 'TRIENNIAL',
	NoBillingPeriod: 'NO_BILLING_PERIOD'
} as const;
export type InvoiceDryRunBillingPeriodEnum =
	(typeof InvoiceDryRunBillingPeriodEnum)[keyof typeof InvoiceDryRunBillingPeriodEnum];

/**
 * @export
 */
export const InvoiceDryRunBillingPolicyEnum = {
	StartOfTerm: 'START_OF_TERM',
	EndOfTerm: 'END_OF_TERM',
	Immediate: 'IMMEDIATE',
	Illegal: 'ILLEGAL'
} as const;
export type InvoiceDryRunBillingPolicyEnum =
	(typeof InvoiceDryRunBillingPolicyEnum)[keyof typeof InvoiceDryRunBillingPolicyEnum];

/**
 * Check if a given object implements the InvoiceDryRun interface.
 */
export function instanceOfInvoiceDryRun(value: object): boolean {
	let isInstance = true;

	return isInstance;
}

export function InvoiceDryRunFromJSON(json: any): InvoiceDryRun {
	return InvoiceDryRunFromJSONTyped(json, false);
}

export function InvoiceDryRunFromJSONTyped(json: any, ignoreDiscriminator: boolean): InvoiceDryRun {
	if (json === undefined || json === null) {
		return json;
	}
	return {
		dryRunType: !exists(json, 'dryRunType') ? undefined : json['dryRunType'],
		dryRunAction: !exists(json, 'dryRunAction') ? undefined : json['dryRunAction'],
		phaseType: !exists(json, 'phaseType') ? undefined : json['phaseType'],
		productName: !exists(json, 'productName') ? undefined : json['productName'],
		productCategory: !exists(json, 'productCategory') ? undefined : json['productCategory'],
		billingPeriod: !exists(json, 'billingPeriod') ? undefined : json['billingPeriod'],
		priceListName: !exists(json, 'priceListName') ? undefined : json['priceListName'],
		subscriptionId: !exists(json, 'subscriptionId') ? undefined : json['subscriptionId'],
		bundleId: !exists(json, 'bundleId') ? undefined : json['bundleId'],
		effectiveDate: !exists(json, 'effectiveDate') ? undefined : new Date(json['effectiveDate']),
		billingPolicy: !exists(json, 'billingPolicy') ? undefined : json['billingPolicy'],
		priceOverrides: !exists(json, 'priceOverrides')
			? undefined
			: (json['priceOverrides'] as Array<any>).map(PhasePriceFromJSON),
		planName: !exists(json, 'planName') ? undefined : json['planName']
	};
}

export function InvoiceDryRunToJSON(value?: InvoiceDryRun | null): any {
	if (value === undefined) {
		return undefined;
	}
	if (value === null) {
		return null;
	}
	return {
		dryRunType: value.dryRunType,
		dryRunAction: value.dryRunAction,
		phaseType: value.phaseType,
		productName: value.productName,
		productCategory: value.productCategory,
		billingPeriod: value.billingPeriod,
		priceListName: value.priceListName,
		subscriptionId: value.subscriptionId,
		bundleId: value.bundleId,
		effectiveDate:
			value.effectiveDate === undefined
				? undefined
				: value.effectiveDate.toISOString().substr(0, 10),
		billingPolicy: value.billingPolicy,
		priceOverrides:
			value.priceOverrides === undefined
				? undefined
				: (value.priceOverrides as Array<any>).map(PhasePriceToJSON),
		planName: value.planName
	};
}
