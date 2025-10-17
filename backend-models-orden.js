const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const Asset = require("./Asset");

const Orden = sequelize.define("Orden", {
  tipo: DataTypes.STRING,          // Preventivo / Correctivo
  solicitadoPor: DataTypes.STRING,
  responsable: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  inicio: { type: DataTypes.DATE, allowNull: false }, // fecha/hora inicio
  fin: DataTypes.DATE,
  duracionMinutos: DataTypes.INTEGER,
  completadoBy: DataTypes.STRING,
  trabajosRealizados: DataTypes.TEXT,
  repuestosUtilizados: DataTypes.TEXT,
  insumos: DataTypes.TEXT,
  observaciones: DataTypes.TEXT,
  fotos: DataTypes.JSON // array de URLs
});

Orden.belongsTo(Asset);
Asset.hasMany(Orden);

module.exports = Orden;
