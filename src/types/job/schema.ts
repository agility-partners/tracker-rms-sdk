import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';

export const jobDataSchema = z.object({
    opportunityname: z.string(),
    department: z.string().optional(),
    worktype: z.string().optional(),
    source: z.string().optional(),
    description: z.string().optional(),
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
    customfields: z.record(z.string()).optional(),
});

export type JobData = z.infer<typeof jobDataSchema>;
export const jobDataDefaults = generateDefaultsFromSchema<JobData>(jobDataSchema);

export const jobUpdateSchema = z.object({
    abilityscore: z.string().optional(),
    approvaldate: z.string().optional(),
    approvedby: z.string().optional(),
    authorityscore: z.string().optional(),
    awarddate: z.string().optional(),
    bidcosts: z.string().optional(),
    biddriver: z.string().optional(),
    bidduedate: z.string().optional(),
    bidmanager: z.string().optional(),
    bidnobid: z.string().optional(),
    bidnobidreason: z.string().optional(),
    bidtype: z.string().optional(),
    clientref: z.string().optional(),
    competitionscore: z.string().optional(),
    competitive: z.string().optional(),
    contactrole: z.string().optional(),
    currencycode: z.string().optional(),
    datefilled: z.string().optional(),
    dateopened: z.string().optional(),
    decisionscore: z.string().optional(),
    department: z.string().optional(),
    duration: z.string().optional(),
    enddate: z.string().optional(),
    endtime: z.string().optional(),
    estimatedvalue: z.string().optional(),
    factoredvalue: z.string().optional(),
    invoicestartdate: z.string().optional(),
    location: z.string().optional(),
    moneyscore: z.string().optional(),
    needscore: z.string().optional(),
    newrepeat: z.string().optional(),
    note: z.string().optional(),
    opportunitychargerate: z.string().optional(),
    opportunitydescription: z.string().optional(),
    opportunityname: z.string().optional(),
    opportunityrate: z.string().optional(),
    opportunitysource: z.string().optional(),
    postcodelocation: z.string().optional(),
    probability: z.string().optional(),
    publishbenefits: z.string().optional(),
    publishcategory: z.string().optional(),
    publishdescription: z.string().optional(),
    publishduration: z.string().optional(),
    publishlocation: z.string().optional(),
    publishonline: z.string().optional(),
    publishreference: z.string().optional(),
    publishsalaryfrom: z.string().optional(),
    publishsalaryper: z.string().optional(),
    publishsalaryto: z.string().optional(),
    publishsector: z.string().optional(),
    publishskills: z.string().optional(),
    publishstartdate: z.string().optional(),
    publishtitle: z.string().optional(),
    publishworktype: z.string().optional(),
    reasonforclose: z.string().optional(),
    startdate: z.string().optional(),
    starttime: z.string().optional(),
    tag: z.string().optional(),
    text: z.string().optional(),
    targetmargin: z.string().optional(),
    timingscore: z.string().optional(),
});

export type JobUpdateData = z.infer<typeof jobUpdateSchema>;