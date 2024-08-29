'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class VisitedMuseum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  VisitedMuseum.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      museumId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'VisitedMuseum',
    },
  );
  return VisitedMuseum;
};
