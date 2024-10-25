export interface ActivityDetails {
    clientid: number;
    clientname: string;
    contactid: number;
    contactname: string;
    leadid: number;
    leadname: string;
    opportunityid: number;
    opportunityname: string;
    resourceid: number;
    resourcename: string;
    activityid: number;
    activityTypeId: number;
    ActivityTypeName: string;
    activityStatusId: number;
    activitystatusname: string;
    subject: string;
    datedue: string;
    timedue: string;
    lastupdateddatetime: string;
    startdate: string;
    starttime: string;
    enddate: string;
    endtime: string;
    userid: number;
    username: string;
    userjobtitle: string;
    useremail: string;
    priority: string;
    contacttype: string;
    interviewcount: number;
    cvsentcount: number;
    submittalType: string;
    opportunityresourceid: number;
}

export interface ActivitySearchResult {
    id: number;
    name: string;
    company: string;
    status: string;
    dateopened: string;
    details: ActivityDetails;
    customfields: Array<{
        id: number;
        value: string;
    }>;
    text: string;
}