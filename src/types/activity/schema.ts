import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';

export const activityDataSchema = z.object({
    subject: z.string(),
    type: z.string(),
    date: z.string(),
    time: z.string(),
    status: z.string(),
    priority: z.string(),
    contactType: z.string(),
    note: z.string().optional(),
    userId: z.number(),
    linkRecordType: z.string(),
    linkRecordId: z.number(),
    customfields: z.array(
        z.object({
            id: z.number(),
            value: z.string()
        })
    ).optional()
});

export type ActivityData = z.infer<typeof activityDataSchema>;
export const activityDataDefaults = generateDefaultsFromSchema<ActivityData>(activityDataSchema);

export const activityUpdateSchema = z.object({
    activitytype: z.string().optional(),
    contacttype: z.string().optional(),
    datedue: z.string().optional(),
    enddate: z.string().optional(),
    endtime: z.string().optional(),
    interviewer: z.string().optional(),
    interviewtype: z.string().optional(),
    location: z.string().optional(),
    note: z.string().optional(),
    priority: z.string().optional(),
    reminderdatetime: z.string().optional(),
    startdate: z.string().optional(),
    starttime: z.string().optional(),
    subject: z.string().optional(),
    taskstatus: z.string().optional(),
    timedue: z.string().optional()
});

export type ActivityUpdateData = z.infer<typeof activityUpdateSchema>;