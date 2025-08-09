// file: routes/complaint.routes.js

import express from 'express';
import { validateCreateComplaint, validateUpdateComplaint } from '../validators/complaint.validator.js';
import * as complaintController from '../controllers/complaint.controller.js';

const router = express.Router();

router.post('/', validateCreateComplaint, complaintController.create);
router.get('/', complaintController.findAll);
router.get('/:id', complaintController.findOne);
router.put('/:id', validateUpdateComplaint, complaintController.update);
router.delete('/:id', complaintController.remove);

export default router;