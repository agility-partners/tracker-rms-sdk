import { 
    type BaseEntityConfig, 
    type BuildEntityTypes 
} from "../common/entityTypes";
import type { CompanySearchResult } from "./models";
import type { CompanyData } from "./schema";

export const COMPANY_OPERATION = 'createContact' as const;
export const COMPANY_FIELD = 'contact' as const;

interface CreateCompanyConfig {
    createcompanyifnotexists: boolean
}

type CompanyEntityConfig = BaseEntityConfig<
    CompanyData,
    CompanySearchResult,
    CreateCompanyConfig,
    typeof COMPANY_OPERATION,
    typeof COMPANY_FIELD
>;

export type CompanyTypeBundle = BuildEntityTypes<CompanyEntityConfig>;

export type CreateCompanyOptions = CompanyTypeBundle['Config']['Instructions'];
export type CreateCompanyPayload = CompanyTypeBundle['Payloads']['Create'];
export type SearchCompanyPayload = CompanyTypeBundle['Payloads']['Search'];
export type CreateCompanyResponse = CompanyTypeBundle['Responses']['Create'];
export type SearchCompanyResponse = CompanyTypeBundle['Responses']['Search'];
export type GetCompanyResponse = CompanyTypeBundle['Responses']['Get'];
export type UpdateCompanyPayload = CompanyTypeBundle['Payloads']['Update'];
export type UpdateCompanyResponse = CompanyTypeBundle['Responses']['Update'];