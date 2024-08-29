'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteMuseum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FavoriteMuseum.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      museumId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'FavoriteMuseum',
    },
  );
  return FavoriteMuseum;
};
