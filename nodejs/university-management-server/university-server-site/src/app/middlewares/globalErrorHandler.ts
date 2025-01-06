import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

const globalErrorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const statusCode: number =
    (error as { statusCode?: number }).statusCode || 500;
  if (error instanceof ZodError) {
    // Handle Zod validation errors
    const formattedErrors = error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
    res.status(statusCode).json({
      success: false,
      message: 'Validation failed',
      error: formattedErrors,
    });
  } else if (error instanceof Error) {
    // General application errors

    res.status(statusCode).json({
      success: false,
      message: error.message || 'There was an error processing your request',
      error: {
        name: error.name,
        message: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
    });
  } else {
    res.status(statusCode).json({
      success: false,
      message: 'An unexpected error occurred',
      error,
    });
  }
  return;
};

export default globalErrorHandler;
