import { BaseApi } from '../base';
import {
    candidateDataSchema,
    type CandidateData,
    type CandidateInstructions,
    type CreateCandidatePayload,
    type CreateCandidateResponse
} from '../../types/candidate';

export class Candidates extends BaseApi {
    async createCandidate(
        candidateData: Partial<CandidateData> = {},
        instructions: Partial<CandidateInstructions> = {}
    ): Promise<CreateCandidateResponse> {
        return this.create<CreateCandidateResponse, CandidateData, Partial<CandidateInstructions>>(
            '/api/widget/createResource',
            candidateData,
            candidateDataSchema,
            'creating candidate',
            instructions
        );
    }

    protected buildCreatePayload(candidateData: CandidateData, instructions: Partial<CandidateInstructions> = {}): CreateCandidatePayload {
        return {
            trackerrms: {
                createResource: {
                    credentials: this.credentials,
                    instructions: {
                        overwriteresource: instructions.overwriteresource ?? false,
                        assigntoopportunity: instructions.assigntoopportunity,
                        assigntolist: instructions.assigntolist,
                        shortlistedby: instructions.shortlistedby,
                    },
                    resource: candidateData,
                },
            },
        };
    }

    protected buildFindPayload(id: number): any {
        // Implement this method if you need to find candidates by ID
        // If not needed, you can throw an error or leave it as a stub
        throw new Error("Find operation not implemented for Candidates");
    }

    protected buildUpdatePayload(id: number): any {
        // Implement this if you need to find leads by ID
        // If not needed, you can throw an error or leave it as a stub
        throw new Error("Find operation not implemented for Leads");
    }
}