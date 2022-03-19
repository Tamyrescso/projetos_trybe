const { DataTypes } = require('sequelize');

const Attributes = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  content: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  published: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  updated: {
    allowNull: true,
    type: DataTypes.DATE,
  },
};

module.exports = (sequelize) => {
  const BlogPost = sequelize.define(
    'BlogPost',
    Attributes,
    {
      underscored: false,
      timestamps: false,
    },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return BlogPost;
};