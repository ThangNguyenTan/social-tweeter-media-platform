import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { PostModel } from '../model/post.model';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { IGetUserAuthInfoRequest } from '../types';

export const getPosts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const posts = await PostModel.find()
      .populate('user')
      .populate('bookmarks')
      .populate('likes');

    res.status(StatusCodes.OK).json({
      statusMessage: ReasonPhrases.OK,
      posts,
    });
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
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { content, imageURL, publicationType } = req.body;
    const { userId } = req.currentUser;
    let post = await new PostModel({
      content,
      imageURL,
      publicationType,
      user: userId,
    }).save();
    post = await PostModel.findById(post._id).populate('user');

    res.status(StatusCodes.OK).json({
      statusMessage: ReasonPhrases.OK,
      message: 'The post has been created',
      post,
    });
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
