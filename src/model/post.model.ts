import { Document, Schema, model } from 'mongoose';
import { BookmarkDocument } from './bookmark.model';

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
  },
  { timestamps: true },
);

export const PostModel = model<Post>('Post', postSchema);
