// File: routes/user.routes.js
import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  validateCreateUser,
  validateUpdateUser,
} from "../validators/user.validator.js";
import * as userController from "../controllers/user.controller.js";
import { findUserById } from '../middleware/user.middleware.js';

const router = express.Router();

const ktpStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/uploads/ktp";
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const user = req.user; 
    const sanitizedUserName = user.full_name.replace(/\s+/g, '-').toLowerCase();
    const uniqueSuffix = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `ktp-${sanitizedUserName}-${user.id}-${uniqueSuffix}${extension}`);
  },
});

const ktpFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Hanya file JPEG, PNG, JPG yang diizinkan!"), false);
  }
};

const upload = multer({
  storage: ktpStorage,
  fileFilter: ktpFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

// CRUD User
router.post("/", validateCreateUser, userController.create);
router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.put("/:id", validateUpdateUser, userController.update);
router.delete("/:id", userController.remove);
router.delete("/:id/softDelete", userController.softRemove);
router.patch("/:id/restore", userController.restore);
router.get("/deleted/all", userController.findDeleted);

// Route untuk upload KTP
router.post(
  "/:id/upload-ktp",
   findUserById,
  upload.single("photo_ktp"),
  userController.uploadKtp
);
router.get("/:id/ktp", userController.getKtp);

export default router;
