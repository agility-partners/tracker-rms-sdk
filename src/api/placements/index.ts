import { BaseApi } from '../base';
import type { SearchInstructions } from '../../types/search/schema';
import { formatValidationError } from '../../utils/errors';
import { 
    placementDataSchema,
    placementUpdateSchema,
    type CreatePlacementOptions, 
    type CreatePlacementPayload, 
    type CreatePlacementResponse, 
    type PlacementData,
    type placementUpdateData,
    type SearchPlacementPayload, 
    type SearchPlacementResponse, 
    type UpdatePlacementPayload, 
    type UpdatePlacementResponse } from '../../types/placement';

export class Placements extends BaseApi {
    protected get entityType(): string {
        return 'X';
    }

    async createPlacement(
        placementData: Partial<PlacementData> = {},
        instructions: CreatePlacementOptions = {
            createpersonifnotexists: false,
            notifydepartment: false
        }
    ): Promise<CreatePlacementResponse> {
        return this.create<CreatePlacementResponse, PlacementData, CreatePlacementOptions>(
            '/api/widget/createPlacement',
            placementData,
            placementDataSchema,
            instructions
        );
    }

    async searchPlacement(instructions: SearchInstructions): Promise<SearchPlacementResponse> {
        return this.search<SearchPlacementResponse>(
            '/api/widget/getRecords',
            instructions,
        );
    }

    async updatePlacement(
        id: number,
        updates: Partial<placementUpdateData>
    ): Promise<UpdatePlacementResponse> {
        const parsedData = placementUpdateSchema.partial().safeParse(updates);
        if (!parsedData.success) {
            const formattedError = formatValidationError(parsedData.error);
            throw new Error(`Validation failed: ${formattedError}`);
        }

        const payload = this.buildUpdatePayload(id, parsedData.data);

        console.log('payload', payload);
        return this.update<UpdatePlacementResponse>('/api/widget/updateRecord', payload);
    }

    protected buildCreatePayload(data: PlacementData, instructions: CreatePlacementOptions): CreatePlacementPayload {
        return {
            trackerrms: {
                createPlacement: { 
                    credentials: this.credentials,
                    instructions: {
                    },
                    placement: data, 
                },
            },
        };
    }

    protected buildSearchPayload(instructions: SearchInstructions): SearchPlacementPayload {
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
        throw new Error("Find operation not implemented for Placements");
    }

    protected buildUpdatePayload(id: number, updates: Partial<placementUpdateData>): UpdatePlacementPayload {
        const updateFields = Object.entries(updates).map(([column, value]) => ({
            column,
            value: value?.toString() ?? ''
        }));

         // Assuming customfields and skills are part of updates
        //  const customFields = updates.customfields?.map(field => ({
        //     id: field.id,
        //     value: field.value
        // })) ?? [];

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