import { BaseApi } from '../base';
import type { SearchInstructions } from '../../types/search/schema';
import { 
    type CreateLeadOptions,
    type CreateLeadPayload,
    type CreateLeadResponse,
    type SearchLeadPayload,
    type SearchLeadResponse,
    type UpdateLeadPayload,
    type UpdateLeadResponse,
    type LeadData,
    type LeadUpdateData,
    leadDataSchema,
    leadUpdateSchema,
} from '../../types/lead';
import { formatValidationError } from '../../utils/errors';

export class Leads extends BaseApi {
    protected get entityType(): string {
        return 'L';
    }

    async createLead(
        leadData: Partial<LeadData> = {},
        instructions: CreateLeadOptions = {
            createpersonifnotexists: false,
            notifydepartment: false
        }
    ): Promise<CreateLeadResponse> {
        return this.create<CreateLeadResponse, LeadData, CreateLeadOptions>(
            '/api/widget/createLead',
            leadData,
            leadDataSchema,
            instructions
        );
    }

    async searchLeads(instructions: SearchInstructions): Promise<SearchLeadResponse> {
        return this.search<SearchLeadResponse>(
            '/api/widget/getRecords',
            instructions,
        );
    }

    async updateLead(
        id: number,
        updates: Partial<LeadUpdateData>
    ): Promise<UpdateLeadResponse> {
        const parsedData = leadUpdateSchema.partial().safeParse(updates);
        if (!parsedData.success) {
            const formattedError = formatValidationError(parsedData.error);
            throw new Error(`Validation failed: ${formattedError}`);
        }

        const payload = this.buildUpdatePayload(id, parsedData.data);
        return this.update<UpdateLeadResponse>('/api/widget/updateRecord', payload);
    }

    protected buildCreatePayload(data: LeadData, instructions: CreateLeadOptions): CreateLeadPayload {
        return {
            trackerrms: {
                createLead: { 
                    credentials: this.credentials,
                    instructions: {
                        createpersonifnotexists: instructions.createpersonifnotexists,
                        notifydepartment: instructions.notifydepartment,
                    },
                    lead: data, 
                },
            },
        };
    }

    protected buildSearchPayload(instructions: SearchInstructions): SearchLeadPayload {
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
        throw new Error("Find operation not implemented for Leads");
    }

    protected buildUpdatePayload(id: number, updates: Partial<LeadUpdateData>): UpdateLeadPayload {
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