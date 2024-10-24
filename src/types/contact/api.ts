// src/types/lead/api.ts
import { 
    type BaseEntityConfig, 
    type BuildEntityTypes 
} from "../common/entityTypes";
import type { ContactSearchResult } from "./models";
import type { ContactData } from "./schema";

export const CONTACT_OPERATION = 'createContact' as const;
export const CONTACT_FIELD = 'contact' as const;

interface CreateContactConfig {
    createcompanyifnotexists: boolean,
    overwritecontact: boolean
}

type ContactEntityConfig = BaseEntityConfig<
    ContactData,
    ContactSearchResult,
    CreateContactConfig,
    typeof CONTACT_OPERATION,
    typeof CONTACT_FIELD
>;

export type ContactTypeBundle = BuildEntityTypes<ContactEntityConfig>;

export type CreateContactOptions = ContactTypeBundle['Config']['Instructions'];
export type CreateContactPayload = ContactTypeBundle['Payloads']['Create'];
export type SearchContactPayload = ContactTypeBundle['Payloads']['Search'];
export type CreateContactResponse = ContactTypeBundle['Responses']['Create'];
export type SearchContactResponse = ContactTypeBundle['Responses']['Search'];
export type GetContactResponse = ContactTypeBundle['Responses']['Get'];
