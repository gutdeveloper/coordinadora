import { Order } from "../../../domain/entities/Order.entity";
import { NotFoundError } from "../../../domain/errors/NotFoundError";
import { OrderRepository } from "../../../domain/repositories/OrderRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { MapsService } from "../../../domain/services/MapsService";
import { SMSService } from "../../../domain/services/SMSService";
import { RedisCacheRepository } from "../../../infrastructure/cache/CacheRepository";
export class OrderUseCase {
    constructor(
        private orderRepository: OrderRepository,
        private userRepository: UserRepository,
        private mapsService: MapsService,
        private smsService: SMSService,
        private readonly cacheRepository: RedisCacheRepository
    ) { }

    async createOrder(order: Order): Promise<Pick<Order | any, "address">> {
        const { address, dimensions, name_recipient, phone_recipient, product_type, status, user_id, weight } = order;
        const newOrder = new Order(name_recipient, phone_recipient, address, user_id, weight, dimensions, product_type, status);
        const validateAddress = this.mapsService.validateAddress(address);
        if (!validateAddress) {
            throw new NotFoundError('Address not found');
        }
        const user = await this.userRepository.findUserById(user_id);
        if (!user) {
            throw new NotFoundError('User not found');
        }
        this.smsService.sendSMS(newOrder.phone_recipient, `Hi, ${newOrder.name_recipient} Order created with success`);
        return await this.orderRepository.create(newOrder);
    }

    async findOrdersByUserId(user_id: string): Promise<Partial<Order[]>> {
        const cacheKey = `orders:${user_id}`;
        const cachedOrders = await this.cacheRepository.get(cacheKey);
        if (cachedOrders) {
            return cachedOrders as Order[];
        }
        const orders = await this.orderRepository.getOrdersByUserId(user_id);
        if (!orders) {
            throw new NotFoundError('Orders not found');
        }
        await this.cacheRepository.set(cacheKey, orders, 3600);
        return orders;
    }
}