import { Document, Schema, model } from 'mongoose';
import { BookmarkDocument } from './bookmark.model';
import { LikeDocument } from './like.model';
import { RetweetDocument } from './retweet.model';
import { CommentDocument } from './comment.model';

enum PublicationType {
  Public = 'public',
  FollowersOnly = 'followersOnly',
}

export interface Post extends Document {
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: Schema.Types.ObjectId;
  imageURL: string | null;
  publicationType: PublicationType;
  bookmarks: BookmarkDocument[];
  likes: LikeDocument[];
  retweets: RetweetDocument[];
  comments: CommentDocument[];
}

const postSchema = new Schema<Post>(
  {
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imageURL: {
      type: String,
      default: null,
    },
    publicationType: {
      type: String,
      enum: Object.values(PublicationType),
      default: PublicationType.Public,
    },
    bookmarks: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Bookmark',
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Like',
      },
    ],
    retweets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Retweet',
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  { timestamps: true },
);

export const PostModel = model<Post>('Post', postSchema);
