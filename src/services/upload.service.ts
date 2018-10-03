import fs from "fs";
import mkdirp from "mkdirp";
import path from "path";
import { Model, Types } from "mongoose";

import { IUploadDocument } from "../database/models";
import { UserInfo } from "../types";
import { AppError, logger } from "../utils";

class UploadService {
  public static uploadDir: string = path.resolve(__dirname, "../../uploads");
  constructor(private Upload: Model<IUploadDocument>, private user: UserInfo) {
    if (!fs.existsSync(UploadService.uploadDir)) {
      this.mkdirp(UploadService.uploadDir);
    }
  }

  public getAll(): Promise<IUploadDocument[]> {
    if (!this.user) {
      throw new AppError(AppError.Unauthorized);
    }
    return this.Upload.find().exec();
  }

  public singleUpload(file) {
    if (!this.user) {
      throw new AppError(AppError.Unauthorized);
    }
    return this.processUpload(file);
  }

  public multipleUpload(files) {
    if (!this.user) {
      throw new AppError(AppError.Unauthorized);
    }
    return Promise.all(files.map(file => this.processUpload(file)));
  }

  private async processUpload(upload) {
    try {
      const { stream, filename, mimetype, encoding } = await upload;
      const { id, filepath } = await this.storeFS({ stream, filename });
      const newFile = await this.Upload.create({
        _id: id,
        filepath,
        mimetype,
        encoding,
        filename
      });
      return newFile;
    } catch (err) {
      logger.error(err);
      throw new Error(err);
    }
  }

  private mkdirp(dir: string): void {
    mkdirp(dir, (err: NodeJS.ErrnoException) => {
      if (err) {
        logger.error(err);
      }
      logger.info("Make upload directory successfully");
    });
  }

  private storeFS({
    stream,
    filename
  }): Promise<{ id: Types.ObjectId; filepath: string }> {
    const id = Types.ObjectId();
    const filepath = `${UploadService.uploadDir}/${id.toString()}-${filename}`;
    return new Promise((resolve, reject) => {
      stream.on("error", err => {
        if (stream.truncated) {
          // Delete the truncated file
          fs.unlinkSync(filepath);
        }
        reject(err);
      });

      stream
        .pipe(fs.createWriteStream(filepath))
        .on("error", err => reject(err))
        .on("finish", () => resolve({ id, filepath }));
    });
  }
}
export { UploadService };
