import * as userService from "../services/user.service.js";
import { validationResult } from "express-validator";
import fs from 'fs/promises'; // Gunakan versi promises untuk async/await
import path from 'path';
import { fileURLToPath } from 'url';

export const create = async (req, res) => {
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      message: "Data berhasil ditambahkan",
      data: user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }
    res.status(200).json({
      data: user
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
   const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updated = await userService.updateUser(
      req.params.id,
      req.body
    );
    if (!updated) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }
    res.status(200).json({
      message: "Data berhasil diubah",
      data: updated
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const uploadKtp = async (req, res, next) => {
  try {
    const user = req.user; 

    if (!req.file) {
      return res.status(400).json({ message: "Tidak ada file yang diunggah." });
    }

    const oldPhotoUrl = user.photo_ktp;

    if (oldPhotoUrl) {
      try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        
        const oldPhotoPathname = new URL(oldPhotoUrl).pathname;
        const oldFilePath = path.join(__dirname, '..', '..', 'public', oldPhotoPathname);
        
        console.log(`[DEBUG] Menghapus file lama di: ${oldFilePath}`);
        
        await fs.unlink(oldFilePath);
        console.log(`[INFO] File lama ${oldFilePath} berhasil dihapus.`);

      } catch (deleteError) {
        if (deleteError.code !== 'ENOENT') {
          console.warn("Gagal menghapus file lama, tapi proses upload tetap dilanjutkan:", deleteError);
        }
      }
    }
    const newFileUrl = `${req.protocol}://${req.get('host')}/public/uploads/ktp/${req.file.filename}`;

    const updatedUser = await userService.updateUserKtp(user, newFileUrl);

    res.status(200).json({
      message: "Foto KTP berhasil diunggah dan foto lama (jika ada) telah dihapus.",
      data: {
        userId: user.id,
        filePath: newFileUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getKtp = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan." });
    }

    const filePath = user.photo_ktp;
    if (!filePath) {
      return res.status(404).json({ message: "KTP tidak ditemukan." });
    }

    res.status(200).json({
      message: "KTP ditemukan.",
      data: {
        userId: id,
        filePath: filePath,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server.", error: error.message });
  }
};