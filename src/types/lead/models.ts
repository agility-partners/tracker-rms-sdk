export interface LeadDetails {
    id: number;
    subject: string;
    source: string;
    description: string;
    executivesummary: any[];
    nameinitials: string;
    status: string;
    clientid: number;
    clientname: string;
    name: string;
}

export interface LeadSearchResult {
    id: number;
    name: string;
    company: string;
    status: string;
    dateopened: string;
    details: LeadDetails;
    customfields: any[]; 
    text: string;
}