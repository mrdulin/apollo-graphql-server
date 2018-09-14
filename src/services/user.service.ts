import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Model } from 'mongoose';

import { IUserDocument } from '../database/mongodb/models';
import { config } from '../config';
import { AppError, logger } from '../utils';
import { UserInfo } from '../types';

class UserService {
  constructor(private User: Model<IUserDocument>) {}

  public async findById(id: string) {
    return this.User.findById(id);
  }

  public async login(email: string, password: string): Promise<UserInfo> {
    const user: IUserDocument | null = await this.User.findOne({ email });
    let match: boolean;

    if (!user) {
      throw new AppError(AppError.USER_NOT_FOUND);
    }

    try {
      match = await bcrypt.compare(password, user.password);
    } catch (error) {
      logger.error(error);
      throw new AppError(AppError.SERVER_INTERNAL_ERROR);
    }

    if (!match) {
      throw new AppError(AppError.INVALID_PASSWORD);
    }

    const userInfo: UserInfo = {
      id: user.id,
      name: user.name,
      email: user.email
    };

    const token: string = jwt.sign(
      {
        user: userInfo
      },
      config.JWT_SCERET,
      { expiresIn: config.JWT_EXPIRES }
    );

    userInfo.token = token;
    return userInfo;
  }

  public async register(email: string, name: string, password: string): Promise<UserInfo> {
    if (!email) {
      throw new AppError(AppError.EMAIL_IS_REQUIRED);
    }
    if (!password) {
      throw new AppError(AppError.PASSWORD_IS_REQUIRED);
    }
    const saltRounds = 12;
    const user: IUserDocument | null = await this.User.findOne({ email });
    let hashPwd: string;

    if (user) {
      throw new AppError(AppError.EMAIL_ALREADY_EXISTS);
    }

    try {
      hashPwd = await bcrypt.hash(password, saltRounds);
    } catch (error) {
      logger.error(error);
      throw new AppError(AppError.SERVER_INTERNAL_ERROR);
    }

    const newUser = await this.User.create({
      email,
      name,
      password: hashPwd
    });

    return { id: newUser._id, email: newUser.email, name: newUser.name };
  }
}

export { UserService };
