import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';

// Define Zod schema for all possible job fields
export const jobDataSchema = z.object({
    opportunityname: z.string(),
    department: z.string().optional(),
    worktype: z.string().optional(),
    source: z.string().optional(),
    description: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    fullname: z.string().optional(),
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
    salary: z.number().optional(),
    customfields: z.record(z.string()).optional(),
    abilityscore: z.number().optional(),
    approvaldate: z.string().optional(),
    approvedby: z.string().optional(),
    authorityscore: z.number().optional(),
    awarddate: z.string().optional(),
    bidcosts: z.number().optional(),
    biddriver: z.string().optional(),
    bidduedate: z.string().optional(),
    bidmanager: z.string().optional(),
    bidnobid: z.string().optional(),
    bidnobidreason: z.string().optional(),
    bidtype: z.string().optional(),
    clientref: z.string().optional(),
    competitionscore: z.number().optional(),
    competitivecontactrole: z.string().optional(),
    currencycode: z.string().optional(),
    datefilled: z.string().optional(),
    dateopened: z.string().optional(),
    decisionscore: z.number().optional(),
    duration: z.number().optional(),
    enddate: z.string().optional(),
    endtime: z.string().optional(),
    estimatedvalue: z.number().optional(),
    factoredvalue: z.number().optional(),
    invoicestartdate: z.string().optional(),
    location: z.string().optional(),
    moneyscore: z.number().optional(),
    needscore: z.number().optional(),
    newrepeat: z.string().optional(),
    note: z.string().optional(),
    opportunitychargerate: z.number().optional(),
    opportunitydescription: z.string().optional(),
    opportunityrate: z.number().optional(),
    opportunitysource: z.string().optional(),
    postcodelocation: z.string().optional(),
    probability: z.number().optional(),
    publishbenefits: z.string().optional(),
    publishcategory: z.string().optional(),
    publishdescription: z.string().optional(),
    publishduration: z.string().optional(),
    publishlocation: z.string().optional(),
    publishonline: z.boolean().optional(),
    publishreference: z.string().optional(),
    publishsalaryfrom: z.number().optional(),
    publishsalaryper: z.string().optional(),
    publishsalaryto: z.number().optional(),
    publishsector: z.string().optional(),
    publishskills: z.string().optional(),
    publishstartdate: z.string().optional(),
    publishtitle: z.string().optional(),
    publishworktype: z.string().optional(),
    reasonforclose: z.string().optional(),
    startdate: z.string().optional(),
    starttime: z.string().optional(),
    tagtext: z.string().optional(),
    targetmargin: z.number().optional(),
    timingscore: z.number().optional(),
    winstrategy: z.string().optional(),
});

// Infer TypeScript type from the Zod schema
export type JobData = z.infer<typeof jobDataSchema>;

// Define the fields that are valid for job creation
const jobCreateFields = [
    'opportunityname',
    'department',
    'worktype',
    'source',
    'description',
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
    'salary',
    'customfields',
] as const;

// Create a type for job creation data
export type JobCreateData = Pick<JobData, typeof jobCreateFields[number]>;

// Create a Zod schema for job creation data
export const jobCreateDataSchema = jobDataSchema.pick(
    jobCreateFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}) as Record<typeof jobCreateFields[number], true>
);

// The update data can include all fields
export type JobUpdateData = Partial<JobData>;

// The update schema is the same as the full schema, but with all fields optional
export const jobUpdateDataSchema = jobDataSchema.partial();

// Automatically generate defaults for JobCreateData
export const jobCreateDataDefaults = generateDefaultsFromSchema<JobCreateData>(jobCreateDataSchema);

export const jobDetailsSchema = z.object({
    id: z.number(),
    name: z.string(),
    clientid: z.number(),
    clientname: z.string(),
    contactid: z.number(),
    contactname: z.string(),
    status: z.string(),
    type: z.unknown().nullable().optional(),
    values: z.unknown().nullable().optional(),
    shortlisted: z.unknown().nullable().optional(),
    description: z.string().optional(),
    executivesummary: z.array(z.unknown()).optional(),
    nameinitials: z.string().optional(),
    subject: z.string().optional(),
    winstrategy: z.unknown().nullable().optional(),
    Owners: z.unknown().nullable().optional(),
});

export type JobDetails = z.infer<typeof jobDetailsSchema>;