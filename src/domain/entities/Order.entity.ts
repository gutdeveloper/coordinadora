export enum OrderStatus {
    PENDING = 'PENDING',
}

export enum ProductType {
    "DOCUMENTS",
    "STANDARD_PACKAGE",
    "ELECTRONICS",
    "FOOD",
    "MEDICAL",
    "FRAGILE",
    "HAZARDOUS",
    "HEAVY_CARGO",
}

export class Order {
    constructor(
        public name_recipient: string,
        public phone_recipient: string,
        public address: string,
        public user_id: string,
        public weight: number,
        public dimensions: string,
        public product_type: ProductType,
        public status: OrderStatus = OrderStatus.PENDING,
    ) { }
    static create(name_recipient: string, phone_recipient: string, address: string, user_id: string, weight: number, dimensions: string, product_type: ProductType): Order {
        if (!Object.values(ProductType).includes(product_type)) {
            throw new Error(`Invalid product type: ${product_type}`);
        }
        return new Order(name_recipient, phone_recipient, address, user_id, weight, dimensions, product_type);
    }
}   