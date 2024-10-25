import { 
    type BaseEntityConfig, 
    type BuildEntityTypes 
} from "../common/entityTypes";
import type { ActivitySearchResult } from "./models";
import type { ActivityData } from "./schema";

export const ACTIVITY_OPERATION = 'createActivity' as const;
export const ACTIVITY_FIELD = 'activity' as const;

interface CreateActivityConfig {
}

type ActivityEntityConfig = BaseEntityConfig<
    ActivityData,
    ActivitySearchResult,
    CreateActivityConfig,
    typeof ACTIVITY_OPERATION,
    typeof ACTIVITY_FIELD
>;

export type ActivityTypeBundle = BuildEntityTypes<ActivityEntityConfig>;

export type CreateActivityOptions = ActivityTypeBundle['Config']['Instructions'];
export type CreateActivityPayload = ActivityTypeBundle['Payloads']['Create'];
export type SearchActivityPayload = ActivityTypeBundle['Payloads']['Search'];
export type CreateActivityResponse = ActivityTypeBundle['Responses']['Create'];
export type SearchActivityResponse = ActivityTypeBundle['Responses']['Search'];
export type GetActivityResponse = ActivityTypeBundle['Responses']['Get'];
export type UpdateActivityPayload = ActivityTypeBundle['Payloads']['Update'];
export type UpdateActivityResponse = ActivityTypeBundle['Responses']['Update'];