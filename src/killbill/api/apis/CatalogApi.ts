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
  Catalog,
  CatalogValidation,
  Phase,
  Plan,
  PlanDetail,
  PriceList,
  Product,
  SimplePlan,
} from '../models';
import {
    CatalogFromJSON,
    CatalogToJSON,
    CatalogValidationFromJSON,
    CatalogValidationToJSON,
    PhaseFromJSON,
    PhaseToJSON,
    PlanFromJSON,
    PlanToJSON,
    PlanDetailFromJSON,
    PlanDetailToJSON,
    PriceListFromJSON,
    PriceListToJSON,
    ProductFromJSON,
    ProductToJSON,
    SimplePlanFromJSON,
    SimplePlanToJSON,
} from '../models';

export interface AddSimplePlanRequest {
    body: SimplePlan;
    xKillbillCreatedBy: string;
    xKillbillReason?: string;
    xKillbillComment?: string;
}

export interface DeleteCatalogRequest {
    xKillbillCreatedBy: string;
    xKillbillReason?: string;
    xKillbillComment?: string;
}

export interface GetAvailableAddonsRequest {
    baseProductName?: string;
    priceListName?: string;
    accountId?: string;
}

export interface GetAvailableBasePlansRequest {
    accountId?: string;
}

export interface GetCatalogJsonRequest {
    requestedDate?: Date;
    accountId?: string;
}

export interface GetCatalogVersionsRequest {
    accountId?: string;
}

export interface GetCatalogXmlRequest {
    requestedDate?: Date;
    accountId?: string;
}

export interface GetPhaseForSubscriptionAndDateRequest {
    subscriptionId?: string;
    requestedDate?: Date;
}

export interface GetPlanForSubscriptionAndDateRequest {
    subscriptionId?: string;
    requestedDate?: Date;
}

export interface GetPriceListForSubscriptionAndDateRequest {
    subscriptionId?: string;
    requestedDate?: Date;
}

export interface GetProductForSubscriptionAndDateRequest {
    subscriptionId?: string;
    requestedDate?: Date;
}

export interface UploadCatalogXmlRequest {
    body: string;
    xKillbillCreatedBy: string;
    xKillbillReason?: string;
    xKillbillComment?: string;
}

export interface ValidateCatalogXmlRequest {
    body: string;
    xKillbillCreatedBy: string;
    xKillbillReason?: string;
    xKillbillComment?: string;
}

/**
 * 
 */
export class CatalogApi extends runtime.BaseAPI {

    /**
     * Add a simple plan entry in the current version of the catalog
     */
    async addSimplePlanRaw(requestParameters: AddSimplePlanRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling addSimplePlan.');
        }

