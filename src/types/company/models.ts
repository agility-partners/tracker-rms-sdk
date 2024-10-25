export interface CompanyDetails {
    address1: string;
    address2: string;
    town: string;
    county: string;
    postcode: string;
    country: string;
    email: string;
    website: string;
    telephone: string;
    internalreference: string;
    department: string;
    vertical: string;
    type: string;
    source: string;
    rank: string;
    territory: string;
    owner: string;
    nameinitials: string;
    clienttypes: string;
}

export interface CompanySearchResult {
    id: number;
    name: string;
    company: string;
    status: string;
    dateopened: string;
    details: CompanyDetails;
    customfields: any[];
    text: string;
}