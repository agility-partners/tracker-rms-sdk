import { 
    type BaseEntityConfig, 
    type BuildEntityTypes 
} from "../common/entityTypes";
import type { ContactData } from "./schema";
import type { ContactSearchResult } from "./models";

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
export type UpdateContactPayload = ContactTypeBundle['Payloads']['Update'];
export type UpdateContactResponse = ContactTypeBundle['Responses']['Update'];