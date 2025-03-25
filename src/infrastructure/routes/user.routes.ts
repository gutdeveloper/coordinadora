import express from 'express';
import { UserController } from '../controllers/UserController';
import { registerUserSchema } from '../validators/registerUserSchema';
import { UserUseCase } from '../../application/useCases/user/UserUseCase';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';
import { validateData } from '../middleware/validation.middleware';
import { BcryptService } from '../services/BcryptService';
import { MailgunEmailService } from '../services/MailgunService';

const router = express.Router();

const userRepository = new PrismaUserRepository();
const bcrypt = new BcryptService();
const emailService = new MailgunEmailService();
const userUseCase = new UserUseCase(userRepository, bcrypt, emailService);
const userController = new UserController(userUseCase);

router.post('/users/register', validateData(registerUserSchema), (req, res) => userController.register(req, res));

export default router;
