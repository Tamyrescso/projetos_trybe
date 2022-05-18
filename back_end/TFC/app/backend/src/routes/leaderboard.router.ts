import { Router } from 'express';
import {
  leaderboardAway,
  leaderboardHome,
  leaderboard } from '../controller/leaderboardControllers';

const leaderboardRouter = Router();

leaderboardRouter.get('/', leaderboard);
leaderboardRouter.get('/home', leaderboardHome);
leaderboardRouter.get('/away', leaderboardAway);

export default leaderboardRouter;
