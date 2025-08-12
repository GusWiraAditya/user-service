// file: services/user.service.js

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
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }
  await user.destroy();
  return { message: "Pengguna berhasil dihapus." };
};
