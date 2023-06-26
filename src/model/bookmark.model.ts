import { Document, Schema, model } from 'mongoose';

export interface BookmarkDocument extends Document {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookmarkSchema = new Schema<BookmarkDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
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
  },
  { timestamps: true },
);

const BookmarkModel = model<BookmarkDocument>('Bookmark', BookmarkSchema);

export default BookmarkModel;
