// file: validators/complaint.validator.js

import { body } from 'express-validator';
import db from '../models/index.js';
const { User } = db;

// Aturan validasi untuk membuat Complaint baru
export const validateCreateComplaint = [
  body('user_id')
    .notEmpty().withMessage('User ID tidak boleh kosong.')
    .isUUID().withMessage('Format User ID tidak valid.')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        return Promise.reject('User dengan ID tersebut tidak ditemukan.');
      }
    }),
  
  body('service_id')
    .notEmpty().withMessage('Service ID tidak boleh kosong.')
    .isInt().withMessage('Service ID harus berupa angka.'),
  
  body('service_name').notEmpty().withMessage('Nama layanan tidak boleh kosong.'),
  body('description').notEmpty().withMessage('Deskripsi keluhan tidak boleh kosong.'),
  body('partner_name').notEmpty().withMessage('Nama partner tidak boleh kosong.'),
];

// Aturan validasi untuk update Complaint
export const validateUpdateComplaint = [
  // Biasanya, hanya deskripsi yang boleh diubah, tapi kita buat fleksibel
  body('service_name').optional().notEmpty().withMessage('Nama layanan tidak boleh kosong.'),
  body('description').optional().notEmpty().withMessage('Deskripsi keluhan tidak boleh kosong.'),
  body('partner_name').optional().notEmpty().withMessage('Nama partner tidak boleh kosong.'),
];