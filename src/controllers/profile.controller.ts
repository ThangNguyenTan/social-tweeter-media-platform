import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IGetUserAuthInfoRequest } from '../types';
import User from '../model/user.model';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export const getUserProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);

export const getMyProfile = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { userId } = req.currentUser;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      res.status(StatusCodes.NOT_FOUND).json({
        statusMessage: ReasonPhrases.NOT_FOUND,
        message: 'Your profile is nowhere to be found',
      });
      return;
    }

    res.status(StatusCodes.OK).json({
      statusMessage: ReasonPhrases.OK,
      message: 'This is your profile',
      user: existingUser,
    });

    return;
  },
);

export const updateMyProfile = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    res.json('TBD');
    return;
  },
);
