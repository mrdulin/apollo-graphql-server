import { IModels, IUserInfo } from './models';

interface IServiceOptions {
  models: IModels;
  user?: IUserInfo;
}

export { IServiceOptions };
