import { PrismaUserRepository } from './repositories/PrismaUserRepository';
import { PrismaOrderRepository } from './repositories/PrismaOrderRepository';
import { BcryptService } from './services/BcryptService';
import { MailgunEmailService } from './services/MailgunService';
import { GoogleMapsService } from './services/GoogleMapsService';
import { MessageMediaService } from './services/MessageMediaService';
import { RedisCacheRepository } from './cache/CacheRepository';

import { UserUseCase } from '../application/useCases/user/UserUseCase';
import { OrderUseCase } from '../application/useCases/orders/OrderUseCase';

import { UserController } from './controllers/UserController';
import { OrderController } from './controllers/OrderController';
import { AuthController } from './controllers/AuthController';
import { AuthUseCase } from '../application/useCases/auth/AuthUseCase';
import { JwtService } from './services/JwtService';

const userRepository = new PrismaUserRepository();
const orderRepository = new PrismaOrderRepository();
const cacheRepository = new RedisCacheRepository();

const bcryptService = new BcryptService();
const emailService = new MailgunEmailService();
const googleMapsService = new GoogleMapsService();
const messageMediaService = new MessageMediaService();
const tokenService = new JwtService();

const userUseCase = new UserUseCase(userRepository, bcryptService, emailService);
const orderUseCase = new OrderUseCase(
    orderRepository,
    userRepository,
    googleMapsService,
    messageMediaService,
    cacheRepository
);
const authUseCase = new AuthUseCase(userRepository, bcryptService, tokenService);

const userController = new UserController(userUseCase);
const orderController = new OrderController(orderUseCase);
const authController = new AuthController(authUseCase)

export {
    userRepository,
    orderRepository,
    cacheRepository,
    bcryptService,
    emailService,
    googleMapsService,
    messageMediaService,
    userUseCase,
    orderUseCase,
    userController,
    orderController,
    authController,
    authUseCase
};
