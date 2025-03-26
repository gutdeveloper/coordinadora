/*
  Warnings:

  - You are about to alter the column `product_type` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `product_type` ENUM('DOCUMENTS', 'STANDARD_PACKAGE', 'ELECTRONICS', 'FOOD', 'MEDICAL', 'FRAGILE', 'HAZARDOUS', 'HEAVY_CARGO') NOT NULL;
