// file: services/complaint.service.js

import db from "../models/index.js";
const { Complaint, User } = db; // Kita butuh model User untuk join

const userAttributes = ['full_name', 'email', 'phone_number'];

export const createComplaint = async (complaintData) => {
  return await Complaint.create(complaintData);
};

export const getAllComplaints = async () => {
  return await Complaint.findAll({
    include: [{
      model: User,
      attributes: userAttributes, // Ambil hanya kolom yang relevan dari User
    }],
    order: [['createdAt', 'DESC']], // Tampilkan yang terbaru dulu
  });
};

export const getComplaintById = async (id) => {
  return await Complaint.findByPk(id, {
    include: [{
      model: User,
      attributes: userAttributes,
    }]
  });
};

export const updateComplaint = async (id, complaintData) => {
  const complaint = await Complaint.findByPk(id);
  if (!complaint) {
    return null;
  }
  return await complaint.update(complaintData);
};

export const deleteComplaint = async (id) => {
  const complaint = await Complaint.findByPk(id);
  if (!complaint) {
    return null;
  }
  await complaint.destroy();
  return { message: "Keluhan berhasil dihapus." };
};