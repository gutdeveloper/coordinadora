import { Order } from '../../domain/entities/Order.entity';
import { OrderRepository } from '../../domain/repositories/OrderRepository';
import { PrismaClient, ProductType } from "@prisma/client";

const prisma = new PrismaClient();

export class PrismaOrderRepository implements OrderRepository {
    async create(order: Order): Promise<Pick<Order, "address">> {
        try {
            const createdOrder = await prisma.order.create({
                data: {
                    ...order,
                    product_type: order.product_type as unknown as ProductType
                },
                select: { address: true }
            });
            return createdOrder;
        } catch (error) {
            console.log(error);
            throw new Error("Error creating order");
        }
    }
    async getOrdersByUserId(user_id: string): Promise<Partial<Order[]>> {
        try {
            const orders = await prisma.order.findMany({
                where: {
                    user_id
                },
                select: {
                    id: true,
                    address: true,
                    dimensions: true,
                    name_recipient: true,
                    phone_recipient: true,
                    product_type: true,
                    status: true,
                    weight: true,
                    user_id: true,
                }
            });
            return orders.map(order => ({
                ...order,
                product_type: order.product_type as unknown as Order['product_type'],
                status: order.status as unknown as Order['status']
            }));
        } catch (error) {
            console.log(error);
            throw new Error("Error getting orders");
        }
    }
}