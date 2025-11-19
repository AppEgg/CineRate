import { ProblemDetails } from '../types/api.types';

/**
 * Base Application Error
 */
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly type: string;
  public readonly errors?: Record<string, string[]>;
  public correlationId?: string; // AppError a correlationId elave edirik

  constructor(
    message: string,
    statusCode: number = 500,
    type: string = 'about:blank',
    errors?: Record<string, string[]>
  ) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;
    this.errors = errors;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }

  // CORRELATION ID UCUN BURDA YENI METHOD ELAVE ETMELIYIK

  setCorrelationId(id: string) : this {
    this.correlationId =id 
    return this
  }



  toProblemDetails(instance?: string): ProblemDetails {
    return {
      type: this.type,
      title: this.name,
      status: this.statusCode,
      detail: this.message,
      instance,
      errors: this.errors,
      ...(this.correlationId && {correlationId : this.correlationId})
    };
  }
}

/**
 * 400 Bad Request
 */
export class BadRequestError extends AppError {
  constructor(message: string = 'Bad Request', errors?: Record<string, string[]>) {
    super(message, 400, '/errors/bad-request', errors);
  }
}

/**
 * 404 Not Found
 */
export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource') {
    super(`${resource} not found`, 404, '/errors/not-found');
  }
}

/**
 * 409 Conflict
 */
export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409, '/errors/conflict');
  }
}

/**
 * 422 Unprocessable Entity (Validation Error)
 */
export class ValidationError extends AppError {
  constructor(errors: Record<string, string[]>) {
    super('Validation failed', 422, '/errors/validation', errors);
  }
}

/**
 * 500 Internal Server Error
 */
export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error') {
    super(message, 500, '/errors/internal');
  }
}


// RateLimitError

export class RateLimitError extends AppError {
  constructor(message : string = 'Too many requests'){
    super(message ,429 , '/errors/rate-limit')
  }
}

// ForbiddenError

export class ForbiddenError extends AppError{
  constructor(message : string = 'Access denied '){
    super(message , 403 , '/errors/forbidden')
  }
}

// ServiceUnavailableError
export class ServiceUnavailableError extends AppError{
  constructor(message : string = 'Service down'){
    super(message , 503, '/errors/service-unavailable')
  }
}


