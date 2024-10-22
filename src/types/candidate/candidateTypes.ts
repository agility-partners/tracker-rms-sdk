import type { Credentials } from '../auth';
import type { ApiResponse } from '../response';
import type { CandidateData } from './candidateData';

// Export CandidateInstructions
export interface CandidateInstructions {
  overwriteresource?: boolean;
  assigntoopportunity?: number;
  assigntolist?: string;
  shortlistedby?: string;
}


// Payload structure for creating a candidate
export type CreateCandidatePayload = {
  trackerrms: {
    createResource: {
      credentials: Credentials;
      instructions: CandidateInstructions;
      resource: CandidateData;
    };
  };
};

// Response structure for creating a candidate
export interface CreateCandidateResponse extends ApiResponse {
  recordId: number;
  recordName: string;
}


// Response structure for getting a candidate
export interface GetCandidateResponse extends ApiResponse<CandidateData> {}

// Response structure for listing candidates
export interface ListCandidatesResponse extends ApiResponse<{
  resources: CandidateData[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}> {}

// Enum for assign to list options
export enum AssignToList {
  Short = "short",
  Long = "long",
}

// Enum for shortlisted by options
export enum ShortlistedBy {
  User = "user",
  Resource = "resource",
}

// Note: Skills options are numeric IDs, so we don't need an enum for them

// Note: Custom Fields options are also numeric IDs with string values, so we don't need an enum for them

// Note: Status options are strings matching the Candidate Status names in Tracker, so we don't need an enum for them