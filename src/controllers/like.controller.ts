import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const likePost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const unLikePost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);
