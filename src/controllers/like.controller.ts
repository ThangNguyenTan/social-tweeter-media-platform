import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IGetUserAuthInfoRequest } from '../types';
import LikeModel, { LikeDocument } from '../model/like.model';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { PostModel } from '../model/post.model';

export const getLikes = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { userId } = req.currentUser;
    const likes = await LikeModel.find({
      user: userId,
    })
      .populate('user')
      .populate('post');

    res.status(StatusCodes.OK).json({
      statusMessage: ReasonPhrases.OK,
      likes,
    });
    return;
  },
);

export const likePost = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { postId } = req.body;
    const { userId } = req.currentUser;

    const existingLike = await LikeModel.findOne({
      user: userId,
      post: postId,
    })
      .populate('user')
      .populate('post');

    if (existingLike) {
      res.status(StatusCodes.CONFLICT).json({
        statusMessage: ReasonPhrases.CONFLICT,
        message: 'The like is already existed',
        like: existingLike,
      });
      return;
    }

    let newLike = await new LikeModel({
      user: userId,
      post: postId,
    }).save();
    const newLikeId = newLike._id;
    newLike = await LikeModel.findById(newLikeId)
      .populate('user')
      .populate('post');
    const existingPost = await PostModel.findById(postId);
    const existingPostLikes = [...existingPost.likes, newLikeId];
    await PostModel.findByIdAndUpdate(postId, {
      likes: existingPostLikes,
    });

    res.status(StatusCodes.CREATED).json({
      statusMessage: ReasonPhrases.CREATED,
      message: 'The like has been created',
      like: newLike,
    });
    return;
  },
);

export const unLikePost = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { likeId } = req.params;
    const { userId } = req.currentUser;

    const existingLike = await LikeModel.findOneAndDelete({
      _id: likeId,
      user: userId,
    })
      .populate('user')
      .populate('post');

    if (existingLike) {
      const postId = existingLike.post;
      const existingPost = await PostModel.findById(postId);
      const existingPostLikes = existingPost.likes.filter(
        (like: LikeDocument) => like._id != likeId,
      );
      await PostModel.findByIdAndUpdate(postId, {
        likes: existingPostLikes,
      });

      res.status(StatusCodes.OK).json({
        statusMessage: ReasonPhrases.OK,
        message: 'The like has been removed',
        like: existingLike,
      });
      return;
    }

    res.status(StatusCodes.NOT_FOUND).json({
      statusMessage: ReasonPhrases.NOT_FOUND,
      message: 'The like does not exist',
    });
    return;
  },
);
