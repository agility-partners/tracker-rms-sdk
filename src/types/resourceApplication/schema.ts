import { z } from "zod";

export const resourceApplicationDataSchema = z.object({});
export type ResourceApplicationData = z.infer<typeof resourceApplicationDataSchema>;