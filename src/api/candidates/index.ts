import { BaseApi } from '../base';
import type { SearchInstructions } from '../../types/search/searchData';
import {
    type CreateCandidateOptions,
    type CreateCandidatePayload,
    type CreateCandidateResponse,
    type SearchCandidatePayload,
    type SearchCandidateResponse,
    type UpdateCandidatePayload,
    type UpdateCandidateResponse,
    type CandidateData,
    type CandidateUpdateData,
    candidateDataSchema,
    candidateUpdateSchema,
} from '../../types/candidate';
import { formatValidationError } from '../../utils/errors';

export class Candidates extends BaseApi {
    protected get entityType(): string {
        return 'R';
    }

    async createCandidate(
        candidateData: Partial<CandidateData> = {},
        instructions: CreateCandidateOptions = {

        }
    ): Promise<CreateCandidateResponse> {
        return this.create<CreateCandidateResponse, CandidateData, CreateCandidateOptions>(
            '/api/widget/createResource',
            candidateData,
            candidateDataSchema,
            instructions
        );
    }

    async searchCandidates(instructions: SearchInstructions): Promise<SearchCandidateResponse> {
        return this.search<SearchCandidateResponse>(
            '/api/widget/getRecords',
            instructions,
        );
    }

    async updateCandidate(
        id: number,
        updates: Partial<CandidateUpdateData>
    ): Promise<UpdateCandidateResponse> {
        const parsedData = candidateUpdateSchema.partial().safeParse(updates);
        if (!parsedData.success) {
            const formattedError = formatValidationError(parsedData.error);
            throw new Error(`Validation failed: ${formattedError}`);
        }

        const payload = this.buildUpdatePayload(id, parsedData.data);
        return this.update<UpdateCandidateResponse>('/api/widget/updateRecord', payload);
    }

    protected buildCreatePayload(data: CandidateData, instructions: CreateCandidateOptions): CreateCandidatePayload {
        return {
            trackerrms: {
                createResource: {
                    credentials: this.credentials,
                    instructions: {
                    },
                    resource: data,
                },
            },
        };
    }

    protected buildSearchPayload(instructions: SearchInstructions): SearchCandidatePayload {
        return {
            trackerrms: {
                getRecords: {
                    credentials: this.credentials,
                    instructions
                }
            }
        };
    }

    protected buildFindPayload(id: number): never {
        throw new Error("Find operation not implemented for Candidates");
    }

    protected buildUpdatePayload(id: number, updates: Partial<CandidateUpdateData>): UpdateCandidatePayload {
        const updateFields = Object.entries(updates).map(([column, value]) => ({
            column,
            value: value?.toString() ?? ''
        }));

        return {
            trackerrms: {
                updateRecord: {
                    credentials: this.credentials,
                    instructions: {
                        recordtype: this.entityType,
                        recordid: id
                    },
                    updates: updateFields
                }
            }
        };
    }
}