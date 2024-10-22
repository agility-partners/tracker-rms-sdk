import type { ApiResponse } from '../response';
import type { Credentials } from '../auth';
import type { LeadData } from './leadData';

export interface LeadInstructions {
  createpersonifnotexists?: boolean; // Should create person if not exists
  notifydepartment?: boolean;        // Should notify the department
}

export type CreateLeadPayload = {
  trackerrms: {
    createLead: {
      credentials: Credentials;
      instructions: LeadInstructions;
      lead: LeadData;
    };
  };
};

export interface CreateLeadResponse extends Omit<ApiResponse, 'results'> {
  recordId: number;
  recordName: string;
}

export interface GetLeadResponse extends ApiResponse<LeadData> {}

export interface ListLeadsResponse extends ApiResponse<{
  leads: LeadData[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}> {}
