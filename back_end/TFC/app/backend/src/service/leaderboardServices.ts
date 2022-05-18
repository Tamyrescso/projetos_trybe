import * as sequelize from 'sequelize';
import { ILeaderboard } from '../interface/leaderboard';
import Matches from '../database/models/matches';

const createRawQuery = (main: string, second: string) => (`SELECT team_name as name,
    ((COUNT(IF(${main}_goals > ${second}_goals, 1, null)) * 3)
    + COUNT(IF(${main}_goals = ${second}_goals, 1, null))) as totalPoints,
    COUNT(${main}) as totalGames,
    COUNT(IF(${main}_goals > ${second}_goals, 1, null)) as totalVictories,
    COUNT(IF(${main}_goals = ${second}_goals, 1, null)) as totalDraws,
    COUNT(IF(${main}_goals < ${second}_goals, 1, null)) as totalLosses,
    SUM(${main}_goals) as goalsFavor,
    SUM(${second}_goals) as goalsOwn,
    SUM(${main}_goals) - SUM(${second}_goals) as goalsBalance,
    ROUND(
    (((COUNT(IF(${main}_goals > ${second}_goals, 1, null)) * 3)
    + COUNT(IF(${main}_goals = ${second}_goals, 1, null)))
    / (COUNT(${main}) * 3)) * 100, 2) as efficiency
  FROM TRYBE_FUTEBOL_CLUBE.teams
  INNER JOIN TRYBE_FUTEBOL_CLUBE.matches
  ON teams.id = ${main} WHERE matches.in_progress = false
  GROUP BY team_name
  ORDER BY totalPoints DESC, totalVictories DESC, goalsBalance DESC, goalsFavor DESC, goalsOwn DESC`
);

const orderAllMatches = (a: ILeaderboard, b: ILeaderboard) => {
  const points = b.totalPoints - a.totalPoints;
  const victories = b.totalVictories - a.totalVictories;
  const balanceG = b.goalsBalance - a.goalsBalance;
  const favorG = b.goalsFavor - a.goalsFavor;
  const ownG = b.goalsOwn - a.goalsOwn;

  return (
    points || victories || balanceG || favorG || ownG
  );
};

const serializeData = (team: any) => ({
  name: team.name,
  totalPoints: team.totalPoints,
  totalGames: team.totalGames,
  totalVictories: team.totalVictories,
  totalDraws: team.totalDraws,
  totalLosses: team.totalLosses,
  goalsFavor: parseInt(team.goalsFavor, 10),
  goalsOwn: parseInt(team.goalsOwn, 10),
  goalsBalance: parseInt(team.goalsBalance, 10),
  efficiency: parseFloat(team.efficiency),
});

const serializeAllMatchesResult = (h: ILeaderboard, i: number, a: ILeaderboard[]) => ({
  name: h.name,
  totalPoints: h.totalPoints + a[i].totalPoints,
  totalGames: h.totalGames + a[i].totalGames,
  totalVictories: h.totalVictories + a[i].totalVictories,
  totalDraws: h.totalDraws + a[i].totalDraws,
  totalLosses: h.totalLosses + a[i].totalLosses,
  goalsFavor: h.goalsFavor + a[i].goalsFavor,
  goalsOwn: h.goalsOwn + a[i].goalsOwn,
  goalsBalance: (h.goalsFavor + a[i].goalsFavor) - (h.goalsOwn + a[i].goalsOwn),
  efficiency: parseFloat(
    (
      (
        (h.totalPoints + a[i].totalPoints) / ((h.totalGames + a[i].totalGames) * 3))
         * 100).toFixed(2),
  ),
});

const getHomeLeaderboard = async () => {
  const homeLeaderboard = await Matches.sequelize?.query(
    createRawQuery('home_team', 'away_team'),
    { type: sequelize.QueryTypes.SELECT },
  );
  const matches = homeLeaderboard?.map(serializeData);
  return { code: 200, data: matches };
};

const getAwayLeaderboard = async () => {
  const awayLeaderboard = await Matches.sequelize?.query(
    createRawQuery('away_team', 'home_team'),
    { type: sequelize.QueryTypes.SELECT },
  );
  const matches = awayLeaderboard?.map(serializeData);
  return { code: 200, data: matches };
};

const getLeaderboard = async () => {
  const home: ILeaderboard[] | undefined = (await getHomeLeaderboard()).data;
  const away: ILeaderboard[] | undefined = (await getAwayLeaderboard()).data;

  const orderedHome = home?.sort((a, b) => (a.name > b.name ? 1 : -1));
  const orderedAway = away?.sort((a, b) => (a.name > b.name ? 1 : -1));

  if (!orderedAway) return { code: 404, data: {} };
  const allMatches = orderedHome?.map((h, i) => serializeAllMatchesResult(h, i, orderedAway));

  const orderedAllMatches = allMatches?.sort(orderAllMatches);
  return { code: 200, data: orderedAllMatches };
};

export { getHomeLeaderboard, getAwayLeaderboard, getLeaderboard };
