import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';
import { CustomFieldSchema } from '../common/entityTypes';

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
    image: z.string().optional()
});

export type ContactData = z.infer<typeof contactDataSchema>;
export const contactDataDefaults = generateDefaultsFromSchema<ContactData>(contactDataSchema);

// Define schema for updating contacts
export const contactUpdateSchema = z.object({
    addressline1: z.string().optional(),
    addressline2: z.string().optional(),
    anniversary: z.string().optional(),
    assistant: z.string().optional(),
    birthday: z.string().optional(),
    businessphone: z.string().optional(),
    businessunit: z.string().optional(),
    company: z.string().optional(),
    contactsource: z.string().optional(),
    country: z.string().optional(),
    county: z.string().optional(),
    department: z.string().optional(),
    displayas: z.string().optional(),
    email: z.string().optional(),
    fax: z.string().optional(),
    firstname: z.string().optional(),
    homephone: z.string().optional(),
    internalref: z.string().optional(),
    jobtitle: z.string().optional(),
    lastname: z.string().optional(),
    manager: z.string().optional(),
    marketing: z.string().optional(),
    mobilephone: z.string().optional(),
    nickname: z.string().optional(),
    note: z.string().optional(),
    office: z.string().optional(),
    otherphone: z.string().optional(),
    pagerphone: z.string().optional(),
    photo: z.string().optional(),
    postcode: z.string().optional(),
    postcodex: z.string().optional(),
    postcodey: z.string().optional(),
    primary: z.string().optional(),
    referralfrom: z.string().optional(),
    salutation: z.string().optional(),
    spousesname: z.string().optional(),
    supportpassword: z.string().optional(),
    supportusername: z.string().optional(),
    surname: z.string().optional(),
    tag: z.string().optional(),
    text: z.string().optional(),
    town: z.string().optional(),
    website: z.string().optional(),
    customfields: z.array(CustomFieldSchema).optional(),
    skills: z.array(z.object({
        id: z.number(),
        value: z.string()
    })).optional()
});

export type ContactUpdateData = z.infer<typeof contactUpdateSchema>;