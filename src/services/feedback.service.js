// file: services/feedback.service.js

import db from "../models/index.js";
const { Feedback, User } = db;

const userAttributes = ['full_name', 'email'];

export const createFeedback = async (feedbackData) => {
  return await Feedback.create(feedbackData);
};

export const getAllFeedbacks = async () => {
  return await Feedback.findAll({
    include: [{
      model: User,
      attributes: userAttributes,
    }],
    order: [['createdAt', 'DESC']],
  });
};

export const getFeedbackById = async (id) => {
  return await Feedback.findByPk(id, {
    include: [{
      model: User,
      attributes: userAttributes,
    }]
  });
};

export const getFeedbacksByUserId = async (userId) => {
  return await Feedback.findAll({
    where: { user_id: userId },
    include: [{
      model: User,
      attributes: userAttributes,
    }],
    order: [['createdAt', 'DESC']],
  });
};

export const updateFeedback = async (id, feedbackData) => {
  const feedback = await Feedback.findByPk(id);
  if (!feedback) {
    return null;
  }
  return await feedback.update(feedbackData);
};

export const deleteFeedback = async (id) => {
  const feedback = await Feedback.findByPk(id);
  if (!feedback) {
    return null;
  }
  await feedback.destroy();
  return { message: "Masukan berhasil dihapus." };
};