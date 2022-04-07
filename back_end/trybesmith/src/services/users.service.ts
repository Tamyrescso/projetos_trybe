import connection from '../models/connection';
import UsersModel from '../models/users.model';
import { Users } from '../interfaces';
import { validateUser } from '../schema/validations';
import jwtGenerator from './jwtGenerator';

export default class UsersService {
  public model: UsersModel;

  constructor() {
    this.model = new UsersModel(connection);
  }

  public async create(user: Users) {
    const validate = validateUser(user);
    if (validate) return validate;

    const newUser = await this.model.create(user);

    const token = jwtGenerator(newUser);
    return { code: 201, data: { token } };
  }
}