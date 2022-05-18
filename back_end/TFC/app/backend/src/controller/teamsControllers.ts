import { NextFunction, Request, Response } from 'express';
import { findTeams, findTeam } from '../service/teamsServices';

const findAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await findTeams();

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { code, data } = await findTeam(id);

    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export { findAll, findById };
