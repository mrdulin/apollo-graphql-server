interface IModels {
  [key: string]: any;
}

interface IUserInfo {
  id: string;
  name: string;
  email: string;
  token?: string;
}

type UserInfo = IUserInfo | undefined;

export { IModels, IUserInfo, UserInfo };
