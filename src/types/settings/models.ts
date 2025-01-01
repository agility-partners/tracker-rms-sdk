export interface NamingConventions {
    client: string;
    contact: string;
    lead: string;
    opportunity: string;
    project: string;
    resource: string;
    ticket: string;
    resume: string;
    opportunities: string;
    leads: string;
    tickets: string;
    projects: string;
}

export interface Status {
    Id: number;
    Name: string;
}

export interface LeadStatus extends Status {}
export interface LeadSource extends Status {}
export interface OpportunityStatus extends Status {}
export interface OpportunityWorkType extends Status {}
export interface ProjectStatus extends Status {}
export interface ResourceStatus extends Status {}
export interface ResourceSource extends Status {}
export interface Department extends Status {}
export interface TicketType extends Status {}
export interface UserTeam extends Status {}
export interface TaskType extends Status {}

export interface CustomField {
    Association: string;
    Id: number;
    Name: string;
    Type: string;
    ListId: number;
}

export interface CustomFieldListItem {
    Id: number;
    Name: string;
}

export interface CustomFieldList {
    Id: number;
    Name: string;
    Items: CustomFieldListItem[];
}

export interface User {
    UserId: number;
    Username: string;
    Email: string;
    LastLogon: string | null;
    Active: string;
}

export interface SettingsData {
    status: number;
    message: string;
    count: number;
    accessRights: string;
    namingConventions: NamingConventions;
    leadStatuses: LeadStatus[];
    leadSources: LeadSource[];
    opportunityStatuses: OpportunityStatus[];
    opportunityWorkTypes: OpportunityWorkType[];
    projectStatuses: ProjectStatus[];
    resourceStatuses: ResourceStatus[];
    resourceSources: ResourceSource[];
    departments: Department[];
    ticketTypes: TicketType[];
    userTeams: UserTeam[];
    taskTypes: TaskType[];
    skillCategories: any[];
    skillAreas: any[];
    skills: any[];
    skillLists: any[];
    customFields: CustomField[];
    customFieldLists: CustomFieldList[];
    users: User[];
}

export interface SettingsSearchResult {
    id: number;
    text: string;
}