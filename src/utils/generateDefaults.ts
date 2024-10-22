import { z } from 'zod';

/**
 * Generates default values from a Zod schema.
 * Optional fields are initialized to appropriate defaults based on their types:
 * - Objects (like `customfields`) are initialized as empty objects.
 * - Strings are initialized as empty strings.
 * - Arrays are initialized as empty arrays.
 * - Numbers are initialized as 0.
 * @param schema The Zod schema to generate defaults from.
 * @returns An object containing the default values for the schema.
 */
export function generateDefaultsFromSchema<T>(schema: z.ZodObject<any>): T {
  const shape = schema.shape;
  const defaults: Record<string, any> = {};

  for (const key in shape) {
    let def = shape[key];

    // Handle ZodOptional or ZodDefault types
    if (def instanceof z.ZodOptional) {
      def = def._def.innerType; // Access the base type for ZodOptional
    } else if (def instanceof z.ZodDefault) {
      def = def._def.innerType; // Access the base type for ZodDefault
    }

    // Check for different types and assign appropriate default values
    if (def instanceof z.ZodObject) {
      defaults[key] = generateDefaultsFromSchema(def); // Recursively handle nested objects
    } else if (def instanceof z.ZodRecord) {
      defaults[key] = {}; // Default to an empty object for ZodRecord
    } else if (def instanceof z.ZodArray) {
      defaults[key] = []; // Default to an empty array for arrays
    } else if (def instanceof z.ZodNumber) {
      defaults[key] = 0; // Default to 0 for numbers
    } else if (def instanceof z.ZodBoolean) {
      defaults[key] = false; // Default to false for booleans
    } else {
      defaults[key] = ''; // Default to empty string for other types (e.g., strings)
    }
  }

  return defaults as T;
}
