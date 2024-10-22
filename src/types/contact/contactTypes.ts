import type { ApiResponse } from '../response/responses';
import type { Credentials } from '../auth/credentials';
import type { ContactData } from './contactData';

export interface ContactInstructions {
    createcompanyifnotexists?: boolean;
    overwritecontact?: boolean;
}

export type CreateContactPayload = {
    trackerrms: {
        createContact: {
            credentials: Credentials;
            instructions: ContactInstructions;
            contact: ContactData;
        };
    };
};

export interface CreateContactResponse extends ApiResponse {
    recordId: number;
    recordName: string;
}

export interface GetContactResponse extends ApiResponse<ContactData[]> {}


export interface ListContactsResponse extends ApiResponse<{
    contacts: ContactData[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}> {}

export interface GetContactInstructions {
    recordtype: 'N';
    recordid: number;
}

export type GetContactPayload = {
    trackerrms: {
        getIndividualRecord: {
            credentials: Credentials;
            instructions: GetContactInstructions;
        };
    };
};