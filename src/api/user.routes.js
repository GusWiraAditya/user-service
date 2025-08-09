import express from 'express';
import { validateCreateUser, validateUpdateUser } from '../validators/user.validator.js';
import * as userController from '../controllers/user.controller.js';

const router = express.Router();

// CRUD User
router.post('/', validateCreateUser, userController.create);
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.put('/:id', validateUpdateUser, userController.update);
router.delete('/:id', userController.remove);

export default router;