export interface CandidateDetails {
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
    otheremail: string;
    worktelephone: string;
    hometelephone: string;
    mobiletelephone: string;
    linkedin: string;
    nissnumber: string;
    payrollnumber: string;
    department: string;
    source: string;
    territory: string;
    owner: string;
    nameinitials: string;
    workavailable: string;
    availablefromdate: string;
    availability: string;
    lastContacted: string | null;
}

export interface CustomField {
    id: number;
    name: string;
    value: string;
}

export interface CandidateSearchResult {
    id: number;
    name: string;
    company: string;
    status: string;
    dateopened: string;
    details: CandidateDetails;
    customfields: CustomField[];
    text: string;
}