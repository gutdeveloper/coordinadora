import express from 'express';
import { Request, Response, NextFunction } from 'express';
import { validateData } from '../middleware/validation.middleware';
import { createOrderSchema } from '../validators/createOrderSchema';
import { authMiddleware } from '../middleware/authMiddleware.middleware';
import { userIdSchema } from '../validators/userIdSchema';
import { paginationSchema } from '../validators/paginationSchema';
import { orderController } from '../dependencies';

const router = express.Router();

router.post('/orders', [validateData({ body: createOrderSchema }), authMiddleware], (req: Request, res: Response, next: NextFunction) => {
    orderController.createOrder(req, res, next);
});
router.get('/orders/:user_id', [validateData({ params: userIdSchema, query: paginationSchema }), authMiddleware], (req: Request, res: Response, next: NextFunction) => {
    orderController.findOrdersByUserId(req, res, next)
});

export default router;
