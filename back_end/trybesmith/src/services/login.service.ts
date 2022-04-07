import connection from '../models/connection';
import LoginModel from '../models/login.model';
import { Login } from '../interfaces';
import { validateLogin } from '../schema/validations';
import jwtGenerator from './jwtGenerator';

export default class LoginService {
  public model: LoginModel;

  constructor() {
    this.model = new LoginModel(connection);
  }

  public async login(loginData: Login) {
    const loginUnvalid = validateLogin(loginData);
    if (loginUnvalid) return loginUnvalid;

    const [user] = await this.model.login(loginData);
    if (!user) return { code: 401, data: { error: 'Username or password invalid' } };

    if (loginData.username !== user.username || loginData.password !== user.password) {
      return { code: 401, data: { error: 'Username or password invalid' } };
    }

    const token = jwtGenerator(loginData);

    return { code: 200, data: { token } };
  }
}