import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const createRetweet = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const deleteRetweet = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);
