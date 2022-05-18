export interface IMatch {
  id?: number;
  homeTeam?: number | string;
  awayTeam?: number | string;
  homeTeamGoals: number | string;
  awayTeamGoals: number | string;
  inProgress?: boolean | string;
}
