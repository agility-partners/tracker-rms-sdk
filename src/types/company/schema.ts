import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';
import { contactDataSchema } from '../contact';

export const companyDataSchema = contactDataSchema;

export type CompanyData = z.infer<typeof companyDataSchema>;
export const companyDataDefaults = generateDefaultsFromSchema<CompanyData>(companyDataSchema);

export const companyUpdateSchema = z.object({
    accountno: z.string().optional(),
    addressline1: z.string().optional(),
    addressline2: z.string().optional(),
    background: z.string().optional(),
    bankname: z.string().optional(),
    bankreference: z.string().optional(),
    cancellationdate: z.string().optional(),
    cancellationreason: z.string().optional(),
    clientname: z.string().optional(),
    clientsource: z.string().optional(),
    contractref1: z.string().optional(),
    contractref2: z.string().optional(),
    country: z.string().optional(),
    county: z.string().optional(),
    department: z.string().optional(),
    email: z.string().optional(),
    fax: z.string().optional(),
    internalref: z.string().optional(),
    note: z.string().optional(),
    postcode: z.string().optional(),
    ranking: z.string().optional(),
    renewal1date: z.string().optional(),
    renewal2date: z.string().optional(),
    sortcode: z.string().optional(),
    specialterms: z.string().optional(),
    tag: z.string().optional(),
    text: z.string().optional(),
    targetrevenue: z.string().optional(),
    taxexempt: z.string().optional(),
    telephone: z.string().optional(),
    town: z.string().optional(),
    turnover: z.string().optional(),
    website: z.string().optional(),
});

export type CompanyUpdateData = z.infer<typeof companyUpdateSchema>;