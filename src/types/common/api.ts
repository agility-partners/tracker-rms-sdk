// src/types/common/api.ts
import type { Credentials } from '../auth';
import type { SearchInstructions } from '../search/searchData';
import type { ApiResponse } from '../response';

// Generic Record Response
export interface CreateRecordResponse extends Omit<ApiResponse<void>, 'results'> {
    recordId: number;
    recordName: string;
}

// Generic Search Response
export interface SearchResponse<T> extends ApiResponse<T> {
    status: number;
    message: string;
    count: number;
    results: T[];
}

// Generic List Response
export interface ListResponse<T> extends ApiResponse<T> {
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}

// Generic Update Response
export interface UpdateRecordResponse {
    status: number;
    message: string;
    count: number;
}

// Generic Search Payload
export interface SearchPayload {
    trackerrms: {
        getRecords: {
            credentials: Credentials;
            instructions: SearchInstructions;
        }
    }
}

// Generic Create Payload with operation name and data field name
export type CreatePayload<
    TData,
    TInstructions,
    TOperation extends string = string,
    TDataField extends string = string
> = {
    trackerrms: {
        [K in TOperation]: {
            credentials: Credentials;
            instructions: TInstructions;
        } & Record<TDataField, TData>
    }
}

// Generic Update Payload
export interface UpdatePayload {
    trackerrms: {
        updateRecord: {
            credentials: Credentials;
            instructions: {
                recordtype: string;
                recordid: number;
            };
            updates: {
                column: string;
                value: string;
            }[];
        };
    };
}