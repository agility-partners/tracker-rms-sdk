export interface ApiResponse<T = undefined> {
  status: number;
  message: string;
  count: number;
  results?: T[];
}

export enum ResponseStatus {
  Success = 0,
  UserNotFound = 1,
  UserNotActive = 2,
  RecordFoundCannotOverwrite = 3,
  InvalidRequest = 99,
}