/*
  Warnings:

  - You are about to drop the column `notified` on the `orders` table. All the data in the column will be lost.
  - Added the required column `name_recipient` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_recipient` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `notified`,
    ADD COLUMN `name_recipient` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_recipient` VARCHAR(191) NOT NULL;
