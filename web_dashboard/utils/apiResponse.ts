import { NextApiResponse } from 'next';
import { ApiResponse } from '@/types/agent';

export const sendSuccess = <T>(
  res: NextApiResponse<ApiResponse<T>>,
  data: T,
  statusCode: number = 200
) => {
  return res.status(statusCode).json({
    data,
    timestamp: new Date().toISOString(),
  });
};

export const sendError = (
  res: NextApiResponse<ApiResponse<null>>,
  status: number,
  message: string,
  code?: string,
  details?: any
) => {
  const error = {
    status,
    message,
    code,
    details,
  };

  return res.status(status).json({
    error,
    timestamp: new Date().toISOString(),
  });
};

export const sendValidationError = (
  res: NextApiResponse<ApiResponse<null>>,
  errors: { field: string; message: string }[]
) => {
  return sendError(
    res,
    400,
    'Validation failed',
    'VALIDATION_ERROR',
    { errors }
  );
};
