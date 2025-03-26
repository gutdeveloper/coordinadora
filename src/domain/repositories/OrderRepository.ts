import { Order } from "../entities/Order.entity";

export interface OrderRepository {
    create(order: Order): Promise<Pick<Order, "address">>;
    getOrdersByUserId(user_id: string): Promise<Partial<Order[]>>;
}