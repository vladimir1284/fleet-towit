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
import type {
  PluginInfo,
} from '../models';
import {
    PluginInfoFromJSON,
    PluginInfoToJSON,
} from '../models';

/**
 * 
 */
export class PluginInfoApi extends runtime.BaseAPI {

    /**
     * Retrieve the list of registered plugins
     */
    async getPluginsInfoRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PluginInfo>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Killbill-ApiKey"] = this.configuration.apiKey("X-Killbill-ApiKey"); // Killbill Api Key authentication
        }

        if (this.configuration && this.configuration.apiKey) {
            headerParameters["X-Killbill-ApiSecret"] = this.configuration.apiKey("X-Killbill-ApiSecret"); // Killbill Api Secret authentication
        }

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/1.0/kb/pluginsInfo`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PluginInfoFromJSON));
    }

    /**
     * Retrieve the list of registered plugins
     */
    async getPluginsInfo(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PluginInfo>> {
        const response = await this.getPluginsInfoRaw(initOverrides);
        return await response.value();
    }

}