        if (requestParameters.xKillbillCreatedBy === null || requestParameters.xKillbillCreatedBy === undefined) {
            throw new runtime.RequiredError('xKillbillCreatedBy','Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling addSimplePlan.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (requestParameters.xKillbillCreatedBy !== undefined && requestParameters.xKillbillCreatedBy !== null) {
            headerParameters['X-Killbill-CreatedBy'] = String(requestParameters.xKillbillCreatedBy);
        }

        if (requestParameters.xKillbillReason !== undefined && requestParameters.xKillbillReason !== null) {
            headerParameters['X-Killbill-Reason'] = String(requestParameters.xKillbillReason);
        }

        if (requestParameters.xKillbillComment !== undefined && requestParameters.xKillbillComment !== null) {
            headerParameters['X-Killbill-Comment'] = String(requestParameters.xKillbillComment);
        }

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
            path: `/1.0/kb/catalog/simplePlan`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: SimplePlanToJSON(requestParameters.body),
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Add a simple plan entry in the current version of the catalog
     */
    async addSimplePlan(requestParameters: AddSimplePlanRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.addSimplePlanRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Delete all versions for a per tenant catalog
     */
    async deleteCatalogRaw(requestParameters: DeleteCatalogRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.xKillbillCreatedBy === null || requestParameters.xKillbillCreatedBy === undefined) {
            throw new runtime.RequiredError('xKillbillCreatedBy','Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling deleteCatalog.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (requestParameters.xKillbillCreatedBy !== undefined && requestParameters.xKillbillCreatedBy !== null) {
            headerParameters['X-Killbill-CreatedBy'] = String(requestParameters.xKillbillCreatedBy);
        }

        if (requestParameters.xKillbillReason !== undefined && requestParameters.xKillbillReason !== null) {
            headerParameters['X-Killbill-Reason'] = String(requestParameters.xKillbillReason);
        }

        if (requestParameters.xKillbillComment !== undefined && requestParameters.xKillbillComment !== null) {
            headerParameters['X-Killbill-Comment'] = String(requestParameters.xKillbillComment);
        }

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
            path: `/1.0/kb/catalog`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Delete all versions for a per tenant catalog
     */
    async deleteCatalog(requestParameters: DeleteCatalogRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.deleteCatalogRaw(requestParameters, initOverrides);
    }

    /**
     * Retrieve available add-ons for a given product
     */
    async getAvailableAddonsRaw(requestParameters: GetAvailableAddonsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PlanDetail>>> {
        const queryParameters: any = {};

        if (requestParameters.baseProductName !== undefined) {
            queryParameters['baseProductName'] = requestParameters.baseProductName;
        }

        if (requestParameters.priceListName !== undefined) {
            queryParameters['priceListName'] = requestParameters.priceListName;
        }

        if (requestParameters.accountId !== undefined) {
            queryParameters['accountId'] = requestParameters.accountId;
        }

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
            path: `/1.0/kb/catalog/availableAddons`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlanDetailFromJSON));
    }

    /**
     * Retrieve available add-ons for a given product
     */
    async getAvailableAddons(requestParameters: GetAvailableAddonsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PlanDetail>> {
        const response = await this.getAvailableAddonsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve available base plans
     */
    async getAvailableBasePlansRaw(requestParameters: GetAvailableBasePlansRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<PlanDetail>>> {
        const queryParameters: any = {};

        if (requestParameters.accountId !== undefined) {
            queryParameters['accountId'] = requestParameters.accountId;
        }

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
            path: `/1.0/kb/catalog/availableBasePlans`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(PlanDetailFromJSON));
    }

    /**
     * Retrieve available base plans
     */
    async getAvailableBasePlans(requestParameters: GetAvailableBasePlansRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<PlanDetail>> {
        const response = await this.getAvailableBasePlansRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve the catalog as JSON
     */
    async getCatalogJsonRaw(requestParameters: GetCatalogJsonRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Catalog>>> {
        const queryParameters: any = {};

        if (requestParameters.requestedDate !== undefined) {
            queryParameters['requestedDate'] = (requestParameters.requestedDate as any).toISOString();
        }

        if (requestParameters.accountId !== undefined) {
            queryParameters['accountId'] = requestParameters.accountId;
        }

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
            path: `/1.0/kb/catalog`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(CatalogFromJSON));
    }

    /**
     * Retrieve the catalog as JSON
     */
    async getCatalogJson(requestParameters: GetCatalogJsonRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Catalog>> {
        const response = await this.getCatalogJsonRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve a list of catalog versions
     */
    async getCatalogVersionsRaw(requestParameters: GetCatalogVersionsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<Date>>> {
        const queryParameters: any = {};

        if (requestParameters.accountId !== undefined) {
            queryParameters['accountId'] = requestParameters.accountId;
        }

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
            path: `/1.0/kb/catalog/versions`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Retrieve a list of catalog versions
     */
    async getCatalogVersions(requestParameters: GetCatalogVersionsRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<Date>> {
        const response = await this.getCatalogVersionsRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve the full catalog as XML
     */
    async getCatalogXmlRaw(requestParameters: GetCatalogXmlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        const queryParameters: any = {};

        if (requestParameters.requestedDate !== undefined) {
            queryParameters['requestedDate'] = (requestParameters.requestedDate as any).toISOString();
        }

        if (requestParameters.accountId !== undefined) {
            queryParameters['accountId'] = requestParameters.accountId;
        }

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
            path: `/1.0/kb/catalog/xml`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Retrieve the full catalog as XML
     */
    async getCatalogXml(requestParameters: GetCatalogXmlRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.getCatalogXmlRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve phase for a given subscription and date
     */
    async getPhaseForSubscriptionAndDateRaw(requestParameters: GetPhaseForSubscriptionAndDateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Phase>> {
        const queryParameters: any = {};

        if (requestParameters.subscriptionId !== undefined) {
            queryParameters['subscriptionId'] = requestParameters.subscriptionId;
        }

        if (requestParameters.requestedDate !== undefined) {
            queryParameters['requestedDate'] = (requestParameters.requestedDate as any).toISOString().substr(0,10);
        }

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
            path: `/1.0/kb/catalog/phase`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PhaseFromJSON(jsonValue));
    }

    /**
     * Retrieve phase for a given subscription and date
     */
    async getPhaseForSubscriptionAndDate(requestParameters: GetPhaseForSubscriptionAndDateRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Phase> {
        const response = await this.getPhaseForSubscriptionAndDateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve plan for a given subscription and date
     */
    async getPlanForSubscriptionAndDateRaw(requestParameters: GetPlanForSubscriptionAndDateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Plan>> {
        const queryParameters: any = {};

        if (requestParameters.subscriptionId !== undefined) {
            queryParameters['subscriptionId'] = requestParameters.subscriptionId;
        }

        if (requestParameters.requestedDate !== undefined) {
            queryParameters['requestedDate'] = (requestParameters.requestedDate as any).toISOString().substr(0,10);
        }

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
            path: `/1.0/kb/catalog/plan`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PlanFromJSON(jsonValue));
    }

    /**
     * Retrieve plan for a given subscription and date
     */
    async getPlanForSubscriptionAndDate(requestParameters: GetPlanForSubscriptionAndDateRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Plan> {
        const response = await this.getPlanForSubscriptionAndDateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve priceList for a given subscription and date
     */
    async getPriceListForSubscriptionAndDateRaw(requestParameters: GetPriceListForSubscriptionAndDateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<PriceList>> {
        const queryParameters: any = {};

        if (requestParameters.subscriptionId !== undefined) {
            queryParameters['subscriptionId'] = requestParameters.subscriptionId;
        }

        if (requestParameters.requestedDate !== undefined) {
            queryParameters['requestedDate'] = (requestParameters.requestedDate as any).toISOString().substr(0,10);
        }

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
            path: `/1.0/kb/catalog/priceList`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => PriceListFromJSON(jsonValue));
    }

    /**
     * Retrieve priceList for a given subscription and date
     */
    async getPriceListForSubscriptionAndDate(requestParameters: GetPriceListForSubscriptionAndDateRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<PriceList> {
        const response = await this.getPriceListForSubscriptionAndDateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve product for a given subscription and date
     */
    async getProductForSubscriptionAndDateRaw(requestParameters: GetProductForSubscriptionAndDateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Product>> {
        const queryParameters: any = {};

        if (requestParameters.subscriptionId !== undefined) {
            queryParameters['subscriptionId'] = requestParameters.subscriptionId;
        }

        if (requestParameters.requestedDate !== undefined) {
            queryParameters['requestedDate'] = (requestParameters.requestedDate as any).toISOString().substr(0,10);
        }

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
            path: `/1.0/kb/catalog/product`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => ProductFromJSON(jsonValue));
    }

    /**
     * Retrieve product for a given subscription and date
     */
    async getProductForSubscriptionAndDate(requestParameters: GetProductForSubscriptionAndDateRequest = {}, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Product> {
        const response = await this.getProductForSubscriptionAndDateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Upload the full catalog as XML
     */
    async uploadCatalogXmlRaw(requestParameters: UploadCatalogXmlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<string>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling uploadCatalogXml.');
        }

        if (requestParameters.xKillbillCreatedBy === null || requestParameters.xKillbillCreatedBy === undefined) {
            throw new runtime.RequiredError('xKillbillCreatedBy','Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling uploadCatalogXml.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'text/xml';

        if (requestParameters.xKillbillCreatedBy !== undefined && requestParameters.xKillbillCreatedBy !== null) {
            headerParameters['X-Killbill-CreatedBy'] = String(requestParameters.xKillbillCreatedBy);
        }

        if (requestParameters.xKillbillReason !== undefined && requestParameters.xKillbillReason !== null) {
            headerParameters['X-Killbill-Reason'] = String(requestParameters.xKillbillReason);
        }

        if (requestParameters.xKillbillComment !== undefined && requestParameters.xKillbillComment !== null) {
            headerParameters['X-Killbill-Comment'] = String(requestParameters.xKillbillComment);
        }

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
            path: `/1.0/kb/catalog/xml`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     * Upload the full catalog as XML
     */
    async uploadCatalogXml(requestParameters: UploadCatalogXmlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<string> {
        const response = await this.uploadCatalogXmlRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Validate a XML catalog
     */
    async validateCatalogXmlRaw(requestParameters: ValidateCatalogXmlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CatalogValidation>> {
        if (requestParameters.body === null || requestParameters.body === undefined) {
            throw new runtime.RequiredError('body','Required parameter requestParameters.body was null or undefined when calling validateCatalogXml.');
        }

        if (requestParameters.xKillbillCreatedBy === null || requestParameters.xKillbillCreatedBy === undefined) {
            throw new runtime.RequiredError('xKillbillCreatedBy','Required parameter requestParameters.xKillbillCreatedBy was null or undefined when calling validateCatalogXml.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'text/xml';

        if (requestParameters.xKillbillCreatedBy !== undefined && requestParameters.xKillbillCreatedBy !== null) {
            headerParameters['X-Killbill-CreatedBy'] = String(requestParameters.xKillbillCreatedBy);
        }

        if (requestParameters.xKillbillReason !== undefined && requestParameters.xKillbillReason !== null) {
            headerParameters['X-Killbill-Reason'] = String(requestParameters.xKillbillReason);
        }

        if (requestParameters.xKillbillComment !== undefined && requestParameters.xKillbillComment !== null) {
            headerParameters['X-Killbill-Comment'] = String(requestParameters.xKillbillComment);
        }

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
            path: `/1.0/kb/catalog/xml/validate`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.body as any,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CatalogValidationFromJSON(jsonValue));
    }

    /**
     * Validate a XML catalog
     */
    async validateCatalogXml(requestParameters: ValidateCatalogXmlRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CatalogValidation> {
        const response = await this.validateCatalogXmlRaw(requestParameters, initOverrides);
        return await response.value();
    }

}