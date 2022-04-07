import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Users } from '../interfaces';

export default class UsersModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async create(user: Users) {
    const { username, classe, level, password } = user;
    const query = `INSERT INTO Trybesmith.Users (username, classe, level, password)
      VALUES (?,?,?,?)`;
    const result = await this.connection.execute<ResultSetHeader>(
      query,
      [username, classe, level, password],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...user };
  }
}