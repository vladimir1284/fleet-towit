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
import type { AuditLog, CustomField, Tag } from '../models';
import {
	AuditLogFromJSON,
	AuditLogToJSON,
	CustomFieldFromJSON,
	CustomFieldToJSON,
	TagFromJSON,
	TagToJSON
} from '../models';

export interface CreateInvoiceItemCustomFieldsRequest {
	body: Array<CustomField>;
	invoiceItemId: string;
	xKillbillCreatedBy: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface CreateInvoiceItemTagsRequest {
	body: Array<string>;
	invoiceItemId: string;
	xKillbillCreatedBy: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface DeleteInvoiceItemCustomFieldsRequest {
	invoiceItemId: string;
	xKillbillCreatedBy: string;
	customField?: Array<string>;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface DeleteInvoiceItemTagsRequest {
	invoiceItemId: string;
	xKillbillCreatedBy: string;
	tagDef?: Array<string>;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface GetInvoiceItemAuditLogsWithHistoryRequest {
	invoiceItemId: string;
}

export interface GetInvoiceItemCustomFieldsRequest {
	invoiceItemId: string;
	audit?: GetInvoiceItemCustomFieldsAuditEnum;
}

export interface GetInvoiceItemTagsRequest {
	invoiceItemId: string;
	accountId: string;
	includedDeleted?: boolean;
	audit?: GetInvoiceItemTagsAuditEnum;
}

export interface ModifyInvoiceItemCustomFieldsRequest {
	body: Array<CustomField>;
	invoiceItemId: string;
	xKillbillCreatedBy: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

/**
 *
 */
export class InvoiceItemApi extends runtime.BaseAPI {
	/**
	 * Add custom fields to invoice item
	 */
	async createInvoiceItemCustomFieldsRaw(
		requestParameters: CreateInvoiceItemCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<CustomField>>> {
		if (requestParameters.body === null || requestParameters.body === undefined) {
			throw new runtime.RequiredError(
				'body',
				'Required parameter requestParameters.body was null or undefined when calling createInvoiceItemCustomFields.'
			);
		}

		if (requestParameters.invoiceItemId === null || requestParameters.invoiceItemId === undefined) {
			throw new runtime.RequiredError(
				'invoiceItemId',
				'Required parameter requestParameters.invoiceItemId was null or undefined when calling createInvoiceItemCustomFields.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling createInvoiceItemCustomFields.'
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
				path: `/1.0/kb/invoiceItems/{invoiceItemId}/customFields`.replace(
					`{${'invoiceItemId'}}`,
					encodeURIComponent(String(requestParameters.invoiceItemId))
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
	 * Add custom fields to invoice item
	 */
	async createInvoiceItemCustomFields(
		requestParameters: CreateInvoiceItemCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<CustomField>> {
		const response = await this.createInvoiceItemCustomFieldsRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Add tags to invoice item
	 */
	async createInvoiceItemTagsRaw(
		requestParameters: CreateInvoiceItemTagsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<Tag>>> {
		if (requestParameters.body === null || requestParameters.body === undefined) {
			throw new runtime.RequiredError(
				'body',
				'Required parameter requestParameters.body was null or undefined when calling createInvoiceItemTags.'
			);
		}

		if (requestParameters.invoiceItemId === null || requestParameters.invoiceItemId === undefined) {
			throw new runtime.RequiredError(
				'invoiceItemId',
				'Required parameter requestParameters.invoiceItemId was null or undefined when calling createInvoiceItemTags.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling createInvoiceItemTags.'
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
				path: `/1.0/kb/invoiceItems/{invoiceItemId}/tags`.replace(
					`{${'invoiceItemId'}}`,
					encodeURIComponent(String(requestParameters.invoiceItemId))
				),
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: requestParameters.body
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TagFromJSON));
	}

	/**
	 * Add tags to invoice item
	 */
	async createInvoiceItemTags(
		requestParameters: CreateInvoiceItemTagsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<Tag>> {
		const response = await this.createInvoiceItemTagsRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Remove custom fields from invoice item
	 */
	async deleteInvoiceItemCustomFieldsRaw(
		requestParameters: DeleteInvoiceItemCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<void>> {
		if (requestParameters.invoiceItemId === null || requestParameters.invoiceItemId === undefined) {
			throw new runtime.RequiredError(
				'invoiceItemId',
				'Required parameter requestParameters.invoiceItemId was null or undefined when calling deleteInvoiceItemCustomFields.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling deleteInvoiceItemCustomFields.'
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
				path: `/1.0/kb/invoiceItems/{invoiceItemId}/customFields`.replace(
					`{${'invoiceItemId'}}`,
					encodeURIComponent(String(requestParameters.invoiceItemId))
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
	 * Remove custom fields from invoice item
	 */
	async deleteInvoiceItemCustomFields(
		requestParameters: DeleteInvoiceItemCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<void> {
		await this.deleteInvoiceItemCustomFieldsRaw(requestParameters, initOverrides);
	}

	/**
	 * Remove tags from invoice item
	 */
	async deleteInvoiceItemTagsRaw(
		requestParameters: DeleteInvoiceItemTagsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<void>> {
		if (requestParameters.invoiceItemId === null || requestParameters.invoiceItemId === undefined) {
			throw new runtime.RequiredError(
				'invoiceItemId',
				'Required parameter requestParameters.invoiceItemId was null or undefined when calling deleteInvoiceItemTags.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling deleteInvoiceItemTags.'
			);
		}

		const queryParameters: any = {};

		if (requestParameters.tagDef) {
			queryParameters['tagDef'] = requestParameters.tagDef;
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
				path: `/1.0/kb/invoiceItems/{invoiceItemId}/tags`.replace(
					`{${'invoiceItemId'}}`,
					encodeURIComponent(String(requestParameters.invoiceItemId))
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
	 * Remove tags from invoice item
	 */
	async deleteInvoiceItemTags(
		requestParameters: DeleteInvoiceItemTagsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<void> {
		await this.deleteInvoiceItemTagsRaw(requestParameters, initOverrides);
	}

	/**
	 * Retrieve invoice item audit logs with history by id
	 */
	async getInvoiceItemAuditLogsWithHistoryRaw(
		requestParameters: GetInvoiceItemAuditLogsWithHistoryRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<AuditLog>>> {
		if (requestParameters.invoiceItemId === null || requestParameters.invoiceItemId === undefined) {
			throw new runtime.RequiredError(
				'invoiceItemId',
				'Required parameter requestParameters.invoiceItemId was null or undefined when calling getInvoiceItemAuditLogsWithHistory.'
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
				path: `/1.0/kb/invoiceItems/{invoiceItemId}/auditLogsWithHistory`.replace(
					`{${'invoiceItemId'}}`,
					encodeURIComponent(String(requestParameters.invoiceItemId))
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
	 * Retrieve invoice item audit logs with history by id
	 */
	async getInvoiceItemAuditLogsWithHistory(
		requestParameters: GetInvoiceItemAuditLogsWithHistoryRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<AuditLog>> {
		const response = await this.getInvoiceItemAuditLogsWithHistoryRaw(
			requestParameters,
			initOverrides
		);
		return await response.value();
	}

	/**
	 * Retrieve invoice item custom fields
	 */
	async getInvoiceItemCustomFieldsRaw(
		requestParameters: GetInvoiceItemCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<CustomField>>> {
		if (requestParameters.invoiceItemId === null || requestParameters.invoiceItemId === undefined) {
			throw new runtime.RequiredError(
				'invoiceItemId',
				'Required parameter requestParameters.invoiceItemId was null or undefined when calling getInvoiceItemCustomFields.'
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
				path: `/1.0/kb/invoiceItems/{invoiceItemId}/customFields`.replace(
					`{${'invoiceItemId'}}`,
					encodeURIComponent(String(requestParameters.invoiceItemId))
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
	 * Retrieve invoice item custom fields
	 */
	async getInvoiceItemCustomFields(
		requestParameters: GetInvoiceItemCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<CustomField>> {
		const response = await this.getInvoiceItemCustomFieldsRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Retrieve invoice item tags
	 */
	async getInvoiceItemTagsRaw(
		requestParameters: GetInvoiceItemTagsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<Tag>>> {
		if (requestParameters.invoiceItemId === null || requestParameters.invoiceItemId === undefined) {
			throw new runtime.RequiredError(
				'invoiceItemId',
				'Required parameter requestParameters.invoiceItemId was null or undefined when calling getInvoiceItemTags.'
			);
		}

		if (requestParameters.accountId === null || requestParameters.accountId === undefined) {
			throw new runtime.RequiredError(
				'accountId',
				'Required parameter requestParameters.accountId was null or undefined when calling getInvoiceItemTags.'
			);
		}

		const queryParameters: any = {};

		if (requestParameters.accountId !== undefined) {
			queryParameters['accountId'] = requestParameters.accountId;
		}

		if (requestParameters.includedDeleted !== undefined) {
			queryParameters['includedDeleted'] = requestParameters.includedDeleted;
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
				path: `/1.0/kb/invoiceItems/{invoiceItemId}/tags`.replace(
					`{${'invoiceItemId'}}`,
					encodeURIComponent(String(requestParameters.invoiceItemId))
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(TagFromJSON));
	}

	/**
	 * Retrieve invoice item tags
	 */
	async getInvoiceItemTags(
		requestParameters: GetInvoiceItemTagsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<Tag>> {
		const response = await this.getInvoiceItemTagsRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Modify custom fields to invoice item
	 */
	async modifyInvoiceItemCustomFieldsRaw(
		requestParameters: ModifyInvoiceItemCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<void>> {
		if (requestParameters.body === null || requestParameters.body === undefined) {
			throw new runtime.RequiredError(
				'body',
				'Required parameter requestParameters.body was null or undefined when calling modifyInvoiceItemCustomFields.'
			);
		}

		if (requestParameters.invoiceItemId === null || requestParameters.invoiceItemId === undefined) {
			throw new runtime.RequiredError(
				'invoiceItemId',
				'Required parameter requestParameters.invoiceItemId was null or undefined when calling modifyInvoiceItemCustomFields.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling modifyInvoiceItemCustomFields.'
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
				path: `/1.0/kb/invoiceItems/{invoiceItemId}/customFields`.replace(
					`{${'invoiceItemId'}}`,
					encodeURIComponent(String(requestParameters.invoiceItemId))
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
	 * Modify custom fields to invoice item
	 */
	async modifyInvoiceItemCustomFields(
		requestParameters: ModifyInvoiceItemCustomFieldsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<void> {
		await this.modifyInvoiceItemCustomFieldsRaw(requestParameters, initOverrides);
	}
}

/**
 * @export
 */
export const GetInvoiceItemCustomFieldsAuditEnum = {
	Full: 'FULL',
	Minimal: 'MINIMAL',
	None: 'NONE'
} as const;
export type GetInvoiceItemCustomFieldsAuditEnum =
	(typeof GetInvoiceItemCustomFieldsAuditEnum)[keyof typeof GetInvoiceItemCustomFieldsAuditEnum];
/**
 * @export
 */
export const GetInvoiceItemTagsAuditEnum = {
	Full: 'FULL',
	Minimal: 'MINIMAL',
	None: 'NONE'
} as const;
export type GetInvoiceItemTagsAuditEnum =
	(typeof GetInvoiceItemTagsAuditEnum)[keyof typeof GetInvoiceItemTagsAuditEnum];
