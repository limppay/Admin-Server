/*
  Warnings:

  - Added the required column `genero` to the `admin_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `admin_users` ADD COLUMN `genero` VARCHAR(191) NOT NULL;
