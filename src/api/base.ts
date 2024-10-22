import type { AxiosInstance } from 'axios';
import { 
    ResponseStatus, 
    type Credentials 
} from '../types';
import { 
    ApiError, 
    formatValidationError, 
    handleError 
} from '../utils/errors';
import { generateDefaultsFromSchema } from '../utils/generateDefaults';


export abstract class BaseApi {
    constructor(protected client: AxiosInstance, protected credentials: Credentials) {}

    protected async create<TResponse, TData, TInstructions>(
        url: string,
        data: Partial<TData>,
        schema: any,
        operation: string,
        instructions?: TInstructions
    ): Promise<TResponse> {
        try {
            const defaults = generateDefaultsFromSchema<TData>(schema);
            const fullData = { ...defaults, ...data } as TData;

            const parsedData = schema.safeParse(fullData);
            if (!parsedData.success) {
                const formattedError = formatValidationError(parsedData.error);
                throw new Error(`Invalid ${operation} data: ${formattedError}`);
            }

            const payload = this.buildCreatePayload(parsedData.data, instructions);

            const response = await this.client.post<TResponse>(url, payload);

            if ((response.data as any).status !== ResponseStatus.Success) {
                throw new ApiError(`API returned error status: ${(response.data as any).status}`, response.data);
            }

            return response.data;
        } catch (error) {
            throw handleError(error, operation);
        }
    }

    protected async find<TResponse>(
        url: string,
        id: number,
        operation: string
    ): Promise<TResponse> {
        try {
            const payload = this.buildFindPayload(id);

            const response = await this.client.post<TResponse>(url, payload);

            if ((response.data as any).status !== ResponseStatus.Success) {
                throw new ApiError(`API returned error status: ${(response.data as any).status}`, response.data);
            }

            return response.data;
        } catch (error) {
            throw handleError(error, operation);
        }
    }

    protected async update<TResponse>(
        url: string,
        payload: any,
        operation: string
    ): Promise<TResponse> {
        try {
            const response = await this.client.post<TResponse>(url, payload);

            if ((response.data as any).status !== ResponseStatus.Success) {
                throw new ApiError(`API returned error status: ${(response.data as any).status}`, response.data);
            }

            return response.data;
        } catch (error) {
            throw handleError(error, operation);
        }
    }

    protected abstract buildCreatePayload(data: any, instructions?: any): any;
    protected abstract buildFindPayload(id: number): any;
    protected abstract buildUpdatePayload(id: number, updates: any): any;
}