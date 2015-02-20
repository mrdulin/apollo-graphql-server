import { IModels, IServiceOptions, UserInfo } from '../types';
import { IBookDocument } from '../database/models';

class BookService {
  private user: UserInfo;
  private models: IModels;
  constructor(opts: IServiceOptions) {
    this.models = opts.models;
    this.user = opts.user;
  }

  public getAll(): Promise<IBookDocument[]> {
    return this.models.Book.find();
  }

  public getById(id: string): Promise<IBookDocument> | undefined {
    if (this.user) {
      return this.models.Book.findById(id);
    }
  }

  public create(book: IBookDocument): Promise<IBookDocument> | undefined {
    if (this.user) {
      return this.models.Book.create(book);
    }
  }
}

export { BookService };
