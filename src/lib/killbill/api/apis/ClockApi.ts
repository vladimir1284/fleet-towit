/* tslint:disable */
/* eslint-disable */
/**
 * Kill Bill
 * Kill Bill is an open-source billing and payments platform
 *
 * NOTE:  Do not edit the class manually.
 */

import * as runtime from '../runtime';

export interface GetDateTimeRequest {
	xKillbillCreatedBy?: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
}

export interface SetDateRequest {
	xKillbillCreatedBy?: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
	date: string;
}

export interface forwardRequest {
	xKillbillCreatedBy?: string;
	xKillbillReason?: string;
	xKillbillComment?: string;
	days: number;
}

export interface DateTime {
	currentUtcTime: string;
	timeZone: string;
	localDate: string;
}

/**
 * This class wos documentad manually
 */
export class ClockApi extends runtime.BaseAPI {
	/**
	 * Retrieves current date and time.
	 */
	async getCurrentDateTime(
		requestParameters: GetDateTimeRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<DateTime> {
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

		const queryParameters: any = {};

		const response = await this.request(
			{
				path: '/1.0/kb/test/clock',
				method: 'GET',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return await response.json();
	}

	/**
	 * Sets system date and time.
	 */
	async setDateTime(
		requestParameters: SetDateRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<DateTime> {
		// const dateTime = this.getCurrentDateTime({
		//     xKillbillCreatedBy: requestParameters.xKillbillCreatedBy,
		//     xKillbillReason: requestParameters.xKillbillReason,
		//     xKillbillComment: requestParameters.xKillbillComment,
		// }, initOverrides)
		//
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

		const queryParameters: any = {};

		const response = await this.request(
			{
				path: `/1.0/kb/test/clock?requestedDate=${requestParameters.date}`,
				method: 'POST',
				headers: headerParameters,
				query: queryParameters
			},
			initOverrides
		);

		return await response.json();
	}

	/**
	 * Moves system date forward by specified days.
	 */
	async forward(
		requestParameters: forwardRequest,
		initOverrides?: RequestInit | runtime.InitOverrideFunction
	): Promise<DateTime> {
		const dateTime = await this.getCurrentDateTime(
			{
				xKillbillCreatedBy: requestParameters.xKillbillCreatedBy,
				xKillbillReason: requestParameters.xKillbillReason,
				xKillbillComment: requestParameters.xKillbillComment
			},
			initOverrides
		);

		const newDate = new Date(dateTime.localDate);
		newDate.setDate(newDate.getDate() + requestParameters.days);

		return await this.setDateTime({
			xKillbillComment: requestParameters.xKillbillComment,
			xKillbillReason: requestParameters.xKillbillReason,
			xKillbillCreatedBy: requestParameters.xKillbillCreatedBy,
			date: newDate.toISOString()
		});
	}
}
