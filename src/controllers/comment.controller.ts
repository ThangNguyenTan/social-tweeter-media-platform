import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import CommentModel, { CommentDocument } from '../model/comment.model';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { IGetUserAuthInfoRequest } from '../types';
import { PostModel } from '../model/post.model';

export const getCommentsByPostId = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { postId } = req.params;
    const comments = await CommentModel.find({
      post: postId,
    })
      .populate('user')
      .populate('post');

    res.status(StatusCodes.OK).json({
      statusMessage: ReasonPhrases.OK,
      comments,
    });
    return;
  },
);

export const getMyComments = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { userId } = req.currentUser;
    const comments = await CommentModel.find({
      user: userId,
    })
      .populate('user')
      .populate('post');

    res.status(StatusCodes.OK).json({
      statusMessage: ReasonPhrases.OK,
      comments,
    });
    return;
  },
);

export const createComment = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { postId, comment, imageURL } = req.body;
    const { userId } = req.currentUser;

    const existingPost = await PostModel.findById(postId);

    if (existingPost) {
      let newComment = await new CommentModel({
        user: userId,
        post: postId,
        comment,
        imageURL,
      }).save();
      const newCommentId = newComment._id;
      newComment = await CommentModel.findById(newCommentId)
        .populate('user')
        .populate('post');

      const existingPostComments = [...existingPost.comments, newCommentId];
      await PostModel.findByIdAndUpdate(postId, {
        comments: existingPostComments,
      });

      res.status(StatusCodes.CREATED).json({
        statusMessage: ReasonPhrases.CREATED,
        message: 'The comment has been created',
        comment: newComment,
      });
    }

    res.status(StatusCodes.NOT_FOUND).json({
      statusMessage: ReasonPhrases.NOT_FOUND,
      message: 'The post does not exist',
    });

    return;
  },
);

export const deleteComment = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { commentId } = req.params;
    const { userId } = req.currentUser;

    const existingComment = await CommentModel.findOneAndDelete({
      _id: commentId,
      user: userId,
    })
      .populate('user')
      .populate('post');

    if (existingComment) {
      const postId = existingComment.post;
      const existingPost = await PostModel.findById(postId);
      const existingPostComments = existingPost.comments.filter(
        (comment: CommentDocument) => comment._id != commentId,
      );
      await PostModel.findByIdAndUpdate(postId, {
        comments: existingPostComments,
      });

      res.status(StatusCodes.OK).json({
        statusMessage: ReasonPhrases.OK,
        message: 'The comment has been removed',
        comment: existingComment,
      });
      return;
    }

    res.status(StatusCodes.NOT_FOUND).json({
      statusMessage: ReasonPhrases.NOT_FOUND,
      message: 'The comment does not exist',
    });
    return;
  },
);
