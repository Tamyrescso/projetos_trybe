import { Request, Response } from 'express';
import ProductsService from '../services/products.service';

class ProductsController {
  constructor(private productsService = new ProductsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const products = await this.productsService.getAll();
    res.status(200).json(products);
  };

  public create = async (req: Request, res: Response) => {
    const { code, data } = await this.productsService.create(req.body);

    return res.status(code).json(data);
  };
}

export default ProductsController;