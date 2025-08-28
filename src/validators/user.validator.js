import { body } from "express-validator";
import db from "../models/index.js";
const { User } = db;

const GENDERS = ["pria", "wanita", "lainnya"];
const CONTRIBUTIONS = [
  "vvip",
  "vip",
  "karyawan dari partner",
  "pelanggan biasa",
  "supporter",
];

// Aturan validasi untuk membuat User baru
export const validateCreateUser = [
  body("credential_id")
    .notEmpty()
    .withMessage("Credential ID tidak boleh kosong."),

  body("nickname").notEmpty().withMessage("Nama panggilan tidak boleh kosong."),

  body("phone_number")
    .notEmpty()
    .withMessage("Nomor telepon tidak boleh kosong.")
    .custom(async (value) => {
      const user = await User.findOne({ where: { phone_number: value } });
      if (user) return Promise.reject("Nomor telepon sudah terdaftar.");
    }),

  body("email")
    .notEmpty()
    .withMessage("Email tidak boleh kosong.")
    .isEmail()
    .withMessage("Format email tidak valid.")
    .custom(async (value) => {
      const user = await User.findOne({ where: { email: value } });
      if (user) return Promise.reject("Email sudah terdaftar.");
    }),

  body("full_name").notEmpty().withMessage("Nama lengkap tidak boleh kosong."),

  body("gender").isIn(GENDERS).withMessage("Gender tidak valid."),

  body("date_of_birth")
    .isISO8601()
    .toDate()
    .withMessage("Format tanggal lahir tidak valid (YYYY-MM-DD)."),

  body("contribution")
    .isIn(CONTRIBUTIONS)
    .withMessage("Tipe kontribusi tidak valid."),

  // Semua field di bawah opsional
  body("no_nik")
    .optional()
    .isLength({ min: 16, max: 16 })
    .withMessage("NIK harus 16 digit.")
    .custom(async (value) => {
      if (value) {
        const user = await User.findOne({ where: { no_nik: value } });
        if (user) return Promise.reject("NIK sudah terdaftar.");
      }
    }),

  body("photo_ktp").optional(),

  body("address")
    .optional()
    .notEmpty()
    .withMessage("Alamat tidak boleh kosong."),
  body("village")
    .optional()
    .notEmpty()
    .withMessage("Desa/Kelurahan tidak boleh kosong."),
  body("subdistrict")
    .optional()
    .notEmpty()
    .withMessage("Kecamatan tidak boleh kosong."),
  body("post_code")
    .optional()
    .notEmpty()
    .withMessage("Kode pos tidak boleh kosong."),
];

// Aturan validasi untuk update User
export const validateUpdateUser = [
  // Semua field dibuat opsional
  body("credential_id")
    .optional()
    .notEmpty()
    .withMessage("Credential ID tidak boleh kosong."),
  body("nickname")
    .optional()
    .notEmpty()
    .withMessage("Nama panggilan tidak boleh kosong."),
  body("phone_number")
    .optional()
    .isMobilePhone("id-ID")
    .withMessage("Format nomor telepon tidak valid."),
  body("email").optional().isEmail().withMessage("Format email tidak valid."),
  body("full_name")
    .optional()
    .notEmpty()
    .withMessage("Nama lengkap tidak boleh kosong."),
  body("gender").optional().isIn(GENDERS).withMessage("Gender tidak valid."),
  body("date_of_birth")
    .optional()
    .isISO8601()
    .toDate()
    .withMessage("Format tanggal lahir tidak valid."),
  body("address")
    .optional()
    .notEmpty()
    .withMessage("Alamat tidak boleh kosong."),
  body("contribution")
    .optional()
    .isIn(CONTRIBUTIONS)
    .withMessage("Tipe kontribusi tidak valid."),
  body("village")
    .optional()
    .notEmpty()
    .withMessage("Desa/Kelurahan tidak boleh kosong."),
  body("subdistrict")
    .optional()
    .notEmpty()
    .withMessage("Kecamatan tidak boleh kosong."),
  body("post_code")
    .optional()
    .notEmpty()
    .withMessage("Kode pos tidak boleh kosong."),
  body("no_nik")
    .optional()
    .isLength({ min: 16, max: 16 })
    .withMessage("NIK harus 16 digit."),
  // body("photo_ktp").optional().isURL().withMessage("URL foto KTP tidak valid."),
  body("photo_ktp").optional(),
];
