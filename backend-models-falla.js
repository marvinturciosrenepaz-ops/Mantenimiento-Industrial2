const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Asset = require("./Asset");

const Falla = sequelize.define("Falla", {
  reporto: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  inicio: { type: DataTypes.DATE, allowNull: false }, // inicio registro
  fin: DataTypes.DATE,
  duracionMinutos: DataTypes.INTEGER,
  tecnico: DataTypes.STRING,
  repuestosUtilizados: DataTypes.TEXT,
  insumos: DataTypes.TEXT,
  observaciones: DataTypes.TEXT,
  fotosAntes: DataTypes.JSON, // array
  fotosDespues: DataTypes.JSON // array
});

Falla.belongsTo(Asset);
Asset.hasMany(Falla);

module.exports = Falla;
