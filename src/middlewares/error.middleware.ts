import { Request, Response, NextFunction } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
// Custom error handling middleware
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  // Handle other generic errors
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    statusMessage: ReasonPhrases.INTERNAL_SERVER_ERROR,
    message: 'Internal server error',
  });
};
