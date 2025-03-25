import { Order } from "../entities/Order.entity";

export interface OrderRepository {
    create(order: Order): Promise<Order>;
    findAll(): Promise<Order[]>;
}