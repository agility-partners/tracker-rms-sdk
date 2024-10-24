import { BaseApi } from '../base';
import type { SearchInstructions } from '../../types/search/searchData';
import { 
    type CreateLeadOptions,
    type CreateLeadPayload,
    type CreateLeadResponse,
    type SearchLeadPayload,
    type SearchLeadResponse,
    type LeadData,
    leadDataSchema,
} from '../../types/lead';

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

    protected buildUpdatePayload(id: number): never {
        throw new Error("Update operation not implemented for Leads");
    }
}