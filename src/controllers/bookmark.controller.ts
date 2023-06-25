import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const createBookmark = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const deleteBookmark = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);
