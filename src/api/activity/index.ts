import { BaseApi } from '../base';
import type { SearchInstructions } from '../../types/search/searchData';
import { formatValidationError } from '../../utils/errors';
import { activityDataSchema, activityUpdateSchema, type ActivityData, type ActivityUpdateData, type CreateActivityOptions, type CreateActivityPayload, type CreateActivityResponse, type SearchActivityPayload, type SearchActivityResponse, type UpdateActivityPayload, type UpdateActivityResponse } from '../../types/activity';

export class Activities extends BaseApi {
    protected buildFindPayload(id: number) {
        throw new Error('Method not implemented.');
    }
    protected get entityType(): string {
        return 'A';
    }

    async createActivity(
        activityData: Partial<ActivityData> = {},
        instructions: CreateActivityOptions = {}
    ): Promise<CreateActivityResponse> {
        return this.create<CreateActivityResponse, ActivityData, CreateActivityOptions>(
            '/api/widget/createActivity',
            activityData,
            activityDataSchema,
            instructions,
            true  // This endpoint requires basic auth
        );
    }

    async searchActivities(instructions: SearchInstructions): Promise<SearchActivityResponse> {
        return this.search<SearchActivityResponse>(
            '/api/widget/getRecords',
            instructions
        );
    }

    async updateActivity(
        id: number,
        updates: Partial<ActivityUpdateData>
    ): Promise<UpdateActivityResponse> {
        const parsedData = activityUpdateSchema.partial().safeParse(updates);
        if (!parsedData.success) {
            const formattedError = formatValidationError(parsedData.error);
            throw new Error(`Validation failed: ${formattedError}`);
        }

        const payload = this.buildUpdatePayload(id, parsedData.data);
        return this.update<UpdateActivityResponse>('/api/widget/updateRecord', payload);
    }

    protected buildCreatePayload(data: ActivityData, instructions: CreateActivityOptions): CreateActivityPayload {
        return {
            trackerrms: {
                createActivity: {
                    credentials: this.credentials,
                    instructions: {
                    },
                    activity: data,
                },
            },
        };
    }

    protected buildSearchPayload(instructions: SearchInstructions): SearchActivityPayload {
        return {
            trackerrms: {
                getRecords: {
                    credentials: this.credentials,
                    instructions
                }
            }
        };
    }


    protected buildUpdatePayload(id: number, updates: Partial<ActivityUpdateData>): UpdateActivityPayload {
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