import { z } from 'zod';
import type { CreateResourceApplicationOptions, CreateResourceApplicationPayload, CreateResourceApplicationResponse } from '../../types/resourceApplication/api';
import { BaseApi } from '../base';

const emptySchema = z.object({});

export class ResourceApplications extends BaseApi {
   protected get entityType(): string {
       return 'RA';
   }

   async createResourceApplication(
       instructions: CreateResourceApplicationOptions
   ): Promise<CreateResourceApplicationResponse> {
       return this.create<CreateResourceApplicationResponse, {}, CreateResourceApplicationOptions>(
           '/api/widget/resourceApplication',
           {},                // empty data object since we only use instructions
           emptySchema,       // empty zod schema instead of null
           instructions,
           true
       );
   }

   protected buildCreatePayload(
       _data: never, 
       instructions: CreateResourceApplicationOptions
   ): CreateResourceApplicationPayload {
       return {
           trackerrms: {
               resourceApplication: {
                   credentials: this.credentials,
                   instructions
               }
           }
       };
   }

   protected buildSearchPayload(): never {
       throw new Error("Search operation not implemented for Resource Applications");
   }

   protected buildFindPayload(): never {
       throw new Error("Find operation not implemented for Resource Applications");
   }

   protected buildUpdatePayload(): never {
       throw new Error("Update operation not implemented for Resource Applications");
   }
}