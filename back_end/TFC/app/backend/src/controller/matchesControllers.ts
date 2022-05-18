import { NextFunction, Request, Response } from 'express';
import {
  findMatches,
  findMatchesInProgress,
  createMatches,
  finishMatch,
  updateMatch } from '../service/matchesServices';

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { inProgress } = req.query;
    if (!inProgress) {
      const { code, data } = await findMatches();
      return res.status(code).json(data);
    }
    if (typeof inProgress === 'string') {
      const { code, data } = await findMatchesInProgress(inProgress);
      return res.status(code).json(data);
    }
    return res.status(400).json({ message: 'Query must be a string' });
  } catch (e) {
    next(e);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const createMatch = await createMatches(req.body);

    const { code, data } = createMatch;
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (req.body.homeTeamGoals) {
      const { code, data } = await updateMatch(id, req.body);
      return res.status(code).json(data);
    }
    const { code, data } = await finishMatch(id);
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export { findAll, create, update };
