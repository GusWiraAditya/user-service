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

const router = express.Router();

const ktpStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = "public/uploads/ktp";

    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const userId = req.params.id;
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `ktp-${userId}-${uniqueSuffix}${extension}`);
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
    fileSize: 1024 * 1024 * 5, // 5MB
  },
});

// CRUD User
router.post("/", validateCreateUser, userController.create);
router.get("/", userController.findAll);
router.get("/:id", userController.findOne);
router.put("/:id", validateUpdateUser, userController.update);
router.delete("/:id", userController.remove);

// Route untuk upload KTP
router.post(
  "/:id/upload-ktp",
  upload.single("photo_ktp"),
  userController.uploadKtp
);
router.get("/:id/ktp", userController.getKtp);

export default router;
