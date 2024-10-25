import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { 
    ResponseStatus, 
    type ApiResponse, 
    type Credentials 
} from '../types';
import { 
    ApiError, 
    formatValidationError, 
    handleError 
} from '../utils/errors';
import { generateDefaultsFromSchema } from '../utils/generateDefaults';
import type { SearchInstructions } from '../types/search/searchData';

interface CompleteSearchInstructions extends SearchInstructions {
    recordtype: string;
}

export abstract class BaseApi {
    constructor(protected client: AxiosInstance, protected credentials: Credentials) {}

    protected getRequestConfig(requiresAuth: boolean = false): AxiosRequestConfig {
        if (requiresAuth) {
            const authString = Buffer.from(
                `${this.credentials.username}:${this.credentials.password}`
            ).toString('base64');
            
            return {
                headers: {
                    'Authorization': `Basic ${authString}`
                }
            };
        }
        return {};
    }

    protected async create<TResponse, TData, TInstructions>(
        url: string,
        data: Partial<TData>,
        schema: any,
        instructions?: TInstructions,
        requiresAuth: boolean = false
    ): Promise<TResponse> {
        try {
            const defaults = generateDefaultsFromSchema<TData>(schema);
            const fullData = { ...defaults, ...data } as TData;

            const parsedData = schema.safeParse(fullData);
            if (!parsedData.success) {
                const formattedError = formatValidationError(parsedData.error);
                throw new Error(`Validation failed: ${formattedError}`);
            }

            const payload = this.buildCreatePayload(parsedData.data, instructions);
            const config = this.getRequestConfig(requiresAuth);
            const response = await this.client.post<TResponse>(url, payload, config);
            return response.data;

        } catch (error) {
            throw handleError(error);
        }
    }

    protected async find<TResponse>(
        url: string,
        id: number,
        requiresAuth: boolean = false
    ): Promise<TResponse> {
        try {
            const payload = this.buildFindPayload(id);
            const config = this.getRequestConfig(requiresAuth);
            const response = await this.client.post<TResponse>(url, payload, config);

            if ((response.data as ApiResponse<any>).status !== ResponseStatus.Success) {
                throw new ApiError('Record not found or access denied', response.data);
            }

            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    }

    protected abstract get entityType(): string;

    protected async search<TResponse extends ApiResponse<any>>(
        url: string,
        instructions: SearchInstructions,
        requiresAuth: boolean = false
    ): Promise<TResponse> {
        try {
            const completeInstructions: CompleteSearchInstructions = {
                ...instructions,
                recordtype: this.entityType
            };

            const payload = this.buildSearchPayload(completeInstructions);
            const config = this.getRequestConfig(requiresAuth);
            const response = await this.client.post<TResponse>(url, payload, config);

            if (response.data.status !== ResponseStatus.Success) {
                throw new ApiError('Search failed or returned no results', response.data);
            }

            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    }

    protected async update<TResponse>(
        url: string,
        payload: any,
        requiresAuth: boolean = false
    ): Promise<TResponse> {
        try {
            const config = this.getRequestConfig(requiresAuth);
            const response = await this.client.post<TResponse>(url, payload, config);

            if ((response.data as ApiResponse<any>).status !== ResponseStatus.Success) {
                throw new ApiError('Update failed or record not found', response.data);
            }

            return response.data;
        } catch (error) {
            throw handleError(error);
        }
    }

    protected abstract buildCreatePayload(data: any, instructions?: any): any;
    protected abstract buildFindPayload(id: number): any;
    protected abstract buildUpdatePayload(id: number, updates: any): any;
    protected abstract buildSearchPayload(instructions: CompleteSearchInstructions): any;
}