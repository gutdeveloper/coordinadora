/*
  Warnings:

  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `email_verified` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'USER',
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;
