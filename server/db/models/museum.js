'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Museum extends Model {
    static associate({ News, User }) {
      this.hasMany(News, { foreignKey: 'museumId' });
      this.belongsToMany(User, {
        through: 'FavoriteMuseum',
        foreignKey: 'museumId',
        as: 'favoritedByUsers',
      });

      this.belongsToMany(User, {
        through: 'VisitedMuseum',
        foreignKey: 'museumId',
        as: 'visitedByUsers',
      });

      this.belongsToMany(User, {
        through: 'Scan',
        foreignKey: 'museumId',
        as: 'scansByUsers',
      });

      this.belongsToMany(User, {
        through: 'Recall',
        foreignKey: 'museumId',
        as: 'recalledByUsers',
      });
    }
  }
  Museum.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      location: DataTypes.STRING,
      city: DataTypes.STRING,
      photo: DataTypes.STRING,
      workedTime: DataTypes.STRING,
      holidays: DataTypes.STRING,
      theme: DataTypes.STRING,
      coordinates: DataTypes.STRING,
      name_en: DataTypes.STRING,
      description_en: DataTypes.TEXT,
      location_en: DataTypes.STRING,
      city_en: DataTypes.STRING,
      workedTime_en: DataTypes.STRING,
      holidays_en: DataTypes.STRING,
      theme_en: DataTypes.STRING,
      name_de: DataTypes.STRING,
      description_de: DataTypes.TEXT,
      location_de: DataTypes.STRING,
      city_de: DataTypes.STRING,
      workedTime_de: DataTypes.STRING,
      holidays_de: DataTypes.STRING,
      theme_de: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Museum',
    },
  );
  return Museum;
};
