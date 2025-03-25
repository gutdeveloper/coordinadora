import express from 'express';
import { OrderController } from '../controllers/OrderController';
import { OrderUseCase } from '../../application/useCases/orders/OrderUseCase';
import { validateData } from '../middleware/validation.middleware';
import { createOrderSchema } from '../validators/createOrderSchema';
import { PrismaOrderRepository } from '../repositories/PrismaOrderRepository';
import { GoogleMapsService } from '../services/GoogleMapsService';

const router = express.Router();

const orderRepository = new PrismaOrderRepository();
const googleMapsService = new GoogleMapsService();
const orderUseCase = new OrderUseCase(orderRepository, googleMapsService);
const orderController = new OrderController(orderUseCase);


router.post('/orders', validateData(createOrderSchema), (req, res) => orderController.createOrder(req, res));

export default router;
