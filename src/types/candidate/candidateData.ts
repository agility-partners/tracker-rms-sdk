import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';

const JobHistorySchema = z.object({
  company: z.string().optional(),
  jobtitle: z.string().optional(),
  startdate: z.string().optional(),
  enddate: z.string().optional(),
  description: z.string().optional(),
});

const CustomFieldSchema = z.object({
  id: z.number(),
  value: z.string(),
});

export const candidateDataSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  fullname: z.string(),
  jobtitle: z.string(),
  company: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipcode: z.string().optional(),
  country: z.string().optional(),
  workphone: z.string().optional(),
  homephone: z.string().optional(),
  cellphone: z.string().optional(),
  email: z.string().optional(),
  linkedin: z.string().optional(),
  dateofbirth: z.string().optional(),
  nationality: z.string().optional(),
  languages: z.string().optional(),
  education: z.string().optional(),
  source: z.string().optional(),
  jobhistory: z.array(JobHistorySchema).optional(),
  salary: z.number().optional(),
  note: z.string().optional(),
  image: z.string().optional(),
  skills: z.string().optional(),
  status: z.string().optional(),
  customfields: z.array(CustomFieldSchema).optional(),
});

export type CandidateData = z.infer<typeof candidateDataSchema>;

export const candidateDataDefaults = generateDefaultsFromSchema<CandidateData>(candidateDataSchema);