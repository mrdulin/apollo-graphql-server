import { Schema, model, Model, Document } from 'mongoose';

interface IUploadDocument extends Document {
  filepath: string;
  mimetype: string;
  encoding: string;
  filename: string;
}

const uploadSchema: Schema = new Schema({
  filepath: String,
  mimetype: String,
  encoding: String,
  filename: String
});

const Upload: Model<IUploadDocument> = model<IUploadDocument>('Upload', uploadSchema);

export { IUploadDocument, Upload };
