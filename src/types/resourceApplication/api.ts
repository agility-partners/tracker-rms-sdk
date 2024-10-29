import { 
    type BaseEntityConfig, 
    type BuildEntityTypes 
} from "../common/entityTypes";
import type { ResourceApplicationData } from "./schema";

export const RESOURCE_APPLICATION_FIELD = 'resourceApplication' as const;

interface CreateResourceApplicationConfig {
    opportunityid: string;
    resourceid: string;
    assigntolist: string;
    shortlistedby: string;
    source: string;
}

type ResourceApplicationEntityConfig = BaseEntityConfig<
    ResourceApplicationData,
    never,
    CreateResourceApplicationConfig,
    never,
    typeof RESOURCE_APPLICATION_FIELD
>;

export type ResourceApplicationTypeBundle = BuildEntityTypes<ResourceApplicationEntityConfig>;

export type CreateResourceApplicationOptions = ResourceApplicationTypeBundle['Config']['Instructions'];
export type CreateResourceApplicationPayload = ResourceApplicationTypeBundle['Payloads']['Create'];
export type CreateResourceApplicationResponse = ResourceApplicationTypeBundle['Responses']['Create'];