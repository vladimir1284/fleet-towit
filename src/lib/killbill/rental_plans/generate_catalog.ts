import type { RentalPlan } from '@prisma/client';
import { create } from 'xmlbuilder2';
import type { XMLBuilder } from 'xmlbuilder2/lib/interfaces';

const VALID_PERIODS = [
	'DAILY',
	'WEEKLY',
	'BIWEEKLY',
	'THIRTY_DAYS',
	'MONTHLY',
	'QUARTERLY',
	'BIANNUAL',
	'ANNUAL',
	'BIENNIAL',
	'NO_BILLING_PERIOD'
];

function getPeriod(p: string): string {
	const pu = p.toUpperCase();
	if (VALID_PERIODS.indexOf(pu) != -1) return pu;

	return 'MONTHLY';
}

function getEffectiveDate(): string {
	return new Date().toISOString();
}

function pushPhase(
	plan: XMLBuilder,
	amount: string,
	periodicity: string,
	currency: string = 'USD'
) {
	plan.ele('initialPhases');

	const phase = plan.ele('finalPhase', { type: 'EVERGREEN' });
	phase.ele('duration').ele('unit').txt('UNLIMITED');

	const recurring = phase.ele('recurring');
	recurring.ele('billingPeriod').txt(periodicity);

	const price = recurring.ele('recurringPrice').ele('price');
	price.ele('currency').txt(currency);
	price.ele('value').txt(amount);
}

function pushPlan(
	plans: XMLBuilder,
	pricePlans: XMLBuilder,
	plan_name: string,
	amount: string,
	periodicity: string,
	currency: string = 'USD',
	product: string = 'Standard'
) {
	// Plan name
	// const price_name = amount.replaceAll('.', '-');
	// const plan_name = `${product}-${periodicity}-${price_name}`.toLowerCase();

	// Add plan to price list
	pricePlans.ele('plan').txt(plan_name);

	// plan root element with plan name
	const plan = plans.ele('plan', { name: plan_name });

	// add plan product
	plan.ele('product').txt(product);

	// push phases
	pushPhase(plan, amount, periodicity, currency);
}

function pushRule(rules: XMLBuilder, type: string, policy: string = 'IMMEDIATE') {
	rules.ele(`${type}Policy`).ele(`${type}PolicyCase`).ele('policy').txt(policy);
}

function pushProduct(products: XMLBuilder, name: string, category: string = 'BASE') {
	products.ele('product', { name: name }).ele('category').txt(category);
}

export function generateCatalog(
	rentalPlans: Array<RentalPlan>,
	product_name: string = 'Rental',
	currency: string = 'USD'
) {
	// Catalog element(root)
	const catalog = create({
		version: '1.0',
		encoding: 'UTF-8'
	}).ele('catalog', {
		'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
		'xsi:noNamespaceSchemaLocation': 'CatalogSchema.xsd'
	});

	// Global elements
	// - effective date
	// - catalog name
	// - recurring billing mode
	catalog.ele('effectiveDate').txt(getEffectiveDate());
	catalog.ele('catalogName').txt(`${product_name}Catalog`);
	catalog.ele('recurringBillingMode').txt('IN_ADVANCE');

	// Currency
	catalog.ele('currencies').ele('currency').txt(currency);

	// Products
	const products = catalog.ele('products');
	pushProduct(products, product_name);

	// Rules
	const rules = catalog.ele('rules');
	pushRule(rules, 'change');
	pushRule(rules, 'cancel');

	// Plans
	const plans = catalog.ele('plans');

	// Price lists
	const pricePlans = catalog
		.ele('priceLists')
		.ele('defaultPriceList', { name: 'DEFAULT' })
		.ele('plans');

	rentalPlans.forEach((plan) => {
		const periodicity = getPeriod(plan.periodicity);
		const amount = plan.amount.toFixed(2);
		pushPlan(plans, pricePlans, plan.name, amount, periodicity, currency, product_name);
	});

	// Get xml and return it
	return catalog.doc().end({ prettyPrint: true });
}
