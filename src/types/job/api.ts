import { 
    type BaseEntityConfig, 
    type BuildEntityTypes 
} from "../common/entityTypes";
import type { JobSearchResult } from "./models";
import type { JobData } from "./schema";

export const JOB_OPERATION = 'createOpportunity' as const;
export const JOB_FIELD = 'opportunity' as const;

interface CreateJobConfig {
    createpersonifnotexists: boolean
}

type JobEntityConfig = BaseEntityConfig<
    JobData,
    JobSearchResult,
    CreateJobConfig,
    typeof JOB_OPERATION,
    typeof JOB_FIELD
>;

export type JobTypeBundle = BuildEntityTypes<JobEntityConfig>;

export type CreateJobOptions = JobTypeBundle['Config']['Instructions'];
export type CreateJobPayload = JobTypeBundle['Payloads']['Create'];
export type SearchJobPayload = JobTypeBundle['Payloads']['Search'];
export type CreateJobResponse = JobTypeBundle['Responses']['Create'];
export type SearchJobResponse = JobTypeBundle['Responses']['Search'];
export type GetJobResponse = JobTypeBundle['Responses']['Get'];
export type UpdateJobPayload = JobTypeBundle['Payloads']['Update'];
export type UpdateJobResponse = JobTypeBundle['Responses']['Update'];