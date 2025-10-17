const express = require("express");
const router = express.Router();
const Repuesto = require("../models/Repuesto");
const Asset = require("../models/Asset");

router.post("/", async (req,res)=>{
  const { assetId, name, quantity } = req.body;
  const rep = await Repuesto.create({ name, quantity, AssetId: assetId });
  res.json(rep);
});

router.put("/:id/adjust", async (req,res)=>{
  const rep = await Repuesto.findByPk(req.params.id);
  if(!rep) return res.status(404).json({error:"No existe"});
  const { delta } = req.body;
  rep.quantity = Math.max(0, rep.quantity + (delta || 0));
  await rep.save();
  res.json(rep);
});

router.delete("/:id", async (req,res)=>{
  const rep = await Repuesto.findByPk(req.params.id);
  if(!rep) return res.status(404).json({error:"No existe"});
  await rep.destroy();
  res.json({ok:true});
});

module.exports = router;
