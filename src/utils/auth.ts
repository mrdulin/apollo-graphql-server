import jwt from 'jsonwebtoken';
import { Request } from 'express';

import { config } from '../config';
import { AppError, logger } from './';

function auth(context) {
  let req;
  if (context.headers) {
    req = context;
  } else {
    req = context.req;
  }
  const { authorization } = req.headers;
  if (!authorization) {
    throw new AppError({ msg: 'authorization failed', code: 1001 });
  }
  let token;
  const parts = authorization.split(' ');

  if (parts.length === 2) {
    const schema = parts[0];
    const credentials = parts[1];

    if (/^Bearer$/i.test(schema)) {
      token = credentials;
    } else {
      throw new AppError({ msg: 'credentials_bad_scheme: Format is Authorization: Bearer [token]', code: 1002 });
    }
  }

  try {
    const user = jwt.verify(token, config.JWT_SCERET);
    return user;
  } catch (error) {
    logger.error(error);
    throw new AppError({ msg: 'authorization failed', code: 1001 });
  }
}

function bypassAuth(req: Request) {
  const { authorization } = req.headers;
  if (authorization) {
    let token;
    const parts = authorization.split(' ');

    if (parts.length === 2) {
      const schema = parts[0];
      const credentials = parts[1];

      if (/^Bearer$/i.test(schema)) {
        token = credentials;
      } else {
        logger.error('credentials_bad_scheme: Format is Authorization: Bearer [token]');
      }
    }

    if (!token) {
      console.error('token does not exists');
      return;
    }

    try {
      const user = jwt.verify(token, config.JWT_SCERET);
      return user;
    } catch (error) {
      logger.error(error);
    }
  }
}

export { auth, bypassAuth };
