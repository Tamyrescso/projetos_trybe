import { IMatch } from '../interface/matches';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

const findMatches = async () => {
  const matches = await Matches.findAll({
    include: [{
      model: Teams,
      as: 'teamHome',
      attributes: { exclude: ['id'] },
    },
    {
      model: Teams,
      as: 'teamAway',
      attributes: { exclude: ['id'] },
    }],
  });

  return { code: 200, data: matches };
};

const findMatchesInProgress = async (inProgress: string) => {
  const { data } = await findMatches();
  const filteredMatches = data.filter((match) => (match.inProgress).toString() === inProgress);

  return { code: 200, data: filteredMatches };
};

const createMatches = async (body: IMatch) => {
  const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = body;

  if (homeTeam === awayTeam) {
    return {
      code: 401,
      data: { message: 'It is not possible to create a match with two equal teams' },
    };
  }
  const findHomeTeam = await Teams.findByPk(homeTeam);
  const findAwayTeam = await Teams.findByPk(awayTeam);

  if (!findHomeTeam || !findAwayTeam) {
    return { code: 404, data: { message: 'There is no team with such id!' } };
  }

  const newMatch = await Matches.create({
    homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
  });

  return { code: 201, data: newMatch };
};

const finishMatch = async (id: string) => {
  await Matches.update({ inProgress: false }, { where: { id } });

  return { code: 200, data: {} };
};

const updateMatch = async (id: string, body: IMatch) => {
  const { homeTeamGoals, awayTeamGoals } = body;
  await Matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

  return { code: 200, data: {} };
};

export { findMatches, findMatchesInProgress, createMatches, finishMatch, updateMatch };
