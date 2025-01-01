import type { CustomField } from "../candidate";
import type { CustomFieldList, Department, LeadSource, LeadStatus, NamingConventions, OpportunityStatus, OpportunityWorkType, ProjectStatus, ResourceSource, ResourceStatus, SettingsData, TaskType, TicketType, User, UserTeam } from "./models";

export type SettingsSchema = SettingsData;

export interface SettingsDataResponse {
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