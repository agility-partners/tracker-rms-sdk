import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';

export const leadDataSchema = z.object({
    leadname: z.string(),
    department: z.string().optional(),
    source: z.string().optional(),
    description: z.string().optional(),
    leadpersontype: z.string(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    fullname: z.string(),
    jobtitle: z.string().optional(),
    company: z.string().optional(),
    address1: z.string().optional(),
    address2: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipcode: z.string().optional(),
    country: z.string().optional(),
    businessphone: z.string().optional(),
    homephone: z.string().optional(),
    cellphone: z.string().optional(),
    email: z.string().optional(),
    linkedin: z.string().optional(),
    website: z.string().optional(),
    image: z.string().optional(),
    customfields: z.record(z.string()).optional(),
});

export type LeadData = z.infer<typeof leadDataSchema>;
export const leadDataDefaults = generateDefaultsFromSchema<LeadData>(leadDataSchema);
