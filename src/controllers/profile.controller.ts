import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const getMyProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const updateMyProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);
