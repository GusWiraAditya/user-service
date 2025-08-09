// file: controllers/feedback.controller.js

import * as feedbackService from "../services/feedback.service.js";
import { validationResult } from "express-validator";

export const create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const feedback = await feedbackService.createFeedback(req.body);
    res.status(201).json({
      message: "Masukan berhasil ditambahkan",
      data: feedback
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findAll = async (req, res) => {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();
    res.status(200).json({ data: feedbacks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const findOne = async (req, res) => {
  try {
    const feedback = await feedbackService.getFeedbackById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: "Masukan tidak ditemukan." });
    }
    res.status(200).json({ data: feedback });
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
    const updated = await feedbackService.updateFeedback(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "Masukan tidak ditemukan." });
    }
    res.status(200).json({
      message: "Masukan berhasil diubah",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    const result = await feedbackService.deleteFeedback(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Masukan tidak ditemukan." });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};