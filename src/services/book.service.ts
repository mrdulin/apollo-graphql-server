import { Model } from "mongoose";

import { UserInfo } from "../types";
import { IBookDocument } from "../database/models";
import { AppError } from "../utils";

class BookService {
  constructor(private Book: Model<IBookDocument>, private user: UserInfo) {}

  public getAll(): Promise<IBookDocument[]> {
    if (!this.user) {
      throw new AppError(AppError.Unauthorized);
    }
    return this.Book.find().exec();
  }

  public getById(id: string): Promise<IBookDocument | null> {
    if (!this.user) {
      throw new AppError(AppError.Unauthorized);
    }
    return this.Book.findById(id).exec();
  }

  public create(book: IBookDocument): Promise<IBookDocument> {
    if (!this.user) {
      throw new AppError(AppError.Unauthorized);
    }
    book.authorId = this.user.id;
    return this.Book.create(book);
  }
}

export { BookService };
