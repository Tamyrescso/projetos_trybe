import { NextFunction, Request, Response } from 'express';
import {
  getHomeLeaderboard,
  getAwayLeaderboard,
  getLeaderboard } from '../service/leaderboardServices';

const leaderboardHome = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getHomeLeaderboard();
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const leaderboardAway = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getAwayLeaderboard();
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

const leaderboard = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const { code, data } = await getLeaderboard();
    return res.status(code).json(data);
  } catch (e) {
    next(e);
  }
};

export { leaderboardHome, leaderboardAway, leaderboard };
