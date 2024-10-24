import type { 
    CreatePayload, 
    CreateRecordResponse,
    SearchPayload, 
    SearchResponse, 
    UpdatePayload, 
    UpdateRecordResponse 
} from "./api";

// Generic config interface that all entities will implement
export interface BaseEntityConfig<
    TData,
    TSearchResult,
    TInstructions,
    TOperation extends string,
    TField extends string
> {
    readonly CreateOperation: TOperation;
    readonly DataField: TField;
    readonly EntityData: TData;
    readonly SearchResult: TSearchResult;
    readonly Instructions: TInstructions;
}

// Generic payload types
export type EntityPayloads<T extends BaseEntityConfig<any, any, any, string, string>> = {
    Create: CreatePayload<
        T['EntityData'],
        T['Instructions'],
        T['CreateOperation'],
        T['DataField']
    >;
    Search: SearchPayload;
    Update: UpdatePayload;
};

// Generic response types
export type EntityResponses<T extends BaseEntityConfig<any, any, any, string, string>> = {
    Create: CreateRecordResponse;
    Search: SearchResponse<T['SearchResult']>;
    Get: SearchResponse<T['EntityData']>;
    Update: UpdateRecordResponse;
};

// Main type builder
export type BuildEntityTypes<T extends BaseEntityConfig<any, any, any, string, string>> = {
    Config: T;
    Payloads: EntityPayloads<T>;
    Responses: EntityResponses<T>;
}