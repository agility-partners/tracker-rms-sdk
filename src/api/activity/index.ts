import { BaseApi } from '../base';
import { 
    type CreateActivityResponse, 
    type CreateActivityPayload, 
    type ActivityInstructions,
    type GetActivityPayload,
} from '../../types/activity/activityTypes';
import { activityDataSchema, type ActivityData } from '../../types/activity/activityData';

export class Activities extends BaseApi {

    async createActivity(activityData: ActivityData, instructions: ActivityInstructions = {}): Promise<CreateActivityResponse> {
        return this.create<CreateActivityResponse, ActivityData, ActivityInstructions>(
            '/api/widget/createActivity',
            activityData,
            activityDataSchema,
            'creating activity',
            instructions
        );
    }

    protected buildCreatePayload(activityData: ActivityData, instructions: ActivityInstructions = {}): CreateActivityPayload {
        return {
            trackerrms: {
                createActivity: {
                    credentials: this.credentials,
                    instructions: {
                        linkToRecord: instructions.linkToRecord ?? false,
                        overwriteActivity: instructions.overwriteActivity ?? false,
                    },
                    activity: activityData,
                },
            },
        };
    }

    protected buildFindPayload(id: number): GetActivityPayload {
        return {
            trackerrms: {
                getIndividualRecord: {
                    credentials: this.credentials,
                    instructions: {
                        recordtype: 'N',
                        recordid: id
                    }
                }
            }
        };
    }

    protected buildUpdatePayload(id: number, updates: any) {
        throw new Error('Method not implemented.');
    }
}