import mongoose, { Schema, Document } from 'mongoose';

interface IRetweet extends Document {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const RetweetSchema: Schema<IRetweet> = new Schema<IRetweet>(
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

const Retweet = mongoose.model<IRetweet>('Retweet', RetweetSchema);

export default Retweet;
