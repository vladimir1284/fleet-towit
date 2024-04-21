/* tslint:disable */
/* eslint-disable */
import { reqInvoiceApi } from '../requests';
import * as runtime from '../api/runtime';
import { InvoiceApi, InvoiceItemApi, type GetInvoicesRequest } from '../api/apis';
import type { Invoice } from '../api/models/Invoice';
import type {} from '@prisma/client';

export class customReqInvoiceApi {
	constructor() {}

	static async getLatestInvoices(
		requestParameters: GetInvoicesRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<Invoice>> {
		const totalInvoices = await customReqInvoiceApi.countInvoices();
		const limit = requestParameters.limit || 100;
		const offset = Math.max(totalInvoices - limit, 0);

		return await reqInvoiceApi.getInvoices({ ...requestParameters, offset }, initOverrides);
	}

	static async countInvoices(offset = 0): Promise<number> {
		// TODO if (lo voy a almacenar en un store o algo) return eso (en ese caso hay que hacer un ajuste para que se actualice en cada peticion pero esta ves desde el ultimo)
		try {
			const limit = 100;
			const response = await reqInvoiceApi.getInvoices({ offset, limit });
			const invoices = response;

			if (invoices.length === 0 || invoices.length < limit) {
				return offset + invoices.length;
			}
			const nextOffset = offset + limit;
			const remainingInvoicesCount = await customReqInvoiceApi.countInvoices(nextOffset);

			return remainingInvoicesCount;
		} catch (error) {
			console.error('Error counting invoices:', error);
			throw error;
		}
	}
	static async getFirstUnpaidInvoices(): Promise<Invoice> {
		// empieza a recorrer los invoicces hasta que encuientres uno que su invoice.amount sea mayor a 0
	}
}
