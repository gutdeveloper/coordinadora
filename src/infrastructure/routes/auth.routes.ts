import express from 'express';
import { validateData } from '../middleware/validation.middleware';
import { loginUserSchema } from '../validators/loginUserSchema';
import { authController } from '../dependencies';

const router = express.Router();

router.post('/auth/login', validateData({ body: loginUserSchema }), (req, res, next) => authController.login(req, res, next));

export default router;
