import { NextApiRequest, NextApiResponse } from 'next';
import { ApiError, ApiResponse } from '@/types/agent';

type ValidationRule = {
  field: string;
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => { isValid: boolean; message: string };
};

export const validateRequest = (
  req: NextApiRequest,
  rules: ValidationRule[],
  res: NextApiResponse<ApiResponse<any>>
): boolean => {
  const errors: { field: string; message: string }[] = [];
  const data = req.method === 'GET' ? req.query : req.body;

  rules.forEach((rule) => {
    const value = data[rule.field];
    
    // Check if field is required
    if (rule.required && (value === undefined || value === null || value === '')) {
      errors.push({ field: rule.field, message: `${rule.field} is required` });
      return;
    }

    // Skip further checks if the field is not required and not provided
    if (value === undefined || value === null) return;

    // Check type
    if (rule.type) {
      let isValid = true;
      
      switch (rule.type) {
        case 'string':
          isValid = typeof value === 'string';
          break;
        case 'number':
          isValid = !isNaN(Number(value));
          break;
        case 'boolean':
          isValid = value === 'true' || value === 'false' || typeof value === 'boolean';
          break;
        case 'array':
          isValid = Array.isArray(value);
          break;
        case 'object':
          isValid = typeof value === 'object' && !Array.isArray(value);
          break;
      }

      if (!isValid) {
        errors.push({ field: rule.field, message: `${rule.field} must be of type ${rule.type}` });
        return;
      }
    }

    // Check min and max length for strings and arrays
    if ((rule.type === 'string' || rule.type === 'array') && typeof value === 'string') {
      if (rule.minLength !== undefined && value.length < rule.minLength) {
        errors.push({
          field: rule.field,
          message: `${rule.field} must be at least ${rule.minLength} characters long`,
        });
      }
      
      if (rule.maxLength !== undefined && value.length > rule.maxLength) {
        errors.push({
          field: rule.field,
          message: `${rule.field} must be at most ${rule.maxLength} characters long`,
        });
      }
    }

    // Check pattern for strings
    if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
      errors.push({
        field: rule.field,
        message: `${rule.field} does not match the required pattern`,
      });
    }

    // Run custom validator if provided
    if (rule.customValidator) {
      const customValidation = rule.customValidator(value);
      if (!customValidation.isValid) {
        errors.push({
          field: rule.field,
          message: customValidation.message || `Validation failed for ${rule.field}`,
        });
      }
    }
  });

  if (errors.length > 0) {
    const error: ApiError = {
      status: 400,
      message: 'Validation failed',
      code: 'VALIDATION_ERROR',
      details: { errors },
    };
    
    res.status(400).json({
      error,
      timestamp: new Date().toISOString(),
    });
    
    return false;
  }

  return true;
};

export const withErrorHandling = (
  handler: (req: NextApiRequest, res: NextApiResponse<ApiResponse<any>>) => Promise<void>,
  options?: { allowedMethods?: string[] }
) => {
  return async (req: NextApiRequest, res: NextApiResponse<ApiResponse<any>>) => {
    try {
      // Check allowed HTTP methods
      if (options?.allowedMethods && !options.allowedMethods.includes(req.method || '')) {
        const error: ApiError = {
          status: 405,
          message: `Method ${req.method} not allowed`,
          code: 'METHOD_NOT_ALLOWED',
        };
        
        res.setHeader('Allow', options.allowedMethods.join(', '));
        res.status(405).json({
          error,
          timestamp: new Date().toISOString(),
        });
        return;
      }

      await handler(req, res);
    } catch (error: any) {
      console.error('API Error:', error);
      
      const statusCode = error.statusCode || 500;
      const apiError: ApiError = {
        status: statusCode,
        message: error.message || 'Internal server error',
        code: error.code || 'INTERNAL_SERVER_ERROR',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      };
      
      res.status(statusCode).json({
        error: apiError,
        timestamp: new Date().toISOString(),
      });
    }
  };
};
