/*
  Warnings:

  - You are about to drop the `_UserPermissions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `admin_users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_UserPermissions` DROP FOREIGN KEY `_UserPermissions_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserPermissions` DROP FOREIGN KEY `_UserPermissions_B_fkey`;

-- DropTable
DROP TABLE `_UserPermissions`;

-- DropTable
DROP TABLE `admin_users`;

-- DropTable
DROP TABLE `permissions`;

-- CreateTable
CREATE TABLE `Usuarios` (
    `id` VARCHAR(191) NOT NULL,
    `Nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `Nascimento` DATETIME(3) NOT NULL,
    `genero` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `estado` VARCHAR(191) NOT NULL,
    `Status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `permissao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
