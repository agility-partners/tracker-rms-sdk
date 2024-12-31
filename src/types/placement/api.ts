// src/types/lead/api.ts
import { 
    type BaseEntityConfig, 
    type BuildEntityTypes 
} from "../common/entityTypes";
import type { PlacementData } from "./schema";
import type { PlacementSearchResult } from "./models";

export const PLACEMENT_OPERATION = 'createPlacement' as const;
export const PLACEMENT_FIELD = 'placement' as const;

interface CreatePlacementConfig {
}

type PlacementEntityConfig = BaseEntityConfig<
    PlacementData,
    PlacementSearchResult,
    CreatePlacementConfig,
    typeof PLACEMENT_OPERATION,
    typeof PLACEMENT_FIELD
>;

export type PlacementTypeBundle = BuildEntityTypes<PlacementEntityConfig>;

export type CreatePlacementOptions = PlacementTypeBundle['Config']['Instructions'];
export type CreatePlacementPayload = PlacementTypeBundle['Payloads']['Create'];
export type SearchPlacementPayload = PlacementTypeBundle['Payloads']['Search'];
export type CreatePlacementResponse = PlacementTypeBundle['Responses']['Create'];
export type SearchPlacementResponse = PlacementTypeBundle['Responses']['Search'];
export type GetPlacementResponse = PlacementTypeBundle['Responses']['Get'];
export type UpdatePlacementPayload = PlacementTypeBundle['Payloads']['Update'];
export type UpdatePlacementResponse = PlacementTypeBundle['Responses']['Update'];