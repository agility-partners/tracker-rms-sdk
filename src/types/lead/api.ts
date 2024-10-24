// src/types/lead/api.ts
import { 
    type BaseEntityConfig, 
    type BuildEntityTypes 
} from "../common/entityTypes";
import type { LeadData } from "./schema";
import type { LeadSearchResult } from "./models";

export const LEAD_OPERATION = 'createLead' as const;
export const LEAD_FIELD = 'lead' as const;

interface CreateLeadConfig {
    createpersonifnotexists: boolean;
    notifydepartment: boolean;
}

type LeadEntityConfig = BaseEntityConfig<
    LeadData,
    LeadSearchResult,
    CreateLeadConfig,
    typeof LEAD_OPERATION,
    typeof LEAD_FIELD
>;

export type LeadTypeBundle = BuildEntityTypes<LeadEntityConfig>;

export type CreateLeadOptions = LeadTypeBundle['Config']['Instructions'];
export type CreateLeadPayload = LeadTypeBundle['Payloads']['Create'];
export type SearchLeadPayload = LeadTypeBundle['Payloads']['Search'];
export type CreateLeadResponse = LeadTypeBundle['Responses']['Create'];
export type SearchLeadResponse = LeadTypeBundle['Responses']['Search'];
export type GetLeadResponse = LeadTypeBundle['Responses']['Get'];
