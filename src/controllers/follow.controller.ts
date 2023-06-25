import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const followUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const unFollowUser = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);
