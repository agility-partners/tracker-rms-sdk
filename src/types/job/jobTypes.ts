import type { ApiResponse } from '../response';
import type { Credentials } from '../auth';
import type { JobData, JobDetails } from './jobData';

export interface JobInstructions {
  createpersonifnotexists?: boolean;
}

export type CreateJobPayload = {
  trackerrms: {
    createOpportunity: {
      credentials: Credentials;
      instructions: JobInstructions;
      opportunity: JobData;
    };
  };
};

export interface CreateJobResponse extends Omit<ApiResponse, 'results'> {
  recordId: number;
  recordName: string;
}

export interface GetJobResponse extends ApiResponse<JobDetails> {}

export interface GetJobInstructions {
  recordtype: 'O';
  recordid: number;
}

export type GetJobPayload = {
  trackerrms: {
    getIndividualRecord: {
      credentials: Credentials;
      instructions: GetJobInstructions;
    };
  };
};

export type UpdateJobPayload = {
  trackerrms: {
      updateRecord: {
          credentials: Credentials;
          instructions: {
              recordtype: 'O';
              recordid: number;
          };
          updates: Array<{
              column: string;
              value: string;
          }>;
      };
  };
};