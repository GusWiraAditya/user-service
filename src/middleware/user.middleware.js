import db from '../models/index.js';

export const findUserById = async (req, res, next) => {
  try {
    const user = await db.User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error("Error saat mencari user:", error);
    res.status(500).json({ message: "Terjadi kesalahan pada server." });
  }
};