import { Schema, model, Model, Document } from 'mongoose';

interface IUserDocument extends Document {
  email: string;
  name: string;
  password: string;
}

const userSchema: Schema = new Schema({
  email: String,
  name: String,
  password: String
});

const User: Model<IUserDocument> = model<IUserDocument>('User', userSchema);

export { User };
