import { BaseApi } from '../base';
import { 
    type CreateLeadResponse, 
    type CreateLeadPayload, 
    type LeadInstructions,
} from '../../types/lead/leadTypes';
import {
    leadDataSchema,
    type LeadData,
} from '../../types/lead/leadData';

export class Leads extends BaseApi {
    async createLead(
        leadData: Partial<LeadData> = {},
        instructions: LeadInstructions = {}
    ): Promise<CreateLeadResponse> {
        return this.create<CreateLeadResponse, LeadData, LeadInstructions>(
            '/api/widget/createLead',
            leadData,
            leadDataSchema,
            'creating lead',
            instructions
        );
    }

    protected buildCreatePayload(data: any, instructions?: any): CreateLeadPayload {
        const leadData = data as LeadData;
        const leadInstructions = instructions as LeadInstructions;

        return {
            trackerrms: {
                createLead: {
                    credentials: this.credentials,
                    instructions: {
                        createpersonifnotexists: leadInstructions?.createpersonifnotexists ?? false,
                        notifydepartment: leadInstructions?.notifydepartment ?? false,
                    },
                    lead: leadData,
                },
            },
        };
    }

    protected buildFindPayload(id: number): any {
        // Implement this if you need to find leads by ID
        // If not needed, you can throw an error or leave it as a stub
        throw new Error("Find operation not implemented for Leads");
    }

    protected buildUpdatePayload(id: number): any {
        // Implement this if you need to find leads by ID
        // If not needed, you can throw an error or leave it as a stub
        throw new Error("Find operation not implemented for Leads");
    }
}