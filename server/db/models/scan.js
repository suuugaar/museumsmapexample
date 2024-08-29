'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Museum, { foreignKey: 'museumId' });
    }
  }
  Scan.init(
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
      modelName: 'Scan',
    },
  );
  return Scan;
};
