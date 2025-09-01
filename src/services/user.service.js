import { Op } from "sequelize";
import db from "../models/index.js";
const { User } = db;

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const getAllUsers = async () => {
  return await User.findAll({
    attributes: [
      "id",
      "full_name",
      "nickname",
      "contribution",
      "phone_number",
    ],
  });
};

export const getUserById = async (id) => {
  return await User.findByPk(id);
};

export const updateUser = async (id, userData) => {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  return await user.update(userData);
};

export const deleteUser = async (id) => {
 const user = await User.findByPk(id, { paranoid: false });
  if (!user) return null;
  await user.destroy({ force: true }); 
  return { message: "Pengguna berhasil dihapus permanen." };
};

export const softDeleteUser = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  await user.destroy(); 
  return { message: "Pengguna berhasil dihapus (soft delete)." };
};

export const restoreUser = async (id) => {
  const user = await User.findByPk(id, { paranoid: false });
  if (!user) return null;
  await user.restore();
  return { message: "Pengguna berhasil dipulihkan.", user };
};

export const getDeletedUsers = async () => {
  return await User.findAll({
    where: {
      deletedAt: { [Op.ne]: null }, 
    },
    paranoid: false,
    attributes: [
      "id",
      "full_name",
      "nickname",
      "contribution",
      "phone_number",
      "deletedAt",
    ],
  });
};

export const updateUserKtp = async (user, filePath) => {
  return await user.update({ photo_ktp: filePath });
};