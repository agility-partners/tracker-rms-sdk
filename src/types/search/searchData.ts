import { z } from 'zod';

export const searchInstructionsSchema = z.object({
    recordtype: z.string().optional(),
    recordid: z.number().optional(),
    state: z.string().optional(),
    searchtext: z.string().optional(),
    onlymyrecords: z.boolean().optional(),
    numrecords: z.number().optional(),
    pagenum: z.number().optional(),
    sortfield: z.string().optional(),
    sortdir: z.enum(['asc', 'desc']).optional(),
    updatedbefore: z.string().optional(),
    updatedafter: z.string().optional(),
    includecustomfields: z.boolean().optional()
});

export type SearchInstructions = z.infer<typeof searchInstructionsSchema>;

// Add test console.log
console.log('searchData.ts - schema available:', searchInstructionsSchema);