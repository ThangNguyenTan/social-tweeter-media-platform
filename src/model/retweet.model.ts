import mongoose, { Schema, Document } from 'mongoose';

interface IRetweet extends Document {
  user: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  createdAt: Date;
}

const RetweetSchema: Schema<IRetweet> = new Schema<IRetweet>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Retweet = mongoose.model<IRetweet>('Retweet', RetweetSchema);

export default Retweet;
