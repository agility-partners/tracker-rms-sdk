// Base API response type with proper generic handling
export interface ApiResponse<TData> {
  status: number;
  message: string;
  count: number;
  results: TData | TData[]; 
}

export enum ResponseStatus {
  Success = 0,
  UserNotFound = 1,
  UserNotActive = 2,
  RecordFoundCannotOverwrite = 3,
  InvalidRequest = 99,
}

