import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import BookmarkModel, { BookmarkDocument } from '../model/bookmark.model';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { IGetUserAuthInfoRequest } from '../types';
import { PostModel } from '../model/post.model';

export const getBookmarks = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { userId } = req.currentUser;
    const bookmarks = await BookmarkModel.find({
      user: userId,
    })
      .populate('user')
      .populate('post');

    res.status(StatusCodes.OK).json({
      statusMessage: ReasonPhrases.OK,
      bookmarks,
    });
    return;
  },
);

export const createBookmark = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { postId } = req.body;
    const { userId } = req.currentUser;

    const existingBookmark = await BookmarkModel.findOne({
      user: userId,
      post: postId,
    })
      .populate('user')
      .populate('post');

    if (existingBookmark) {
      res.status(StatusCodes.CONFLICT).json({
        statusMessage: ReasonPhrases.CONFLICT,
        message: 'The bookmark is already existed',
        bookmark: existingBookmark,
      });
      return;
    }

    let newBookmark = await new BookmarkModel({
      user: userId,
      post: postId,
    }).save();
    const newBookmarkId = newBookmark._id;
    newBookmark = await BookmarkModel.findById(newBookmarkId)
      .populate('user')
      .populate('post');
    const existingPost = await PostModel.findById(postId);
    const existingPostBookmarks = [...existingPost.bookmarks, newBookmarkId];
    await PostModel.findByIdAndUpdate(postId, {
      bookmarks: existingPostBookmarks,
    });

    res.status(StatusCodes.CREATED).json({
      statusMessage: ReasonPhrases.CREATED,
      message: 'The bookmark has been created',
      bookmark: newBookmark,
    });
    return;
  },
);

export const deleteBookmark = asyncHandler(
  async (req: IGetUserAuthInfoRequest, res: Response): Promise<void> => {
    const { bookmarkId } = req.params;
    const { userId } = req.currentUser;

    const existingBookmark = await BookmarkModel.findOneAndDelete({
      _id: bookmarkId,
      user: userId,
    })
      .populate('user')
      .populate('post');

    if (existingBookmark) {
      const postId = existingBookmark.post;
      const existingPost = await PostModel.findById(postId);
      const existingPostBookmarks = existingPost.bookmarks.filter(
        (bookmark: BookmarkDocument) => bookmark._id != bookmarkId,
      );
      await PostModel.findByIdAndUpdate(postId, {
        bookmarks: existingPostBookmarks,
      });

      res.status(StatusCodes.OK).json({
        statusMessage: ReasonPhrases.OK,
        message: 'The bookmark has been removed',
        bookmark: existingBookmark,
      });
      return;
    }

    res.status(StatusCodes.NOT_FOUND).json({
      statusMessage: ReasonPhrases.NOT_FOUND,
      message: 'The bookmark does not exist',
    });
    return;
  },
);
