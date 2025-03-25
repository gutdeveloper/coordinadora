import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { OrderUseCase } from "../../application/useCases/orders/OrderUseCase";

export class OrderController {
    constructor(
        private readonly orderUseCase: OrderUseCase
    ) { }

    public async createOrder(req: Request, res: Response) {
        try {
            const order = await this.orderUseCase.createOrder(req.body);
            res.status(StatusCodes.CREATED).json(order);
        } catch (error) {
            console.log(error);
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
        }
    }

    // public async getOrders(req: Request, res: Response) {
    //     try {
    //         const orders = await this.orderUseCase.getOrders();
    //         res.status(200).json(orders);
    //     } catch (error) {
    //         console.log(error);
    //         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error" });
    //     }
}
