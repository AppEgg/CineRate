import { Response } from 'express';
import { ApiResponse, ProblemDetails } from '../types/api.types';

/**
 * Send success response
 */
export const sendSuccess = <T>(res: Response, data: T, message?: string, statusCode = 200) => {
  const response: ApiResponse<T> = {
    success: true,
    data,
    ...(message && { message }),
  };
  return res.status(statusCode).json(response);
};

/**
 * Send created response (201)
 */
export const sendCreated = <T>(res: Response, data: T, message?: string) => {
  return sendSuccess(res, data, message, 201);
};

/**
 * Send no content response (204)
 */
export const sendNoContent = (res: Response) => {
  return res.status(204).send();
};

/**
 * Send error response
 */
export const sendError = (res: Response, error: ProblemDetails) => {
  return res.status(error.status).json({
    success: false,
    error,
  });
};
