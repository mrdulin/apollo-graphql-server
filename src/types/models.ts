interface IModels {
  [key: string]: any;
}

interface IUserInfo {
  id: string;
  name: string;
  email: string;
}

type UserInfo = IUserInfo | undefined;

export { IModels, IUserInfo, UserInfo };
