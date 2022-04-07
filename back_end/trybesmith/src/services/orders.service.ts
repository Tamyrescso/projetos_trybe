import connection from '../models/connection';
import OrdersModel from '../models/orders.model';
import { OrderProducts, ShowOrder, Login } from '../interfaces';
import { validateOrder } from '../schema/validations';

export default class OrdersService {
  public model: OrdersModel;

  constructor() {
    this.model = new OrdersModel(connection);
  }

  public async getAll() {
    const orders = await this.model.getAll();
    const newArray: ShowOrder[] = [];
    const patternArray = orders.map(async (order) => {
      const { id } = order;
      const result = await this.model.findProductsByOrderId(id);
      const products = result.map((item) => item.id);
      newArray.push({ ...order, products });
    });
    await Promise.all(patternArray);
    return newArray;
  }

  public async create(body: OrderProducts, user: Login) {
    const validate = validateOrder(body);
    if (validate) return validate;

    const [findUserId] = await this.model.fundUserByUsername(user);
    const { id } = findUserId;

    const createAndUpdate = await this.model.createOrderAndUpdateProduct(body, id);

    return { code: 201, data: createAndUpdate };
  }
}