interface Owner {
    OwnerId: number;
    OwnerName: string;
    OwnerPercent: number;
    OwnerRole: string;
}

export interface JobDetails {
    id: number;
    name: string;
    clientid: number;
    clientname: string;
    contactid: number;
    contactname: string;
    status: string;
    type: string;
    values: string;
    shortlisted: string;
    description: string;
    executivesummary: any[];
    nameinitials: string;
    subject: string;
    winstrategy: string;
    Owners: Owner[];
}

export interface JobSearchResult {
    id: number;
    name: string;
    company: string;
    status: string;
    dateopened: string;
    details: JobDetails;
    customfields: any[];
    text: string;
}