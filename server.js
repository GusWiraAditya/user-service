import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./src/models/index.js";
import userRoutes from "./src/api/user.routes.js";
import complaintRoutes from "./src/api/complaint.routes.js";
import feedbackRoutes from "./src/api/feedback.routes.js";
import { verifyInternalRequest } from "./src/middleware/auth.internal.middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  console.log(
    `✅ Request Diterima dari Gateway: Method=${req.method}, Path=${req.originalUrl}`
  );
  next();
});

app.use(verifyInternalRequest);

app.get("/", (req, res) => {
  res.json({ message: "Selamat datang di Users Service API." });
});

app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/feedbacks", feedbackRoutes);

app.use((req, res, next) => {
  if (req.path.startsWith("/public/uploads/")) {
    console.log(`❌ File tidak ditemukan: ${req.path}`);
    res.status(404).json({
      error: "File not found",
      path: req.path,
      message: "The requested file does not exist on the server.",
    });
  } else {
    next();
  }
});

async function testDbConnection() {
  try {
    await db.sequelize.authenticate();
    console.log("✅ Koneksi ke database berhasil.");
  } catch (error) {
    console.error("❌ Gagal terhubung ke database:", error);
  }
}
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, "public")}`);
  testDbConnection();
});
