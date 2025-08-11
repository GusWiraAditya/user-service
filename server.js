import 'dotenv/config';
import express from 'express';
import db from './src/models/index.js';
import userRoutes from './src/api/user.routes.js'; // 
import complaintRoutes from './src/api/complaint.routes.js';
import feedbackRoutes from './src/api/feedback.routes.js';


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

async function testDbConnection() {
  try {
    await db.sequelize.authenticate();
    console.log('✅ Koneksi ke database berhasil.');
  } catch (error) {
    console.error('❌ Gagal terhubung ke database:', error);
  }
}

app.get('/', (req, res) => {
  res.json({ message: 'Selamat datang di Users Service API.' });
});

app.use('/api/users', userRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/feedbacks', feedbackRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
  testDbConnection();
});