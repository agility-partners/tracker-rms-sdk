import { BaseApi } from '../base';
import type { SearchInstructions } from '../../types/search/searchData';
import { 
    type CreateContactOptions,
    type CreateContactPayload,
    type CreateContactResponse,
    type SearchContactPayload,
    type SearchContactResponse,
    type UpdateContactPayload,
    type UpdateContactResponse,
    type ContactData,
    type ContactUpdateData,
    contactDataSchema,
    contactUpdateSchema,
} from '../../types/contact';
import { formatValidationError } from '../../utils/errors';

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

    async updateContact(
        id: number,
        updates: Partial<ContactUpdateData>
    ): Promise<UpdateContactResponse> {
        const parsedData = contactUpdateSchema.partial().safeParse(updates);
        if (!parsedData.success) {
            const formattedError = formatValidationError(parsedData.error);
            throw new Error(`Validation failed: ${formattedError}`);
        }

        const payload = this.buildUpdatePayload(id, parsedData.data);
        return this.update<UpdateContactResponse>('/api/widget/updateRecord', payload);
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

    protected buildUpdatePayload(id: number, updates: Partial<ContactUpdateData>): UpdateContactPayload {
        const updateFields = Object.entries(updates).map(([column, value]) => ({
            column,
            value: value?.toString() ?? ''
        }));

        return {
            trackerrms: {
                updateRecord: {
                    credentials: this.credentials,
                    instructions: {
                        recordtype: this.entityType,
                        recordid: id
                    },
                    updates: updateFields
                }
            }
        };
    }
}