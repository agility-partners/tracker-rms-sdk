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

// Infer TypeScript type from the Zod schema
export type ContactData = z.infer<typeof contactDataSchema>;

// Define the fields that are valid for contact creation
const contactCreateFields = [
    'firstname',
    'lastname',
    'fullname',
    'jobtitle',
    'company',
    'address1',
    'address2',
    'city',
    'state',
    'zipcode',
    'country',
    'businessphone',
    'homephone',
    'cellphone',
    'email',
    'linkedin',
    'website',
    'note',
    'image',
    'customfields',
] as const;

// Create a type for contact creation data
export type ContactCreateData = Pick<ContactData, typeof contactCreateFields[number]>;

// Create a Zod schema for contact creation data
export const contactCreateDataSchema = contactDataSchema.pick(
    contactCreateFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}) as Record<typeof contactCreateFields[number], true>
);

// The update data can include all fields
export type ContactUpdateData = Partial<ContactData>;

// The update schema is the same as the full schema, but with all fields optional
export const contactUpdateDataSchema = contactDataSchema.partial();

// Automatically generate defaults for ContactCreateData
export const contactCreateDataDefaults = generateDefaultsFromSchema<ContactCreateData>(contactCreateDataSchema);
