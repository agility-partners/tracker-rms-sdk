import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';
import { CustomFieldSchema } from '../common/entityTypes';

export const placementDataSchema = z.object({
    customfields: z.record(z.string()).optional(),
});

export type PlacementData = z.infer<typeof placementDataSchema>;
export const placementDataDefaults = generateDefaultsFromSchema<PlacementData>(placementDataSchema);

export const placementUpdateSchema = z.object({
    opportunityresourcestatusid: z.string().optional(),
});

export type placementUpdateData = z.infer<typeof placementUpdateSchema>;