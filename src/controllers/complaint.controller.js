// file: controllers/complaint.controller.js

import * as complaintService from "../services/complaint.service.js";
import { validationResult } from "express-validator";

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const complaint = await complaintService.createComplaint(req.body);
    res.status(201).json({
      message: "Keluhan berhasil ditambahkan",
      data: complaint,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const complaints = await complaintService.getAllComplaints();
    res.status(200).json({ data: complaints });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const complaint = await complaintService.getComplaintById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "Keluhan tidak ditemukan." });
    }
    res.status(200).json({ data: complaint });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findAllByUser = async (req, res) => {
  try {
    const complaints = await complaintService.getAllByUser(req.params.userId);
    res.status(200).json({ data: complaints });
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
    const updated = await complaintService.updateComplaint(
      req.params.id,
      req.body
    );
    if (!updated) {
      return res.status(404).json({ message: "Keluhan tidak ditemukan." });
    }
    res.status(200).json({
      message: "Keluhan berhasil diubah",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await complaintService.deleteComplaint(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Keluhan tidak ditemukan." });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
