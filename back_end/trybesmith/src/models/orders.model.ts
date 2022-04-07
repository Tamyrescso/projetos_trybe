import { Pool, ResultSetHeader } from 'mysql2/promise';
import { Orders, ProductsByOrder, OrderProducts, Login, UserId } from '../interfaces';

export default class OrdersModel {
  private connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll() {
    const result = await this.connection.execute(
      'SELECT * FROM Trybesmith.Orders ORDER BY Trybesmith.Orders.userId',
    );
    const [rows] = result;
    return rows as Orders[];
  }

  public async findProductsByOrderId(id: number) {
    const result = await this.connection.execute(
      'SELECT id FROM Trybesmith.Products WHERE orderId= ?',
      [id],
    );
    const [rows] = result;
    return rows as ProductsByOrder[];
  }

  public async fundUserByUsername(user: Login) {
    const { username } = user;
    const findUserId = await this.connection.execute(
      'SELECT id FROM Trybesmith.Users WHERE username= ?',
      [username],
    );
    const [rows] = findUserId;
    return rows as UserId[];
  }

  public async createOrderAndUpdateProduct(body: OrderProducts, id: number) {
    const { products } = body;
    const stringProducts = products.toString();

    const query = 'INSERT INTO Trybesmith.Orders (userId) VALUES (?)';
    const result = await this.connection.execute<ResultSetHeader>(query, [id]);

    const [dataInserted] = result;
    const { insertId } = dataInserted;

    const query2 = `UPDATE Trybesmith.Products SET orderId= ? WHERE id IN (${stringProducts})`;
    await this.connection.execute<ResultSetHeader>(
      query2,
      [insertId],
    );

    return { order: { userId: id, products } };
  }
}