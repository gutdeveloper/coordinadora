import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { OrderUseCase } from "../../application/useCases/orders/OrderUseCase";

export class OrderController {
    constructor(
        private readonly orderUseCase: OrderUseCase
    ) { }


    public async createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const order = await this.orderUseCase.createOrder(req.body);
            res.status(StatusCodes.CREATED).json(order);
        } catch (error: any) {
            next(error);
        }
    }

    public async findOrdersByUserId(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.body.user.id;
            const orders = await this.orderUseCase.findOrdersByUserId(userId);
            res.status(StatusCodes.OK).json(orders);
        } catch (error) {
            next(error);
        }
    }
}
