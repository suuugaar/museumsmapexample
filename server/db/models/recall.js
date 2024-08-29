'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recall extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Recall.init(
    {
      text: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      museumId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Recall',
    },
  );
  return Recall;
};
