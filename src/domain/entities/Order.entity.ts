export enum OrderStatus {
    PENDING = 'PENDING',
}

export class Order {
    constructor(
        public address: string,
        public user_id: string,
        public weight: number,
        public dimensions: string,
        public product_type: string,
        public status: string = OrderStatus.PENDING,
        public notified: boolean = false,

    ) { }
    static create(address: string, user_id: string, weight: number, dimensions: string, product_type: string): Order {
        return new Order(address, user_id, weight, dimensions, product_type);
    }
}