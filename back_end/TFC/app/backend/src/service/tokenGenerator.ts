import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { IUser } from '../interface/user';

export default (payload: IUser) => {
  const SECRET = fs.readFileSync('jwt.evaluation.key', 'utf8');

  const signInOptions: jwt.SignOptions = {
    expiresIn: '10d',
  };

  return jwt.sign(payload, SECRET, signInOptions);
};
