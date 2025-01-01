import { 
    type BaseEntityConfig, 
    type BuildEntityTypes 
} from "../common/entityTypes";
import type { SettingsData, SettingsSearchResult } from "./models";

export const SETTINGS_OPERATION = 'createSettings' as const;
export const SETTINGS_FIELD = 'settings' as const;

interface CreateSettingsConfig {
    applyglobally: boolean;
    notifyusers: boolean;
}

type SettingsEntityConfig = BaseEntityConfig<
    SettingsData,
    SettingsSearchResult,
    CreateSettingsConfig,
    typeof SETTINGS_OPERATION,
    typeof SETTINGS_FIELD
>;

export type SettingsTypeBundle = BuildEntityTypes<SettingsEntityConfig>;

export type CreateSettingsOptions = SettingsTypeBundle['Config']['Instructions'];
export type CreateSettingsPayload = SettingsTypeBundle['Payloads']['Create'];
export type SearchSettingsPayload = SettingsTypeBundle['Payloads']['Search'];
export type CreateSettingsResponse = SettingsTypeBundle['Responses']['Create'];
export type SearchSettingsResponse = SettingsTypeBundle['Responses']['Search'];
export type GetSettingsResponse = SettingsTypeBundle['Responses']['Get'];
export type UpdateSettingsPayload = SettingsTypeBundle['Payloads']['Update'];
export type UpdateSettingsResponse = SettingsTypeBundle['Responses']['Update'];