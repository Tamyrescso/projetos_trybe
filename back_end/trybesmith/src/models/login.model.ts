import { Pool } from 'mysql2/promise';
import { Login } from '../interfaces';

export default class LoginModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async login(user: Login) {
    const { username, password } = user;
    const query = 'SELECT username, password FROM Trybesmith.Users WHERE username=? AND password=?';
    const result = await this.connection.execute(query, [username, password]);

    const [rows] = result;
    return rows as Login[];
  }
}