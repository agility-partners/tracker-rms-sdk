import { BaseApi } from '../base';
import type { SearchInstructions } from '../../types/search/searchData';
import { formatValidationError } from '../../utils/errors';
import { companyDataSchema, companyUpdateSchema, type CompanyData, type CompanyUpdateData, type CreateCompanyOptions, type CreateCompanyPayload, type CreateCompanyResponse, type SearchCompanyPayload, type SearchCompanyResponse, type UpdateCompanyPayload, type UpdateCompanyResponse } from '../../types/company';

export class Companies extends BaseApi {
    protected get entityType(): string {
        return 'C';
    }

    async createCompany(
        companyData: Partial<CompanyData> = {},
        instructions: CreateCompanyOptions = {
            createcompanyifnotexists: true
        }
    ): Promise<CreateCompanyResponse> {
        return this.create<CreateCompanyResponse, CompanyData, CreateCompanyOptions>(
            '/api/widget/createContact',
            companyData,
            companyDataSchema,
            instructions
        );
    }

    async searchCompanies(instructions: SearchInstructions): Promise<SearchCompanyResponse> {
        return this.search<SearchCompanyResponse>(
            '/api/widget/getRecords',
            instructions,
        );
    }

    async updateCompany(
        id: number,
        updates: Partial<CompanyUpdateData>
    ): Promise<UpdateCompanyResponse> {
        const parsedData = companyUpdateSchema.partial().safeParse(updates);
        if (!parsedData.success) {
            const formattedError = formatValidationError(parsedData.error);
            throw new Error(`Validation failed: ${formattedError}`);
        }

        const payload = this.buildUpdatePayload(id, parsedData.data);
        return this.update<UpdateCompanyResponse>('/api/widget/updateRecord', payload);
    }

    protected buildCreatePayload(data: CompanyData, instructions: CreateCompanyOptions): CreateCompanyPayload {
        return {
            trackerrms: {
                createContact: {
                    credentials: this.credentials,
                    instructions: {
                        createcompanyifnotexists: true,
                    },
                    contact: data,
                },
            },
        };
    }

    protected buildSearchPayload(instructions: SearchInstructions): SearchCompanyPayload {
        return {
            trackerrms: {
                getRecords: {
                    credentials: this.credentials,
                    instructions
                }
            }
        };
    }

    protected buildFindPayload(id: number): never {
        throw new Error("Find operation not implemented for Companies");
    }

    protected buildUpdatePayload(id: number, updates: Partial<CompanyUpdateData>): UpdateCompanyPayload {
        const updateFields = Object.entries(updates).map(([column, value]) => ({
            column,
            value: value?.toString() ?? ''
        }));

        return {
            trackerrms: {
                updateRecord: {
                    credentials: this.credentials,
                    instructions: {
                        recordtype: this.entityType,
                        recordid: id
                    },
                    updates: updateFields
                }
            }
        };
    }
}