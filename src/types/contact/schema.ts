import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';

// Define Zod schema for all possible contact fields
export const contactDataSchema = z.object({
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
    note: z.string().optional(),
    image: z.string().optional(),
    customfields: z.record(z.string()).optional(),
    // Add any other fields that are part of the contact data
});

export type ContactData = z.infer<typeof contactDataSchema>;
export const contactDataDefaults = generateDefaultsFromSchema<ContactData>(contactDataSchema);
