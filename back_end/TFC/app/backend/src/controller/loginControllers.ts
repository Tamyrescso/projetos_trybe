import { NextFunction, Request, Response } from 'express';
import { userLogin, validateUser } from '../service/loginServices';

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await userLogin(email, password);

    const { code, data } = user;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const validate = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { tokenData } = res.locals;

    const { code, data } = await validateUser(tokenData);

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export { login, validate };
