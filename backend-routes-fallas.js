const express = require("express");
const router = express.Router();
const Falla = require("../models/Falla");

// Reportar falla (inicia contador)
router.post("/", async (req,res)=>{
  const { assetId, reporto, descripcion, fotosAntes } = req.body;
  const f = await Falla.create({ AssetId: assetId, reporto, descripcion, inicio: new Date(), fotosAntes: fotosAntes || [], fotosDespues: [] });
  res.json(f);
});

// Finalizar falla (técnico registra y se calcula duración)
router.post("/:id/finalizar", async (req,res)=>{
  const f = await Falla.findByPk(req.params.id);
  if(!f) return res.status(404).json({error:"No existe"});
  const { tecnico, repuestosUtilizados, insumos, observaciones, fotosDespues } = req.body;
  f.fin = new Date();
  f.duracionMinutos = Math.round((f.fin - f.inicio) / 60000);
  f.tecnico = tecnico;
  f.repuestosUtilizados = repuestosUtilizados;
  f.insumos = insumos;
  f.observaciones = observaciones;
  f.fotosDespues = fotosDespues || [];
  await f.save();
  res.json(f);
});

// historial global
router.get("/", async (req,res)=>{
  const lista = await Falla.findAll();
  res.json(lista);
});

// borrar historial entry
router.delete("/:id", async (req,res)=>{
  const f = await Falla.findByPk(req.params.id);
  if(!f) return res.status(404).json({error:"No existe"});
  await f.destroy();
  res.json({ok:true});
});

module.exports = router;
