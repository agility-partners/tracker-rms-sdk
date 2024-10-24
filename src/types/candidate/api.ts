import {
    type BaseEntityConfig,
    type BuildEntityTypes
} from "../common/entityTypes";
import type { CandidateData } from "./schema";
import type { CandidateSearchResult } from "./models";

export const CANDIDATE_OPERATION = 'createResource' as const;
export const CANDIDATE_FIELD = 'resource' as const;

interface CreateCandidateConfig {
    overwriteresource?: boolean,
    assigntoopportunity?: number,
    assigntolist?: string,
    shortlistedby?: string
}

type CandidateEntityConfig = BaseEntityConfig<
    CandidateData,
    CandidateSearchResult,
    CreateCandidateConfig,
    typeof CANDIDATE_OPERATION,
    typeof CANDIDATE_FIELD
>;

export type CandidateTypeBundle = BuildEntityTypes<CandidateEntityConfig>;

export type CreateCandidateOptions = CandidateTypeBundle['Config']['Instructions'];
export type CreateCandidatePayload = CandidateTypeBundle['Payloads']['Create'];
export type SearchCandidatePayload = CandidateTypeBundle['Payloads']['Search'];
export type CreateCandidateResponse = CandidateTypeBundle['Responses']['Create'];
export type SearchCandidateResponse = CandidateTypeBundle['Responses']['Search'];
export type GetCandidateResponse = CandidateTypeBundle['Responses']['Get'];
export type UpdateCandidatePayload = CandidateTypeBundle['Payloads']['Update'];
export type UpdateCandidateResponse = CandidateTypeBundle['Responses']['Update'];