const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const sequelize = require("./db");
const { PORT, UPLOAD_DIR } = require("./config");

const Asset = require("./models/Asset");
const Repuesto = require("./models/Repuesto");
const Orden = require("./models/Orden");
const Falla = require("./models/Falla");

// relaciones ya definidas dentro de models
const activosRouter = require("./routes/activos");
const repuestosRouter = require("./routes/repuestos");
const ordenesRouter = require("./routes/ordenes");
const fallasRouter = require("./routes/fallas");

const app = express();
app.use(cors());
app.use(express.json());

// carpeta de uploads
if(!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);
app.use("/uploads", express.static(path.join(__dirname, UPLOAD_DIR)));

// multer
const storage = multer.diskStorage({
  destination: (req,file,cb)=> cb(null, UPLOAD_DIR),
  filename: (req,file,cb)=> cb(null, Date.now()+"_"+file.originalname.replace(/\s+/g,"_"))
});
const upload = multer({ storage });

// endpoint subir fotos (retorna URLs)
app.post("/api/upload", upload.array("photos", 10), (req,res)=>{
  const files = req.files.map(f => `${req.protocol}://${req.get('host')}/uploads/${f.filename}`);
  res.json({ urls: files });
});

// rutas API
app.use("/api/activos", activosRouter);
app.use("/api/repuestos", repuestosRouter);
app.use("/api/ordenes", ordenesRouter);
app.use("/api/fallas", fallasRouter);

// sincronizar y levantar server
(async ()=>{
  try {
    await sequelize.authenticate();
    // sincroniza tablas (force:false -> no borra datos)
    await sequelize.sync({ alter: true });
    app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
  } catch (err){ console.error(err); process.exit(1); }
})();
