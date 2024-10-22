import type { ApiResponse } from '../response/responses';
import type { Credentials } from '../auth/credentials';
import type { ActivityData } from './activityData';

export interface ActivityInstructions {
    linkToRecord?: boolean;
    overwriteActivity?: boolean;
}

export type CreateActivityPayload = {
    trackerrms: {
        createActivity: {
            credentials: Credentials;
            instructions: ActivityInstructions;
            activity: ActivityData;
        };
    };
};

export interface CreateActivityResponse extends ApiResponse {
    recordId: number;
    recordName: string;
}

export interface GetActivityResponse extends ApiResponse<ActivityData[]> {}

export interface ListActivitiesResponse extends ApiResponse<{
    activities: ActivityData[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
}> {}

export interface GetActivityInstructions {
    recordtype: 'N';
    recordid: number;
}

export type GetActivityPayload = {
    trackerrms: {
        getIndividualRecord: {
            credentials: Credentials;
            instructions: GetActivityInstructions;
        };
    };
};