'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Card, Museum }) {
      this.hasMany(Card, { foreignKey: 'userId' });
      this.belongsToMany(Museum, {
        through: 'FavoriteMuseum',
        foreignKey: 'userId',
        as: 'favoriteMuseums',
      });

      this.belongsToMany(Museum, {
        through: 'VisitedMuseum',
        foreignKey: 'userId',
        as: 'visitedMuseums',
      });

      this.belongsToMany(Museum, {
        through: 'Scan',
        foreignKey: 'userId',
        as: 'scansMuseums',
      });

      this.belongsToMany(Museum, {
        through: 'Recall',
        foreignKey: 'userId',
        as: 'recalledMuseums',
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      password: DataTypes.STRING,
      city: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
