/* tslint:disable */
/* eslint-disable */
import { reqInvoiceApi } from '../requests';
import * as runtime from '../api/runtime';
import { InvoiceApi, InvoiceItemApi, type GetInvoicesRequest } from '../api/apis';
import type { Invoice } from '../api/models/Invoice';
import type {} from '@prisma/client';

export class customReqInvoiceApi {
	constructor() {}

	static async getInvoices(
		requestParameters: GetInvoicesRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<Invoice>> {
		// implementar funcionalidad para que me los retorne siempre los últimos y no los primeros como es por defecto
		return reqInvoiceApi.getInvoices(requestParameters, initOverrides);
	}
}
