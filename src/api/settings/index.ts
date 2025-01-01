import { ResponseStatus } from '../../types';
import type { SettingsDataResponse } from '../../types/settings/schema';
import { ApiError } from '../../utils/errors';
import { BaseApi } from '../base';

export class Settings extends BaseApi {
    protected buildCreatePayload(data: any, instructions?: any) {
        throw new Error('Method not implemented.');
    }
    protected buildFindPayload(id: number) {
        throw new Error('Method not implemented.');
    }
    protected buildUpdatePayload(id: number, updates: any) {
        throw new Error('Method not implemented.');
    }
    protected buildSearchPayload(instructions: any) {
        throw new Error('Method not implemented.');
    }
    protected get entityType(): string {
        return 'S';
    }

    async getSettingsData(): Promise<SettingsDataResponse> {
        const payload = {
            trackerrms: {
                checkPerson: {
                    credentials: this.credentials,
                },
            },
        };
        const config = this.getRequestConfig(true); // This endpoint requires basic auth
        const response = await this.client.post<SettingsDataResponse>('/api/widget/getSettingsData', payload, config);
        if (response.data.status !== ResponseStatus.Success) {
            throw new ApiError('Failed to get settings data', response.data);
        }
        return response.data;
    }
}