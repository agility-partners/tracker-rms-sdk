export interface ContactDetails {
    firstname: string;
    lastname: string;
    preferredname: string;
    jobtitle: string;
    companyname: string;
    address1: string;
    address2: string;
    town: string;
    county: string;
    postcode: string;
    country: string;
    email: string;
    businesstelephone: string;
    hometelephone: string;
    mobiletelephone: string;
    linkedin: string;
    nameinitials: string;
    lastContacted: string;
    emailMarketing: string;
    telephoneMarketing: string;
    textMarketing: string;
    marketing: string;
    contactType: string;
    companyId: number;
}

export interface ContactSearchResult {
    id: number;
    name: string;
    company: string;
    status: string;
    dateopened: string;
    details: ContactDetails;
    customfields: any[];
    text: string;
}