const express = require("express");
const router = express.Router();
const Orden = require("../models/Orden");
const Asset = require("../models/Asset");

// Crear orden (inicio automático)
router.post("/", async (req,res)=>{
  const { assetId, tipo, solicitadoPor, responsable, descripcion } = req.body;
  const orden = await Orden.create({
    tipo, solicitadoPor, responsable, descripcion, inicio: new Date(), AssetId: assetId, fotos: []
  });
  res.json(orden);
});

// Finalizar orden (complete)
router.post("/:id/finalizar", async (req,res)=>{
  const orden = await Orden.findByPk(req.params.id);
  if(!orden) return res.status(404).json({error:"No existe"});
  const { completadoBy, trabajosRealizados, repuestosUtilizados, insumos, observaciones, fotos } = req.body;
  orden.fin = new Date();
  orden.duracionMinutos = Math.round( (orden.fin - orden.inicio) / 60000 );
  orden.completadoBy = completadoBy;
  orden.trabajosRealizados = trabajosRealizados;
  orden.repuestosUtilizados = repuestosUtilizados;
  orden.insumos = insumos;
  orden.observaciones = observaciones;
  orden.fotos = fotos || [];
  await orden.save();
  res.json(orden);
});

// obtener ordenes por asset
router.get("/asset/:assetId", async (req,res)=>{
  const ords = await Orden.findAll({ where: { AssetId: req.params.assetId } });
  res.json(ords);
});

module.exports = router;
