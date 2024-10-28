import { BaseApi } from '../base';
import type { SearchInstructions } from '../../types/search/schema';
import {
    type CreateJobOptions,
    type CreateJobPayload,
    type CreateJobResponse,
    type SearchJobPayload,
    type SearchJobResponse,
    type UpdateJobPayload,
    type UpdateJobResponse,
    type JobData,
    type JobUpdateData,
    jobDataSchema,
    jobUpdateSchema,
} from '../../types/job';
import { formatValidationError } from '../../utils/errors';

export class Jobs extends BaseApi {
    protected get entityType(): string {
        return 'O';
    }

    async createJob(
        jobData: Partial<JobData> = {},
        instructions: CreateJobOptions = {
            createpersonifnotexists: true
        }
    ): Promise<CreateJobResponse> {
        return this.create<CreateJobResponse, JobData, CreateJobOptions>(
            '/api/widget/createOpportunity',
            jobData,
            jobDataSchema,
            instructions
        );
    }

    async searchJobs(instructions: SearchInstructions): Promise<SearchJobResponse> {
        return this.search<SearchJobResponse>(
            '/api/widget/getRecords',
            instructions,
        );
    }

    async updateJob(
        id: number,
        updates: Partial<JobUpdateData>
    ): Promise<UpdateJobResponse> {
        const parsedData = jobUpdateSchema.partial().safeParse(updates);
        if (!parsedData.success) {
            const formattedError = formatValidationError(parsedData.error);
            throw new Error(`Validation failed: ${formattedError}`);
        }

        const payload = this.buildUpdatePayload(id, parsedData.data);
        return this.update<UpdateJobResponse>('/api/widget/updateRecord', payload);
    }

    protected buildCreatePayload(data: JobData, instructions: CreateJobOptions): CreateJobPayload {
        return {
            trackerrms: {
                createOpportunity: {
                    credentials: this.credentials,
                    instructions: {
                        createpersonifnotexists: instructions.createpersonifnotexists,
                    },
                    opportunity: data,
                },
            },
        };
    }

    protected buildSearchPayload(instructions: SearchInstructions): SearchJobPayload {
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
        throw new Error("Find operation not implemented for Jobs");
    }

    protected buildUpdatePayload(id: number, updates: Partial<JobUpdateData>): UpdateJobPayload {
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