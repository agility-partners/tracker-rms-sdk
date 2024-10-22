import {
    type CreateJobResponse,
    type CreateJobPayload,
    type GetJobResponse,
    type GetJobPayload,
    type JobInstructions,
    type UpdateJobPayload
} from '../../types/job/jobTypes';
import { 
    jobCreateDataSchema,
    jobUpdateDataSchema, 
    type JobCreateData,
    type JobUpdateData,
    type JobDetails 
} from '../../types/job/jobData';
import { ApiError } from '../../utils/errors';
import { BaseApi } from '../base';

export class Jobs extends BaseApi {
    async createJob(
        jobData: JobCreateData,
        instructions: JobInstructions = {}
    ): Promise<CreateJobResponse> {
        return this.create<CreateJobResponse, JobCreateData, JobInstructions>(
            '/api/widget/createOpportunity',
            jobData,
            jobCreateDataSchema,
            'creating job',
            instructions
        );
    }

    async findById(id: number): Promise<JobDetails> {
        const response = await this.find<GetJobResponse>(
            '/api/widget/getIndividualRecord',
            id,
            `fetching job with id ${id}`
        );

        if (!response.results || response.results.length === 0) {
            throw new ApiError('No job found', response);
        }

        return response.results[0];
    }

    async updateJob(id: number, updates: JobUpdateData): Promise<void> {
        const payload = this.buildUpdatePayload(id, updates);
        await this.update<void>(
            '/api/widget/updateRecord',
            payload,
            `updating job with id ${id}`
        );
    }

    protected buildUpdatePayload(id: number, updates: JobUpdateData): UpdateJobPayload {
        const parsedUpdates = jobUpdateDataSchema.parse(updates);
        const updateArray = Object.entries(parsedUpdates).map(([column, value]) => ({
            column,
            value: value?.toString() ?? ''
        }));

        return {
            trackerrms: {
                updateRecord: {
                    credentials: this.credentials,
                    instructions: {
                        recordtype: 'O',
                        recordid: id
                    },
                    updates: updateArray
                }
            }
        };
    }

    protected buildCreatePayload(jobData: JobCreateData, instructions: JobInstructions = {}): CreateJobPayload {
        return {
            trackerrms: {
                createOpportunity: {
                    credentials: this.credentials,
                    instructions: {
                        createpersonifnotexists: instructions.createpersonifnotexists ?? true,
                    },
                    opportunity: jobData,
                },
            },
        };
    }

    protected buildFindPayload(id: number): GetJobPayload {
        return {
            trackerrms: {
                getIndividualRecord: {
                    credentials: this.credentials,
                    instructions: {
                        recordtype: 'O',
                        recordid: id
                    }
                }
            }
        };
    }
}