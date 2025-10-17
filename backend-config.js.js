module.exports = {
  PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL || "postgres://postgres:password@localhost:5432/mantenimiento",
  UPLOAD_DIR: process.env.UPLOAD_DIR || "uploads"
};
