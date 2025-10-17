const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Asset = require("./Asset");

const Repuesto = sequelize.define("Repuesto", {
  name: { type: DataTypes.STRING, allowNull: false },
  quantity: { type: DataTypes.INTEGER, defaultValue: 0 }
});

Repuesto.belongsTo(Asset);
Asset.hasMany(Repuesto);

module.exports = Repuesto;
