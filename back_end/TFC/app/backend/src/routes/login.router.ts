import { Router } from 'express';
import { login, validate } from '../controller/loginControllers';
import auth from '../middleware/auth';

const loginRouter = Router();

loginRouter.post('/', login);
loginRouter.get('/validate', auth, validate);

export default loginRouter;
