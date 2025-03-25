import { Order } from '../../domain/entities/Order.entity';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { PrismaClient, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaOrderRepository implements OrderRepository {
    async create(order: Order): Promise<Order> {
        try {
            return await prisma.order.create({
                data: { 
                    ...order, 
                    product_type: order.product_type as ProductType 
                },
                select: { id: true, address: true, user_id: true, weight: true, dimensions: true, product_type: true, status: true, notified: true },
            });
        } catch (error) {
            console.log(error);
            throw new Error("Error creating order");
        }
    }
    async findAll() {
        try {
            return await prisma.order.findMany();
        } catch (error) {
            console.log(error);
            throw new Error("Error finding orders");
        }
    }
}