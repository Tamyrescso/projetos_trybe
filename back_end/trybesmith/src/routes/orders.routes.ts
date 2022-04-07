import { Router } from 'express';
import OrdersController from '../controllers/orders.controller';
import Auth from '../middlewares/auth';

const router = Router();

const ordersController = new OrdersController();

router.get('/orders', ordersController.getAll);
router.post('/orders', Auth, ordersController.create);

export default router;