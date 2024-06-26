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

import * as runtime from '../runtime';
import type { AuditLog, CustomField, PaymentMethod } from '../models';
import {
	AuditLogFromJSON,
	AuditLogToJSON,
	CustomFieldFromJSON,
	CustomFieldToJSON,
	PaymentMethodFromJSON,
	PaymentMethodToJSON
} from '../models';

export interface CreatePaymentMethodCustomFieldsRequest {
	body: Array<CustomField>;
	paymentMethodId: string;
	xKillbillCreatedBy: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface DeletePaymentMethodRequest {
	paymentMethodId: string;
	xKillbillCreatedBy: string;
	deleteDefaultPmWithAutoPayOff?: boolean;
	forceDefaultPmDeletion?: boolean;
	pluginProperty?: Array<string>;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface DeletePaymentMethodCustomFieldsRequest {
	paymentMethodId: string;
	xKillbillCreatedBy: string;
	customField?: Array<string>;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface GetPaymentMethodRequest {
	paymentMethodId: string;
	includedDeleted?: boolean;
	withPluginInfo?: boolean;
	pluginProperty?: Array<string>;
	audit?: GetPaymentMethodAuditEnum;
}

export interface GetPaymentMethodAuditLogsWithHistoryRequest {
	paymentMethodId: string;
}

export interface GetPaymentMethodByKeyRequest {
	externalKey: string;
	includedDeleted?: boolean;
	withPluginInfo?: boolean;
	pluginProperty?: Array<string>;
	audit?: GetPaymentMethodByKeyAuditEnum;
}

export interface GetPaymentMethodCustomFieldsRequest {
	paymentMethodId: string;
	audit?: GetPaymentMethodCustomFieldsAuditEnum;
}

export interface GetPaymentMethodsRequest {
	offset?: number;
	limit?: number;
	pluginName?: string;
	withPluginInfo?: boolean;
	pluginProperty?: Array<string>;
	audit?: GetPaymentMethodsAuditEnum;
}

export interface ModifyPaymentMethodCustomFieldsRequest {
	body: Array<CustomField>;
	paymentMethodId: string;
	xKillbillCreatedBy: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface SearchPaymentMethodsRequest {
	searchKey: string;
	offset?: number;
	limit?: number;
	pluginName?: string;
	withPluginInfo?: boolean;
	pluginProperty?: Array<string>;
	audit?: SearchPaymentMethodsAuditEnum;
}

/**
 *
 */
export class PaymentMethodApi extends runtime.BaseAPI {
	/**
	 * Add custom fields to payment method
	 */
	async createPaymentMethodCustomFieldsRaw(
		requestParameters: CreatePaymentMethodCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<CustomField>>> {
		if (requestParameters.body === null || requestParameters.body === undefined) {
			throw new runtime.RequiredError(
				'body',
				'Required parameter requestParameters.body was null or undefined when calling createPaymentMethodCustomFields.'
			);
		}

		if (
			requestParameters.paymentMethodId === null ||
			requestParameters.paymentMethodId === undefined
		) {
			throw new runtime.RequiredError(
				'paymentMethodId',
				'Required parameter requestParameters.paymentMethodId was null or undefined when calling createPaymentMethodCustomFields.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling createPaymentMethodCustomFields.'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		if (
			requestParameters.xKillbillCreatedBy !== undefined &&
			requestParameters.xKillbillCreatedBy !== null
		) {
			headerParameters['X-Killbill-CreatedBy'] = String(requestParameters.xKillbillCreatedBy);
		}

		if (
			requestParameters.xKillbillReason !== undefined &&
			requestParameters.xKillbillReason !== null
		) {
			headerParameters['X-Killbill-Reason'] = String(requestParameters.xKillbillReason);
		}

		if (
			requestParameters.xKillbillComment !== undefined &&
			requestParameters.xKillbillComment !== null
		) {
			headerParameters['X-Killbill-Comment'] = String(requestParameters.xKillbillComment);
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods/{paymentMethodId}/customFields`.replace(
					`{${'paymentMethodId'}}`,
					encodeURIComponent(String(requestParameters.paymentMethodId))
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.body.map(CustomFieldToJSON)
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CustomFieldFromJSON));
	}

	/**
	 * Add custom fields to payment method
	 */
	async createPaymentMethodCustomFields(
		requestParameters: CreatePaymentMethodCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<CustomField>> {
		const response = await this.createPaymentMethodCustomFieldsRaw(
			requestParameters,
			initOverrides
		);
		return await response.value();
	}

	/**
	 * Delete a payment method
	 */
	async deletePaymentMethodRaw(
		requestParameters: DeletePaymentMethodRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<void>> {
		if (
			requestParameters.paymentMethodId === null ||
			requestParameters.paymentMethodId === undefined
		) {
			throw new runtime.RequiredError(
				'paymentMethodId',
				'Required parameter requestParameters.paymentMethodId was null or undefined when calling deletePaymentMethod.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling deletePaymentMethod.'
			);
		}

		const queryParameters: any = {};

		if (requestParameters.deleteDefaultPmWithAutoPayOff !== undefined) {
			queryParameters['deleteDefaultPmWithAutoPayOff'] =
				requestParameters.deleteDefaultPmWithAutoPayOff;
		}

		if (requestParameters.forceDefaultPmDeletion !== undefined) {
			queryParameters['forceDefaultPmDeletion'] = requestParameters.forceDefaultPmDeletion;
		}

		if (requestParameters.pluginProperty) {
			queryParameters['pluginProperty'] = requestParameters.pluginProperty;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (
			requestParameters.xKillbillCreatedBy !== undefined &&
			requestParameters.xKillbillCreatedBy !== null
		) {
			headerParameters['X-Killbill-CreatedBy'] = String(requestParameters.xKillbillCreatedBy);
		}

		if (
			requestParameters.xKillbillReason !== undefined &&
			requestParameters.xKillbillReason !== null
		) {
			headerParameters['X-Killbill-Reason'] = String(requestParameters.xKillbillReason);
		}

		if (
			requestParameters.xKillbillComment !== undefined &&
			requestParameters.xKillbillComment !== null
		) {
			headerParameters['X-Killbill-Comment'] = String(requestParameters.xKillbillComment);
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods/{paymentMethodId}`.replace(
					`{${'paymentMethodId'}}`,
					encodeURIComponent(String(requestParameters.paymentMethodId))
				),
				method: 'DELETE',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 * Delete a payment method
	 */
	async deletePaymentMethod(
		requestParameters: DeletePaymentMethodRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<void> {
		await this.deletePaymentMethodRaw(requestParameters, initOverrides);
	}

	/**
	 * Remove custom fields from payment method
	 */
	async deletePaymentMethodCustomFieldsRaw(
		requestParameters: DeletePaymentMethodCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<void>> {
		if (
			requestParameters.paymentMethodId === null ||
			requestParameters.paymentMethodId === undefined
		) {
			throw new runtime.RequiredError(
				'paymentMethodId',
				'Required parameter requestParameters.paymentMethodId was null or undefined when calling deletePaymentMethodCustomFields.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling deletePaymentMethodCustomFields.'
			);
		}

		const queryParameters: any = {};

		if (requestParameters.customField) {
			queryParameters['customField'] = requestParameters.customField;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (
			requestParameters.xKillbillCreatedBy !== undefined &&
			requestParameters.xKillbillCreatedBy !== null
		) {
			headerParameters['X-Killbill-CreatedBy'] = String(requestParameters.xKillbillCreatedBy);
		}

		if (
			requestParameters.xKillbillReason !== undefined &&
			requestParameters.xKillbillReason !== null
		) {
			headerParameters['X-Killbill-Reason'] = String(requestParameters.xKillbillReason);
		}

		if (
			requestParameters.xKillbillComment !== undefined &&
			requestParameters.xKillbillComment !== null
		) {
			headerParameters['X-Killbill-Comment'] = String(requestParameters.xKillbillComment);
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods/{paymentMethodId}/customFields`.replace(
					`{${'paymentMethodId'}}`,
					encodeURIComponent(String(requestParameters.paymentMethodId))
				),
				method: 'DELETE',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 * Remove custom fields from payment method
	 */
	async deletePaymentMethodCustomFields(
		requestParameters: DeletePaymentMethodCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<void> {
		await this.deletePaymentMethodCustomFieldsRaw(requestParameters, initOverrides);
	}

	/**
	 * Retrieve a payment method by id
	 */
	async getPaymentMethodRaw(
		requestParameters: GetPaymentMethodRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<PaymentMethod>> {
		if (
			requestParameters.paymentMethodId === null ||
			requestParameters.paymentMethodId === undefined
		) {
			throw new runtime.RequiredError(
				'paymentMethodId',
				'Required parameter requestParameters.paymentMethodId was null or undefined when calling getPaymentMethod.'
			);
		}

		const queryParameters: any = {};

		if (requestParameters.includedDeleted !== undefined) {
			queryParameters['includedDeleted'] = requestParameters.includedDeleted;
		}

		if (requestParameters.withPluginInfo !== undefined) {
			queryParameters['withPluginInfo'] = requestParameters.withPluginInfo;
		}

		if (requestParameters.pluginProperty) {
			queryParameters['pluginProperty'] = requestParameters.pluginProperty;
		}

		if (requestParameters.audit !== undefined) {
			queryParameters['audit'] = requestParameters.audit;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods/{paymentMethodId}`.replace(
					`{${'paymentMethodId'}}`,
					encodeURIComponent(String(requestParameters.paymentMethodId))
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => PaymentMethodFromJSON(jsonValue));
	}

	/**
	 * Retrieve a payment method by id
	 */
	async getPaymentMethod(
		requestParameters: GetPaymentMethodRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<PaymentMethod> {
		const response = await this.getPaymentMethodRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Retrieve payment method audit logs with history by id
	 */
	async getPaymentMethodAuditLogsWithHistoryRaw(
		requestParameters: GetPaymentMethodAuditLogsWithHistoryRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<AuditLog>>> {
		if (
			requestParameters.paymentMethodId === null ||
			requestParameters.paymentMethodId === undefined
		) {
			throw new runtime.RequiredError(
				'paymentMethodId',
				'Required parameter requestParameters.paymentMethodId was null or undefined when calling getPaymentMethodAuditLogsWithHistory.'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods/{paymentMethodId}/auditLogsWithHistory`.replace(
					`{${'paymentMethodId'}}`,
					encodeURIComponent(String(requestParameters.paymentMethodId))
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AuditLogFromJSON));
	}

	/**
	 * Retrieve payment method audit logs with history by id
	 */
	async getPaymentMethodAuditLogsWithHistory(
		requestParameters: GetPaymentMethodAuditLogsWithHistoryRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<AuditLog>> {
		const response = await this.getPaymentMethodAuditLogsWithHistoryRaw(
			requestParameters,
			initOverrides
		);
		return await response.value();
	}

	/**
	 * Retrieve a payment method by external key
	 */
	async getPaymentMethodByKeyRaw(
		requestParameters: GetPaymentMethodByKeyRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<PaymentMethod>> {
		if (requestParameters.externalKey === null || requestParameters.externalKey === undefined) {
			throw new runtime.RequiredError(
				'externalKey',
				'Required parameter requestParameters.externalKey was null or undefined when calling getPaymentMethodByKey.'
			);
		}

		const queryParameters: any = {};

		if (requestParameters.externalKey !== undefined) {
			queryParameters['externalKey'] = requestParameters.externalKey;
		}

		if (requestParameters.includedDeleted !== undefined) {
			queryParameters['includedDeleted'] = requestParameters.includedDeleted;
		}

		if (requestParameters.withPluginInfo !== undefined) {
			queryParameters['withPluginInfo'] = requestParameters.withPluginInfo;
		}

		if (requestParameters.pluginProperty) {
			queryParameters['pluginProperty'] = requestParameters.pluginProperty;
		}

		if (requestParameters.audit !== undefined) {
			queryParameters['audit'] = requestParameters.audit;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods`,
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => PaymentMethodFromJSON(jsonValue));
	}

	/**
	 * Retrieve a payment method by external key
	 */
	async getPaymentMethodByKey(
		requestParameters: GetPaymentMethodByKeyRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<PaymentMethod> {
		const response = await this.getPaymentMethodByKeyRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Retrieve payment method custom fields
	 */
	async getPaymentMethodCustomFieldsRaw(
		requestParameters: GetPaymentMethodCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<CustomField>>> {
		if (
			requestParameters.paymentMethodId === null ||
			requestParameters.paymentMethodId === undefined
		) {
			throw new runtime.RequiredError(
				'paymentMethodId',
				'Required parameter requestParameters.paymentMethodId was null or undefined when calling getPaymentMethodCustomFields.'
			);
		}

		const queryParameters: any = {};

		if (requestParameters.audit !== undefined) {
			queryParameters['audit'] = requestParameters.audit;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods/{paymentMethodId}/customFields`.replace(
					`{${'paymentMethodId'}}`,
					encodeURIComponent(String(requestParameters.paymentMethodId))
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CustomFieldFromJSON));
	}

	/**
	 * Retrieve payment method custom fields
	 */
	async getPaymentMethodCustomFields(
		requestParameters: GetPaymentMethodCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<CustomField>> {
		const response = await this.getPaymentMethodCustomFieldsRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * List payment methods
	 */
	async getPaymentMethodsRaw(
		requestParameters: GetPaymentMethodsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<PaymentMethod>>> {
		const queryParameters: any = {};

		if (requestParameters.offset !== undefined) {
			queryParameters['offset'] = requestParameters.offset;
		}

		if (requestParameters.limit !== undefined) {
			queryParameters['limit'] = requestParameters.limit;
		}

		if (requestParameters.pluginName !== undefined) {
			queryParameters['pluginName'] = requestParameters.pluginName;
		}

		if (requestParameters.withPluginInfo !== undefined) {
			queryParameters['withPluginInfo'] = requestParameters.withPluginInfo;
		}

		if (requestParameters.pluginProperty) {
			queryParameters['pluginProperty'] = requestParameters.pluginProperty;
		}

		if (requestParameters.audit !== undefined) {
			queryParameters['audit'] = requestParameters.audit;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods/pagination`,
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) =>
			jsonValue.map(PaymentMethodFromJSON)
		);
	}

	/**
	 * List payment methods
	 */
	async getPaymentMethods(
		requestParameters: GetPaymentMethodsRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<PaymentMethod>> {
		const response = await this.getPaymentMethodsRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Modify custom fields to payment method
	 */
	async modifyPaymentMethodCustomFieldsRaw(
		requestParameters: ModifyPaymentMethodCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<void>> {
		if (requestParameters.body === null || requestParameters.body === undefined) {
			throw new runtime.RequiredError(
				'body',
				'Required parameter requestParameters.body was null or undefined when calling modifyPaymentMethodCustomFields.'
			);
		}

		if (
			requestParameters.paymentMethodId === null ||
			requestParameters.paymentMethodId === undefined
		) {
			throw new runtime.RequiredError(
				'paymentMethodId',
				'Required parameter requestParameters.paymentMethodId was null or undefined when calling modifyPaymentMethodCustomFields.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling modifyPaymentMethodCustomFields.'
			);
		}

		const queryParameters: any = {};

		const headerParameters: runtime.HTTPHeaders = {};

		headerParameters['Content-Type'] = 'application/json';

		if (
			requestParameters.xKillbillCreatedBy !== undefined &&
			requestParameters.xKillbillCreatedBy !== null
		) {
			headerParameters['X-Killbill-CreatedBy'] = String(requestParameters.xKillbillCreatedBy);
		}

		if (
			requestParameters.xKillbillReason !== undefined &&
			requestParameters.xKillbillReason !== null
		) {
			headerParameters['X-Killbill-Reason'] = String(requestParameters.xKillbillReason);
		}

		if (
			requestParameters.xKillbillComment !== undefined &&
			requestParameters.xKillbillComment !== null
		) {
			headerParameters['X-Killbill-Comment'] = String(requestParameters.xKillbillComment);
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods/{paymentMethodId}/customFields`.replace(
					`{${'paymentMethodId'}}`,
					encodeURIComponent(String(requestParameters.paymentMethodId))
				),
				method: 'PUT',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.body.map(CustomFieldToJSON)
			},
			initOverrides
		);

		return new runtime.VoidApiResponse(response);
	}

	/**
	 * Modify custom fields to payment method
	 */
	async modifyPaymentMethodCustomFields(
		requestParameters: ModifyPaymentMethodCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<void> {
		await this.modifyPaymentMethodCustomFieldsRaw(requestParameters, initOverrides);
	}

	/**
	 * Search payment methods
	 */
	async searchPaymentMethodsRaw(
		requestParameters: SearchPaymentMethodsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<PaymentMethod>>> {
		if (requestParameters.searchKey === null || requestParameters.searchKey === undefined) {
			throw new runtime.RequiredError(
				'searchKey',
				'Required parameter requestParameters.searchKey was null or undefined when calling searchPaymentMethods.'
			);
		}

		const queryParameters: any = {};

		if (requestParameters.offset !== undefined) {
			queryParameters['offset'] = requestParameters.offset;
		}

		if (requestParameters.limit !== undefined) {
			queryParameters['limit'] = requestParameters.limit;
		}

		if (requestParameters.pluginName !== undefined) {
			queryParameters['pluginName'] = requestParameters.pluginName;
		}

		if (requestParameters.withPluginInfo !== undefined) {
			queryParameters['withPluginInfo'] = requestParameters.withPluginInfo;
		}

		if (requestParameters.pluginProperty) {
			queryParameters['pluginProperty'] = requestParameters.pluginProperty;
		}

		if (requestParameters.audit !== undefined) {
			queryParameters['audit'] = requestParameters.audit;
		}

		const headerParameters: runtime.HTTPHeaders = {};

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiKey'] = this.configuration.apiKey('X-Killbill-ApiKey'); // Killbill Api Key authentication
		}

		if (this.configuration && this.configuration.apiKey) {
			headerParameters['X-Killbill-ApiSecret'] = this.configuration.apiKey('X-Killbill-ApiSecret'); // Killbill Api Secret authentication
		}

		if (
			this.configuration &&
			(this.configuration.username !== undefined || this.configuration.password !== undefined)
		) {
			headerParameters['Authorization'] =
				'Basic ' + btoa(this.configuration.username + ':' + this.configuration.password);
		}
		const response = await this.request(
			{
				path: `/1.0/kb/paymentMethods/search/{searchKey}`.replace(
					`{${'searchKey'}}`,
					encodeURIComponent(String(requestParameters.searchKey))
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) =>
			jsonValue.map(PaymentMethodFromJSON)
		);
	}

	/**
	 * Search payment methods
	 */
	async searchPaymentMethods(
		requestParameters: SearchPaymentMethodsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<PaymentMethod>> {
		const response = await this.searchPaymentMethodsRaw(requestParameters, initOverrides);
		return await response.value();
	}
}

/**
 * @export
 */
export const GetPaymentMethodAuditEnum = {
	Full: 'FULL',
	Minimal: 'MINIMAL',
	None: 'NONE'
} as const;
export type GetPaymentMethodAuditEnum =
	(typeof GetPaymentMethodAuditEnum)[keyof typeof GetPaymentMethodAuditEnum];
/**
 * @export
 */
export const GetPaymentMethodByKeyAuditEnum = {
	Full: 'FULL',
	Minimal: 'MINIMAL',
	None: 'NONE'
} as const;
export type GetPaymentMethodByKeyAuditEnum =
	(typeof GetPaymentMethodByKeyAuditEnum)[keyof typeof GetPaymentMethodByKeyAuditEnum];
/**
 * @export
 */
export const GetPaymentMethodCustomFieldsAuditEnum = {
	Full: 'FULL',
	Minimal: 'MINIMAL',
	None: 'NONE'
} as const;
export type GetPaymentMethodCustomFieldsAuditEnum =
	(typeof GetPaymentMethodCustomFieldsAuditEnum)[keyof typeof GetPaymentMethodCustomFieldsAuditEnum];
/**
 * @export
 */
export const GetPaymentMethodsAuditEnum = {
	Full: 'FULL',
	Minimal: 'MINIMAL',
	None: 'NONE'
} as const;
export type GetPaymentMethodsAuditEnum =
	(typeof GetPaymentMethodsAuditEnum)[keyof typeof GetPaymentMethodsAuditEnum];
/**
 * @export
 */
export const SearchPaymentMethodsAuditEnum = {
	Full: 'FULL',
	Minimal: 'MINIMAL',
	None: 'NONE'
} as const;
export type SearchPaymentMethodsAuditEnum =
	(typeof SearchPaymentMethodsAuditEnum)[keyof typeof SearchPaymentMethodsAuditEnum];
