/* tslint:disable */
/* eslint-disable */
import { reqPaymentApi } from '../requests';
import * as runtime from '../api/runtime';
import { PaymentApi, type GetPaymentsRequest } from '../api/apis';
import type { Invoice } from '../api/models/Invoice';
import type {} from '@prisma/client';

export class customReqPaymentApi {
	constructor() {}

	static async getLatestPayments(
		requestParameters: GetPaymentsRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<Invoice>> {
		const totalPayments = await customReqPaymentApi.countPayments();
		const limit = requestParameters.limit || 100;
		const offset = Math.max(totalPayments - limit, 0);

		return await reqPaymentApi.getPayments({ ...requestParameters, offset }, initOverrides);
	}

	static async countPayments(offset = 0): Promise<number> {
		// TODO if (lo voy a almacenar en un store o algo) return eso (en ese caso hay que hacer un ajuste para que se actualice en cada peticion pero esta ves desde el ultimo)
		try {
			const limit = 100;
			const response = await reqPaymentApi.getPayments({ offset, limit });
			const payments = response;

			if (payments.length === 0 || payments.length < limit) {
				return offset + payments.length;
			}
			const nextOffset = offset + limit;
			const remainingPaymentsCount = await customReqPaymentApi.countPayments(nextOffset);

			return remainingPaymentsCount;
		} catch (error) {
			console.error('Error counting Payments:', error);
			throw error;
		}
	}
}
