'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate({ Museum }) {
      this.belongsTo(Museum, { foreignKey: 'museumId' });
    }
  }
  News.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
      museumId: DataTypes.INTEGER,
      photo: DataTypes.STRING,
      date: DataTypes.DATE,
      title_en: DataTypes.STRING,
      text_en: DataTypes.TEXT,
      title_de: DataTypes.STRING,
      text_de: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'News',
    },
  );
  return News;
};
