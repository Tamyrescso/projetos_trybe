import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  public id: number;

  public username: string;

  public role: string;

  public email: string;

  public password: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Users',
  timestamps: false,
  tableName: 'users',
});

export default Users;