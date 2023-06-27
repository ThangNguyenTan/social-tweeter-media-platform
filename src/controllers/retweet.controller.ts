import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IGetUserAuthInfoRequest } from '../types';
import RetweetModel, { RetweetDocument } from '../model/retweet.model';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { PostModel } from '../model/post.model';

export const getRetweets = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { userId } = req.currentUser;
    const retweets = await RetweetModel.find({
      user: userId,
    })
      .populate('user')
      .populate('post');

    res.status(StatusCodes.OK).json({
      statusMessage: ReasonPhrases.OK,
      retweets,
    });
    return;
  },
);

export const createRetweet = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { postId } = req.body;
    const { userId } = req.currentUser;

    const existingRetweet = await RetweetModel.findOne({
      user: userId,
      post: postId,
    })
      .populate('user')
      .populate('post');

    if (existingRetweet) {
      res.status(StatusCodes.CONFLICT).json({
        statusMessage: ReasonPhrases.CONFLICT,
        message: 'The retweet is already existed',
        retweet: existingRetweet,
      });
      return;
    }

    let newRetweet = await new RetweetModel({
      user: userId,
      post: postId,
    }).save();
    const newRetweetId = newRetweet._id;
    newRetweet = await RetweetModel.findById(newRetweetId)
      .populate('user')
      .populate('post');
    const existingPost = await PostModel.findById(postId);
    const existingPostRetweets = [...existingPost.retweets, newRetweetId];
    await PostModel.findByIdAndUpdate(postId, {
      retweets: existingPostRetweets,
    });

    res.status(StatusCodes.CREATED).json({
      statusMessage: ReasonPhrases.CREATED,
      message: 'The retweet has been created',
      retweet: newRetweet,
    });
    return;
  },
);

export const deleteRetweet = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { retweetId } = req.params;
    const { userId } = req.currentUser;

    const existingRetweet = await RetweetModel.findOneAndDelete({
      _id: retweetId,
      user: userId,
    })
      .populate('user')
      .populate('post');

    if (existingRetweet) {
      const postId = existingRetweet.post;
      const existingPost = await PostModel.findById(postId);
      const existingPostRetweets = existingPost.retweets.filter(
        (retweet: RetweetDocument) => retweet._id != retweetId,
      );
      await PostModel.findByIdAndUpdate(postId, {
        retweets: existingPostRetweets,
      });

      res.status(StatusCodes.OK).json({
        statusMessage: ReasonPhrases.OK,
        message: 'The retweet has been removed',
        retweet: existingRetweet,
      });
      return;
    }

    res.status(StatusCodes.NOT_FOUND).json({
      statusMessage: ReasonPhrases.NOT_FOUND,
      message: 'The retweet does not exist',
    });
    return;
  },
);
