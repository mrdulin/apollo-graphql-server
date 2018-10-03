import { Model } from "mongoose";

import { UserInfo } from "../types";
import { ICommentDocument } from "../database/models";
import { AppError } from "../utils";

class CommentService {
  constructor(
    private Comment: Model<ICommentDocument>,
    private user: UserInfo
  ) {}

  public create(comment: ICommentDocument) {
    if (!this.user) {
      throw new AppError(AppError.Unauthorized);
    }
    comment.authorId = this.user.id;
    return this.Comment.create(comment);
  }

  public getByBookId(
    id: string,
    limit: number = 10
  ): Promise<ICommentDocument[]> {
    if (!this.user) {
      throw new AppError(AppError.Unauthorized);
    }
    return this.Comment.find({ bookId: id })
      .limit(limit)
      .exec();
  }

  public getByPage(
    id: string,
    offset: number = 0,
    limit: number = 10
  ): Promise<ICommentDocument[]> {
    if (!this.user) {
      throw new AppError(AppError.Unauthorized);
    }
    return this.Comment.find({ bookId: id })
      .skip(offset * limit)
      .limit(limit)
      .exec();
  }
}

export { CommentService };
