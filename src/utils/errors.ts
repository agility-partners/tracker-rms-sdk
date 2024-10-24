import { ZodError } from 'zod';
import axios, { AxiosError } from 'axios';

export class ApiError extends Error {
    constructor(
        message: string, 
        public data: any,
        public statusCode?: number
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export class ValidationError extends Error {
    constructor(
        message: string,
        public issues: string[]
    ) {
        super(message);
        this.name = 'ValidationError';
    }
}

/**
 * Formats the Zod validation error into a more readable message and array of issues.
 */
export function formatValidationError(error: ZodError): ValidationError {
    const issues = error.issues.map(
        (issue) => `${issue.path.join('.')} - ${issue.message}`
    );
    
    return new ValidationError(
        'Validation failed',
        issues
    );
}

/**
 * Handles API errors with specific error types and messages
 */
export function handleError(error: unknown): never {
    // Network or Axios errors
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        
        if (!axiosError.response) {
            throw new ApiError(
                'Network error occurred. Please check your connection and try again.',
                null,
                0
            );
        }

        // Handle different HTTP status codes
        const statusCode = axiosError.response.status;
        const responseData = axiosError.response.data;

        switch (statusCode) {
            case 400:
                throw new ApiError('Invalid request', responseData, statusCode);
            case 401:
                throw new ApiError('Authentication failed', responseData, statusCode);
            case 403:
                throw new ApiError('Access denied', responseData, statusCode);
            case 404:
                throw new ApiError('Resource not found', responseData, statusCode);
            case 429:
                throw new ApiError('Too many requests', responseData, statusCode);
            case 500:
                throw new ApiError('Server error occurred', responseData, statusCode);
            default:
                throw new ApiError(
                    `API error occurred (${statusCode})`,
                    responseData,
                    statusCode
                );
        }
    }

    // Validation errors
    if (error instanceof ZodError) {
        throw formatValidationError(error);
    }

    // Already formatted API errors
    if (error instanceof ApiError) {
        throw error;
    }

    // Standard errors
    if (error instanceof Error) {
        throw new ApiError(error.message, null);
    }

    // Unknown errors
    throw new ApiError('An unexpected error occurred', null);
}

// Type guard for checking API errors
export function isApiError(error: unknown): error is ApiError {
    return error instanceof ApiError;
}

// Type guard for checking validation errors
export function isValidationError(error: unknown): error is ValidationError {
    return error instanceof ValidationError;
}

// Helper for error handling in try-catch blocks
export function handleErrorWithFallback<T>(
    error: unknown,
    fallback: T,
    logger?: (error: unknown) => void
): T {
    if (logger) {
        logger(error);
    }
    if (process.env.NODE_ENV === 'development') {
        console.error(error);
    }
    return fallback;
}