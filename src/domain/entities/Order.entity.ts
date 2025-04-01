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

}   