export interface PlacementDetails {
    id: number;
    name: string;
    clientid: number;
    clientname: string;
    contactid: number;
    contactname: string;
    resourceid: number;
    resourcename: string;
    opportunityid: number;
    status: string;
    type: string;
    values: string;
    description: string;
    executivesummary: any[];
    nameinitials: string;
    subject: string;
    dateassigned: string;
    dateconfirmed: string;
    assignedbyuserid: number;
    startdate: string;
    enddate: string;
    starttime: string;
    endtime: string;
    payrate: number;
    chargerate: number;
    overtimepayrate: number;
    overtimechargerate: number;
    chargeperiod: string;
    currency: string;
    lastupdated: string;
    Owners: any[];
    PurchaseOrders: any[];
}

export interface PlacementSearchResult {
    id: number;
    name: string;
    company: string;
    status: string;
    dateopened: string;
    details: PlacementDetails;
    customfields: any[];
    text: string;
}