/*
  Warnings:

  - You are about to drop the `admin_user_permissions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `admin_user_permissions` DROP FOREIGN KEY `admin_user_permissions_adminUserId_fkey`;

-- DropForeignKey
ALTER TABLE `admin_user_permissions` DROP FOREIGN KEY `admin_user_permissions_permissionId_fkey`;

-- DropTable
DROP TABLE `admin_user_permissions`;

-- CreateTable
CREATE TABLE `_UserPermissions` (
    `A` VARCHAR(191) NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_UserPermissions_AB_unique`(`A`, `B`),
    INDEX `_UserPermissions_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_UserPermissions` ADD CONSTRAINT `_UserPermissions_A_fkey` FOREIGN KEY (`A`) REFERENCES `admin_users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserPermissions` ADD CONSTRAINT `_UserPermissions_B_fkey` FOREIGN KEY (`B`) REFERENCES `permissions`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
