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
import type { AuditLog, TagDefinition } from '../models';
import {
	AuditLogFromJSON,
	AuditLogToJSON,
	TagDefinitionFromJSON,
	TagDefinitionToJSON
} from '../models';

export interface CreateTagDefinitionRequest {
	body: TagDefinition;
	xKillbillCreatedBy: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface DeleteTagDefinitionRequest {
	tagDefinitionId: string;
	xKillbillCreatedBy: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface GetTagDefinitionRequest {
	tagDefinitionId: string;
	audit?: GetTagDefinitionAuditEnum;
}

export interface GetTagDefinitionAuditLogsWithHistoryRequest {
	tagDefinitionId: string;
}

export interface GetTagDefinitionsRequest {
	audit?: GetTagDefinitionsAuditEnum;
}

/**
 *
 */
export class TagDefinitionApi extends runtime.BaseAPI {
	/**
	 * Create a tag definition
	 */
	async createTagDefinitionRaw(
		requestParameters: CreateTagDefinitionRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<TagDefinition>> {
		if (requestParameters.body === null || requestParameters.body === undefined) {
			throw new runtime.RequiredError(
				'body',
				'Required parameter requestParameters.body was null or undefined when calling createTagDefinition.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling createTagDefinition.'
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
				path: `/1.0/kb/tagDefinitions`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters,
				body: TagDefinitionToJSON(requestParameters.body)
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => TagDefinitionFromJSON(jsonValue));
	}

	/**
	 * Create a tag definition
	 */
	async createTagDefinition(
		requestParameters: CreateTagDefinitionRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<TagDefinition> {
		const response = await this.createTagDefinitionRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Delete a tag definition
	 */
	async deleteTagDefinitionRaw(
		requestParameters: DeleteTagDefinitionRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<void>> {
		if (
			requestParameters.tagDefinitionId === null ||
			requestParameters.tagDefinitionId === undefined
		) {
			throw new runtime.RequiredError(
				'tagDefinitionId',
				'Required parameter requestParameters.tagDefinitionId was null or undefined when calling deleteTagDefinition.'
			);
		}

		if (
			requestParameters.xKillbillCreatedBy === null ||
			requestParameters.xKillbillCreatedBy === undefined
		) {
			throw new runtime.RequiredError(
				'xKillbillCreatedBy',
				'Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling deleteTagDefinition.'
			);
		}

		const queryParameters: any = {};

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
				path: `/1.0/kb/tagDefinitions/{tagDefinitionId}`.replace(
					`{${'tagDefinitionId'}}`,
					encodeURIComponent(String(requestParameters.tagDefinitionId))
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
	 * Delete a tag definition
	 */
	async deleteTagDefinition(
		requestParameters: DeleteTagDefinitionRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<void> {
		await this.deleteTagDefinitionRaw(requestParameters, initOverrides);
	}

	/**
	 * Retrieve a tag definition
	 */
	async getTagDefinitionRaw(
		requestParameters: GetTagDefinitionRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<TagDefinition>> {
		if (
			requestParameters.tagDefinitionId === null ||
			requestParameters.tagDefinitionId === undefined
		) {
			throw new runtime.RequiredError(
				'tagDefinitionId',
				'Required parameter requestParameters.tagDefinitionId was null or undefined when calling getTagDefinition.'
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
				path: `/1.0/kb/tagDefinitions/{tagDefinitionId}`.replace(
					`{${'tagDefinitionId'}}`,
					encodeURIComponent(String(requestParameters.tagDefinitionId))
				),
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) => TagDefinitionFromJSON(jsonValue));
	}

	/**
	 * Retrieve a tag definition
	 */
	async getTagDefinition(
		requestParameters: GetTagDefinitionRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<TagDefinition> {
		const response = await this.getTagDefinitionRaw(requestParameters, initOverrides);
		return await response.value();
	}

	/**
	 * Retrieve tag definition audit logs with history by id
	 */
	async getTagDefinitionAuditLogsWithHistoryRaw(
		requestParameters: GetTagDefinitionAuditLogsWithHistoryRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<AuditLog>>> {
		if (
			requestParameters.tagDefinitionId === null ||
			requestParameters.tagDefinitionId === undefined
		) {
			throw new runtime.RequiredError(
				'tagDefinitionId',
				'Required parameter requestParameters.tagDefinitionId was null or undefined when calling getTagDefinitionAuditLogsWithHistory.'
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
				path: `/1.0/kb/tagDefinitions/{tagDefinitionId}/auditLogsWithHistory`.replace(
					`{${'tagDefinitionId'}}`,
					encodeURIComponent(String(requestParameters.tagDefinitionId))
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
	 * Retrieve tag definition audit logs with history by id
	 */
	async getTagDefinitionAuditLogsWithHistory(
		requestParameters: GetTagDefinitionAuditLogsWithHistoryRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<AuditLog>> {
		const response = await this.getTagDefinitionAuditLogsWithHistoryRaw(
			requestParameters,
			initOverrides
		);
		return await response.value();
	}

	/**
	 * List tag definitions
	 */
	async getTagDefinitionsRaw(
		requestParameters: GetTagDefinitionsRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<runtime.ApiResponse<Array<TagDefinition>>> {
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
				path: `/1.0/kb/tagDefinitions`,
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return new runtime.JSONApiResponse(response, (jsonValue) =>
			jsonValue.map(TagDefinitionFromJSON)
		);
	}

	/**
	 * List tag definitions
	 */
	async getTagDefinitions(
		requestParameters: GetTagDefinitionsRequest = {},
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<Array<TagDefinition>> {
		const response = await this.getTagDefinitionsRaw(requestParameters, initOverrides);
		return await response.value();
	}
}

/**
 * @export
 */
export const GetTagDefinitionAuditEnum = {
	Full: 'FULL',
	Minimal: 'MINIMAL',
	None: 'NONE'
} as const;
export type GetTagDefinitionAuditEnum =
	(typeof GetTagDefinitionAuditEnum)[keyof typeof GetTagDefinitionAuditEnum];
/**
 * @export
 */
export const GetTagDefinitionsAuditEnum = {
	Full: 'FULL',
	Minimal: 'MINIMAL',
	None: 'NONE'
} as const;
export type GetTagDefinitionsAuditEnum =
	(typeof GetTagDefinitionsAuditEnum)[keyof typeof GetTagDefinitionsAuditEnum];
