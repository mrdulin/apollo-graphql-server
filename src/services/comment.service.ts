import { IServiceOptions, IModels } from '../types';
import { ICommentDocument } from '../database/models';

class CommentService {
  private models: IModels;
  constructor(opts: IServiceOptions) {
    this.models = opts.models;
  }

  public create(comment: ICommentDocument) {
    return this.models.Comment.create(comment);
  }

  public getByBookId(id: string, limit: number = 10) {
    return this.models.Comment.find({ bookId: id }).limit(limit);
  }

  public getByPage(id: string, offset: number = 0, limit: number = 10) {
    return this.models.Comment.find({ bookId: id })
      .skip(offset * limit)
      .limit(limit);
  }
}

export { CommentService };
