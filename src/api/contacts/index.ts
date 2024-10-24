import { BaseApi } from '../base';
import type { SearchInstructions } from '../../types/search/searchData';
import { 
    type CreateContactOptions,
    type CreateContactPayload,
    type CreateContactResponse,
    type SearchContactPayload,
    type SearchContactResponse,
    type ContactData,
    contactDataSchema,
} from '../../types/contact';

export class Contacts extends BaseApi {
    protected get entityType(): string {
        return 'N';
    }

    async createContact(
        contactData: Partial<ContactData> = {},
        instructions: CreateContactOptions = {
            createcompanyifnotexists: true,
            overwritecontact: false
        }
    ): Promise<CreateContactResponse> {
        return this.create<CreateContactResponse, ContactData, CreateContactOptions>(
            '/api/widget/createContact',
            contactData,
            contactDataSchema,
            instructions
        );
    }

    async searchContacts(instructions: SearchInstructions): Promise<SearchContactResponse> {
        return this.search<SearchContactResponse>(
            '/api/widget/getRecords',
            instructions,
        );
    }

    protected buildCreatePayload(data: ContactData, instructions: CreateContactOptions): CreateContactPayload {
        return {
            trackerrms: {
                createContact: { 
                    credentials: this.credentials,
                    instructions: {
                        createcompanyifnotexists: instructions.createcompanyifnotexists,
                        overwritecontact: instructions.overwritecontact,
                    },
                    contact: data, 
                },
            },
        };
    }

    protected buildSearchPayload(instructions: SearchInstructions): SearchContactPayload {
        return {
            trackerrms: {
                getRecords: {
                    credentials: this.credentials,
                    instructions
                }
            }
        };
    }

    protected buildFindPayload(id: number): never {
        throw new Error("Find operation not implemented for Contacts");
    }

    protected buildUpdatePayload(id: number): never {
        throw new Error("Update operation not implemented for Contacts");
    }
}