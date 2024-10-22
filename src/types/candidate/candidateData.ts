import { z } from 'zod';
import { generateDefaultsFromSchema } from '../../utils/generateDefaults';

const JobHistorySchema = z.object({
  company: z.string(),
  jobtitle: z.string(),
  startdate: z.string(),
  enddate: z.string().optional(),
  description: z.string(),
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
  company: z.string(),
  address1: z.string(),
  address2: z.string().optional(),
  city: z.string(),
  state: z.string(),
  zipcode: z.string(),
  country: z.string(),
  workphone: z.string().optional(),
  homephone: z.string().optional(),
  cellphone: z.string().optional(),
  email: z.string().email(),
  linkedin: z.string().url().optional(),
  dateofbirth: z.string(),
  nationality: z.string(),
  languages: z.string(),
  education: z.string(),
  source: z.string(),
  jobhistory: z.array(JobHistorySchema).optional(),
  salary: z.number(),
  note: z.string(),
  image: z.string().url(),
  skills: z.string(),
  status: z.string(),
  customfields: z.array(CustomFieldSchema).optional(),
});

export type CandidateData = z.infer<typeof candidateDataSchema>;

export const candidateDataDefaults = generateDefaultsFromSchema<CandidateData>(candidateDataSchema);