/*
  Warnings:

  - You are about to drop the `_AdminUserToPermission` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_AdminUserToPermission` DROP FOREIGN KEY `_AdminUserToPermission_A_fkey`;

-- DropForeignKey
ALTER TABLE `_AdminUserToPermission` DROP FOREIGN KEY `_AdminUserToPermission_B_fkey`;

-- DropTable
DROP TABLE `_AdminUserToPermission`;

-- CreateTable
CREATE TABLE `admin_user_permissions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminUserId` VARCHAR(191) NOT NULL,
    `permissionId` INTEGER NOT NULL,

    UNIQUE INDEX `admin_user_permissions_adminUserId_permissionId_key`(`adminUserId`, `permissionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `admin_user_permissions` ADD CONSTRAINT `admin_user_permissions_adminUserId_fkey` FOREIGN KEY (`adminUserId`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `admin_user_permissions` ADD CONSTRAINT `admin_user_permissions_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
