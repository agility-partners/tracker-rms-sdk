import type { AxiosInstance } from 'axios';
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

    protected async create<TResponse, TData, TInstructions>(
        url: string,
        data: Partial<TData>,
        schema: any,
        instructions?: TInstructions
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
            const response = await this.client.post<TResponse>(url, payload);
            return response.data;

        } catch (error) {
            throw handleError(error);
        }
    }

    protected async find<TResponse>(
        url: string,
        id: number
    ): Promise<TResponse> {
        try {
            const payload = this.buildFindPayload(id);
            const response = await this.client.post<TResponse>(url, payload);

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
        instructions: SearchInstructions
    ): Promise<TResponse> {
        try {
            const completeInstructions: CompleteSearchInstructions = {
                ...instructions,
                recordtype: this.entityType
            };

            const payload = this.buildSearchPayload(completeInstructions);
            const response = await this.client.post<TResponse>(url, payload);

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
        payload: any
    ): Promise<TResponse> {
        try {
            const response = await this.client.post<TResponse>(url, payload);

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