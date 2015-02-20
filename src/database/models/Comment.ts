import { Schema, model, Model, Document } from 'mongoose';

interface ICommentDocument extends Document {
  content: string;
  bookId: string;
}

const commentSchema = new Schema({
  content: String,
  bookId: String
});

const Comment: Model<ICommentDocument> = model<ICommentDocument>('Comment', commentSchema);

export { ICommentDocument, Comment };
