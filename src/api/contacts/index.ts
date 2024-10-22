import { BaseApi } from '../base';
import { 
    type CreateContactResponse, 
    type CreateContactPayload, 
    type ContactInstructions,
    type GetContactPayload,
} from '../../types/contact/contactTypes';
import {
    contactCreateDataSchema,
    type ContactCreateData,
} from '../../types/contact/contactData';

export class Contacts extends BaseApi {

    async createContact(contactData: ContactCreateData,instructions: ContactInstructions = {}): Promise<CreateContactResponse> {
        return this.create<CreateContactResponse, ContactCreateData, ContactInstructions>(
            '/api/widget/createContact',
            contactData,
            contactCreateDataSchema,
            'creating contact',
            instructions
        );
    }


    protected buildCreatePayload(contactData: ContactCreateData, instructions: ContactInstructions = {}): CreateContactPayload {
        return {
            trackerrms: {
                createContact: {
                    credentials: this.credentials,
                    instructions: {
                        createcompanyifnotexists: instructions.createcompanyifnotexists ?? false,
                        overwritecontact: instructions.overwritecontact ?? false,
                    },
                    contact: contactData,
                },
            },
        };
    }

    protected buildFindPayload(id: number): GetContactPayload {
        return {
            trackerrms: {
                getIndividualRecord: {
                    credentials: this.credentials,
                    instructions: {
                        recordtype: 'N',
                        recordid: id
                    }
                }
            }
        };
    }

    protected buildUpdatePayload(id: number, updates: any) {
        throw new Error('Method not implemented.');
    }
}