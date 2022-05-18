import { DataTypes, Model } from 'sequelize';
import db from '.';

class Teams extends Model {
  public id: number;

  public teamName: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
  timestamps: false,
  tableName: 'teams',
});

export default Teams;
