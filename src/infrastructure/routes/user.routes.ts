import express from 'express';
import { registerUserSchema } from '../validators/registerUserSchema';
import { validateData } from '../middleware/validation.middleware';
import { userController } from '../dependencies';

const router = express.Router();

router.post('/users/register', validateData({ body: registerUserSchema }), (req, res, next) => userController.register(req, res, next));

export default router;
