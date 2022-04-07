import connection from '../models/connection';
import ProductsModel from '../models/products.model';
import { Products } from '../interfaces';
import { validateProduct } from '../schema/validations';

export default class ProductsService {
  public model: ProductsModel;

  constructor() {
    this.model = new ProductsModel(connection);
  }

  public getAll() {
    return this.model.getAll();
  }

  public async create(product: Products) {
    const validate = validateProduct(product);
    if (validate) return validate;
    const create = await this.model.create(product);

    return { code: 201, data: create };
  }
}