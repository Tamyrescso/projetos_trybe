import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Products } from '../interfaces';

export default class ProductsModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll() {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Products',
    );

    const [rows] = result;
    return rows as Products[];
  }

  public async create(product: Products) {
    const { name, amount } = product;
    const query = 'INSERT INTO Trybesmith.Products (name, amount) VALUES (?,?)';
    const result = await this.connection.execute<ResultSetHeader>(query, [name, amount]);

    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { item: { id: insertId, ...product } };
  }
}