import { Order } from "../../../domain/entities/Order.entity";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { MapsService } from "../../../domain/services/MapsService";

export class OrderUseCase {
    constructor(private orderRepository: OrderRepository, private mapsService: MapsService) { }

    async createOrder(order: Order): Promise<Order> {
        const { user_id, address, dimensions, product_type, weight } = order;
        const newOrder = new Order(address, user_id, weight, dimensions, product_type);
        const validateAddress = this.mapsService.validateAddress(address);
        if (!validateAddress) {
            throw new Error('Invalid address');
        }
        return await this.orderRepository.create(newOrder);
    }

    async getOrders(): Promise<Order[]> {
        return this.orderRepository.findAll();
    }
}