/**
 * API Error Response (Problem+JSON format - RFC 7807)
 */
export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  errors?: Record<string, string[]>;
}

/**
 * Success Response wrapper
 */
export interface ApiResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Error Response wrapper
 */
export interface ApiErrorResponse {
  success: false;
  error: ProblemDetails;
}
