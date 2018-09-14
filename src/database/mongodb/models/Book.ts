import { Schema, model, Model, Document } from 'mongoose';

interface IBookDocument extends Document {
  title: string;
  authorId: string;
}

const bookSchema: Schema = new Schema({
  title: String,
  authorId: String
});

const Book: Model<IBookDocument> = model<IBookDocument>('Book', bookSchema);

export { Book, IBookDocument };
