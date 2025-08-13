// file: routes/feedback.routes.js

import express from 'express';
import { validateCreateFeedback, validateUpdateFeedback } from '../validators/feedback.validator.js';
import * as feedbackController from '../controllers/feedback.controller.js';

const router = express.Router();

router.post('/', validateCreateFeedback, feedbackController.create);
router.get('/', feedbackController.findAll);
router.get('/:id', feedbackController.findOne);
router.get('/user/:userId', feedbackController.findAllByUser);
router.put('/:id', validateUpdateFeedback, feedbackController.update);
router.delete('/:id', feedbackController.remove);

export default router;