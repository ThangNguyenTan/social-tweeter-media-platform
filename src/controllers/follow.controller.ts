import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IGetUserAuthInfoRequest } from '../types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import FollowModel, { FollowDocument } from '../model/follow.model';
import UserModel from '../model/user.model';

export const followUser = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { userId } = req.currentUser;
    const { followedUserId } = req.body;

    const existingFollowing = await FollowModel.findOne({
      follower: userId,
      followed: followedUserId,
    });

    if (existingFollowing) {
      res.status(StatusCodes.CONFLICT).json({
        statusMessage: ReasonPhrases.CONFLICT,
        message: 'This user has already been followed',
        follow: existingFollowing,
      });
      return;
    }

    let newFollow = await new FollowModel({
      follower: userId,
      followed: followedUserId,
    }).save();
    const newFollowId = newFollow._id;
    newFollow = await FollowModel.findById(newFollowId);
    const existingFollower = await UserModel.findById(userId);
    const existingFollowedUser = await UserModel.findById(followedUserId);

    if (!existingFollower || !existingFollowedUser) {
      res.status(StatusCodes.NOT_FOUND).json({
        statusMessage: ReasonPhrases.NOT_FOUND,
        message: 'The user does not exist',
      });
      return;
    }

    const existingFollowedUserFollowers = [
      ...existingFollowedUser.followers,
      newFollowId,
    ];
    await UserModel.findByIdAndUpdate(followedUserId, {
      followers: existingFollowedUserFollowers,
    });

    const existingFollowerUserFollowings = [
      ...existingFollowedUser.following,
      newFollowId,
    ];
    await UserModel.findByIdAndUpdate(userId, {
      following: existingFollowerUserFollowings,
    });

    res.status(StatusCodes.CREATED).json({
      statusMessage: ReasonPhrases.CREATED,
      message: 'You have successfully followed this user',
      follow: newFollow,
    });
    return;
  },
);

export const unFollowUser = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { userId } = req.currentUser;
    const { followedUserId } = req.params;

    const existingFollowing = await FollowModel.findOne({
      follower: userId,
      followed: followedUserId,
    });

    if (!existingFollowing) {
      res.status(StatusCodes.NOT_FOUND).json({
        statusMessage: ReasonPhrases.NOT_FOUND,
        message: 'This user has never been followed',
        follow: existingFollowing,
      });
      return;
    }

    const deletedFollow = await FollowModel.findOneAndDelete({
      follower: userId,
      followed: followedUserId,
    });
    const deletedFollowId = deletedFollow._id;
    const existingFollower = await UserModel.findById(userId);
    const existingFollowedUser = await UserModel.findById(followedUserId);

    if (!existingFollower || !existingFollowedUser) {
      res.status(StatusCodes.NOT_FOUND).json({
        statusMessage: ReasonPhrases.NOT_FOUND,
        message: 'The user does not exist',
      });
      return;
    }

    const existingFollowedUserFollowers = existingFollower.followers.filter(
      (follower: FollowDocument) => follower._id != deletedFollowId,
    );
    await UserModel.findByIdAndUpdate(followedUserId, {
      followers: existingFollowedUserFollowers,
    });

    const existingFollowerUserFollowings =
      existingFollowedUser.following.filter(
        (followingUser: FollowDocument) => followingUser._id != deletedFollowId,
      );
    await UserModel.findByIdAndUpdate(userId, {
      following: existingFollowerUserFollowings,
    });

    res.status(StatusCodes.OK).json({
      statusMessage: ReasonPhrases.OK,
      message: 'You have successfully un-followed this user',
      follow: deletedFollow,
    });
    return;
  },
);
