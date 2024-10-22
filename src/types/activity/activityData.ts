import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';

const CustomFieldSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export const activityDataSchema = z.object({
  subject: z.string(),
  type: z.string(),
  date: z.string(),
  time: z.string(),
  status: z.enum([
    'Completed',
    'Pending',
    'In Progress',
    'Cancelled'
  ]),
  priority: z.enum([
    'High',
    'Medium',
    'Low'
  ]),
  contactType: z.enum([
    'Inbound',
    'Outbound'
  ]),
  note: z.string(),
  userId: z.number(),
  linkRecordType: z.string(),
  linkRecordId: z.number(),
  instructions: z.record(z.unknown()).optional(),
  customfields: z.array(CustomFieldSchema).optional(),
});

export type ActivityData = z.infer<typeof activityDataSchema>;

export const activityDataDefaults = generateDefaultsFromSchema<ActivityData>(activityDataSchema);