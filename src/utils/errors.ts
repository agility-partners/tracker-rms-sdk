import { ZodError } from 'zod';
import axios from 'axios';

export class ApiError extends Error {
    constructor(message: string, public data: any) {
        super(message);
        this.name = 'ApiError';
    }
}

/**
 * Formats the Zod validation error into a more readable message.
 * @param error The Zod validation error object.
 */
export function formatValidationError(error: ZodError): string {
  return error.issues
    .map((issue) => `${issue.path.join('.')} - ${issue.message}`)
    .join(', ');
}

/**
 * Handles errors, distinguishing between network, API, validation, and unexpected errors.
 * @param error The error thrown during the API request.
 * @param operation A string describing the operation being performed (e.g., 'creating contact', 'fetching job')
 */
export function handleError(error: unknown, operation: string): never {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      throw new Error(`Network error occurred while ${operation}. Please check your connection and try again.`);
    }
    throw new ApiError(`API error occurred while ${operation}`, error.response.data);
  }

  if (error instanceof ZodError) {
    const formattedError = formatValidationError(error);
    throw new Error(`Validation error while ${operation}: ${formattedError}`);
  }

  if (error instanceof ApiError) {
    throw error; // Re-throw ApiErrors as they are already formatted
  }

  if (error instanceof Error) {
    throw new Error(`Error ${operation}: ${error.message}`);
  }

  throw new Error(`An unexpected error occurred while ${operation}.`);
}