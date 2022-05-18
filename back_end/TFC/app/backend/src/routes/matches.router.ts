import { Router } from 'express';
import { findAll, create, update } from '../controller/matchesControllers';
import auth from '../middleware/auth';

const matchesRouter = Router();

matchesRouter.get('/', findAll);
matchesRouter.post('/', auth, create);
matchesRouter.patch('/:id', update);
matchesRouter.patch('/:id/finish', update);

export default matchesRouter;
