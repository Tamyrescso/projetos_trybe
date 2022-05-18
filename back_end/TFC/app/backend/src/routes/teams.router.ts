import { Router } from 'express';
import { findAll, findById } from '../controller/teamsControllers';

const teamsRouter = Router();

teamsRouter.get('/', findAll);
teamsRouter.get('/:id', findById);

export default teamsRouter;
