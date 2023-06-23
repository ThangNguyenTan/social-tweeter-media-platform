import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

export const getPosts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const getPost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const createPost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const updatePost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const deletePost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);
