import { Schema, model, Model, Document } from 'mongoose';

interface IBookDocument extends Document {
  title: string;
  author: string;
}

const bookSchema: Schema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const Book: Model<IBookDocument> = model<IBookDocument>('Book', bookSchema);

export { Book, IBookDocument };
