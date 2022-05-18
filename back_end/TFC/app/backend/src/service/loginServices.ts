import * as bcryptjs from 'bcryptjs';
import { IUser } from '../interface/user';
import Users from '../database/models/users';
import tokenGenerator from './tokenGenerator';

const userLogin = async (email: string, password: string) => {
  if (!email || !password) return { code: 400, data: { message: 'All fields must be filled' } };

  const user = await Users.findOne({ where: { email } });
  if (!user || !bcryptjs.compareSync(password, user.password) || password.length < 7) {
    return { code: 401, data: { message: 'Incorrect email or password' } };
  }

  const token = tokenGenerator({ email, password });

  const result = { user: {
    id: user.id,
    username: user.username,
    role: user.role,
    email,
  },
  token };
  return { code: 200, data: result };
};

const validateUser = async (tokenData: IUser) => {
  const { email } = tokenData;
  const user = await Users.findOne({ where: { email } });

  if (user) return { code: 200, data: user.role };

  return { code: 404, data: 'User not found' };
};

export { userLogin, validateUser };
