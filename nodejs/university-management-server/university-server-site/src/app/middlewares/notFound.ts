import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    success: false,
    message: 'The Requested API is not available',
    error: '',
  });
};

export default notFound;
