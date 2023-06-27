import mongoose, { Schema, Document } from 'mongoose';

export interface RetweetDocument extends Document {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RetweetSchema: Schema<RetweetDocument> = new Schema<RetweetDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
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

const RetweetModel = mongoose.model<RetweetDocument>('Retweet', RetweetSchema);

export default RetweetModel;
