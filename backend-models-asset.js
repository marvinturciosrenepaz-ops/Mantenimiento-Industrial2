const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Asset = sequelize.define("Asset", {
  code: { type: DataTypes.STRING, allowNull: false, unique: true }, // Código del activo
  area: DataTypes.STRING,
  equipment: DataTypes.STRING,
  system: DataTypes.STRING,
  component: DataTypes.STRING,
  acquisitionDate: DataTypes.DATE
});

module.exports = Asset;
