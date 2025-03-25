import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { AuthUseCase } from '../../application/useCases/auth/AuthUseCase';
import { BcryptService } from '../services/BcryptService';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';
import { validateData } from '../middleware/validation.middleware';
import { loginUserSchema } from '../validators/loginUserSchema';
import { JwtService } from '../services/JwtService';

const router = express.Router();

const userRepository = new PrismaUserRepository();
const hashService = new BcryptService();
const tokenService = new JwtService();
const authUseCase = new AuthUseCase(userRepository, hashService, tokenService);
const authController = new AuthController(authUseCase);

router.post('/auth/login', validateData(loginUserSchema), (req, res) => authController.login(req, res));

export default router;
