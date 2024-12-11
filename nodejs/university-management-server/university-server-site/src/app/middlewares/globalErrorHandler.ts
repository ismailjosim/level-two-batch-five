import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

const globalErrorHandler: ErrorRequestHandler = (
  error: unknown,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  if (error instanceof Error) {
    res.status(500).json({
      success: false,
      message: error.message || 'There was an error creating the student',
      error: {
        name: error.name,
        message: error.message,
      },
    });
  } else {
    res.status(500).json({
      success: false,
      message: 'An unexpected error occurred',
      error,
    });
  }
};

export default globalErrorHandler;
