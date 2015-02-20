import fs from 'fs';
import mkdirp from 'mkdirp';

import { IModels, UserInfo, IServiceOptions } from '../types';

class UploadService {
  private user: UserInfo;
  private models: IModels;
  private dir: string;

  constructor(opts: IServiceOptions & { dir: string }) {
    this.dir = opts.dir;
    this.user = opts.user;
    this.models = opts.models;

    mkdirp(dir);
  }

  public getAll() {
    return this.models.Upload.find();
  }

  public singleUpload(file, lowdb) {
    return this.processUpload(file, lowdb);
  }

  public multipleUpload(files, lowdb) {
    return Promise.all(files.map(file => this.processUpload(file, lowdb)));
  }

  private async processUpload(upload, lowdb) {
    try {
      const { stream, filename, mimetype, encoding } = await upload;
      const { id, filepath } = await this.storeFS({ stream, filename });
      return this.storeDB({ id, filepath, mimetype, encoding, filename }, lowdb);
    } catch (err) {
      console.log('processUpload error');
      throw new Error(err);
    }
  }

  private storeDB(file, lowdb) {
    return lowdb
      .get('uploads')
      .push(file)
      .last()
      .write();
  }

  private storeFS({ stream, filename }) {
    const id = shortid.generate();
    const filepath = `${this.dir}/${id}-${filename}`;
    return new Promise((resolve, reject) => {
      stream.on('error', err => {
        if (stream.truncated) {
          // Delete the truncated file
          fs.unlinkSync(filepath);
        }
        reject(err);
      });

      stream
        .pipe(fs.createWriteStream(filepath))
        .on('error', err => reject(err))
        .on('finish', () => resolve({ id, filepath }));
    });
  }
}
export { UploadService };
