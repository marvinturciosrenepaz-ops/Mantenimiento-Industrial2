const express = require("express");
const router = express.Router();
const Asset = require("../models/Asset");
const Repuesto = require("../models/Repuesto");

router.get("/", async (req,res) => {
  const activos = await Asset.findAll({ include: Repuesto });
  res.json(activos);
});

router.post("/", async (req,res) => {
  const data = req.body;
  const activo = await Asset.create(data);
  res.json(activo);
});

router.put("/:id", async (req,res) => {
  const activo = await Asset.findByPk(req.params.id);
  if(!activo) return res.status(404).json({error:"No encontrado"});
  await activo.update(req.body);
  res.json(activo);
});

router.delete("/:id", async (req,res) => {
  const activo = await Asset.findByPk(req.params.id);
  if(!activo) return res.status(404).json({error:"No encontrado"});
  await activo.destroy();
  res.json({ok:true});
});

module.exports = router;
