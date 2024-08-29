'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    static associate({ User }) {
      this.belongsTo(User, { foreignKey: 'userId' });
    }
  }
  Card.init(
    {
      userId: DataTypes.INTEGER,
      validity: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Card',
    },
  );
  return Card;
};
