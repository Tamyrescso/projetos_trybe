import Teams from '../database/models/teams';

const findTeams = async () => {
  const teams = await Teams.findAll();

  return { code: 200, data: teams };
};

const findTeam = async (id: string) => {
  const team = await Teams.findByPk(id);

  if (!team) return { code: 404, data: { message: 'Team does not exist' } };

  return { code: 200, data: team };
};

export { findTeams, findTeam };
