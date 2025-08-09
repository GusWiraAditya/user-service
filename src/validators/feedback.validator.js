// file: validators/feedback.validator.js

import { body } from 'express-validator';
import db from '../models/index.js';
const { User } = db;

// Aturan validasi untuk membuat Feedback baru
export const validateCreateFeedback = [
  body('user_id')
    .notEmpty().withMessage('User ID tidak boleh kosong.')
    .isUUID().withMessage('Format User ID tidak valid.')
    .custom(async (value) => {
      const user = await User.findByPk(value);
      if (!user) {
        return Promise.reject('User dengan ID tersebut tidak ditemukan.');
      }
    }),
  
  body('partner_name').notEmpty().withMessage('Nama partner tidak boleh kosong.'),
  body('description').notEmpty().withMessage('Deskripsi masukan tidak boleh kosong.'),
  
  body('rating')
    .notEmpty().withMessage('Rating tidak boleh kosong.')
    .isInt({ min: 1, max: 5 }).withMessage('Rating harus berupa angka antara 1 sampai 5.'),
];

// Aturan validasi untuk update Feedback
export const validateUpdateFeedback = [
  // Biasanya hanya deskripsi dan rating yang boleh diubah
  body('description').optional().notEmpty().withMessage('Deskripsi masukan tidak boleh kosong.'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 }).withMessage('Rating harus berupa angka antara 1 sampai 5.'),
];