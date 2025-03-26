import { PROXY_AUTHENTICATION_REQUIRED } from 'http-status-codes';
import { z } from 'zod';

export const ProductTypeEnum = z.enum([
    "DOCUMENTS",
    "STANDARD_PACKAGE",
    "ELECTRONICS",
    "FOOD",
    "MEDICAL",
    "FRAGILE",
    "HAZARDOUS",
    "HEAVY_CARGO",
]);

export const createOrderSchema = z.object({
    address: z.string().min(5),
    phone_recipient: z.string().min(13),
    name_recipient: z.string().min(20),
    user_id: z.string(),
    weight: z.number().int().positive(),
    dimensions: z.string().min(5),
    product_type: ProductTypeEnum,
});
