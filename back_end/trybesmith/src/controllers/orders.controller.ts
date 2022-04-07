import { Request, Response } from 'express';
import OrdersService from '../services/orders.service';

class OrdersController {
  constructor(private ordersService = new OrdersService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const orders = await this.ordersService.getAll();
    res.status(200).json(orders);
  };

  public create = async (req: Request, res: Response) => {
    const { tokenData } = res.locals;

    const { code, data } = await this.ordersService.create(req.body, tokenData);

    return res.status(code).json(data);
  };
}

export default OrdersController;