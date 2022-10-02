/*
  Warnings:

  - You are about to drop the column `Options` on the `polls` table. All the data in the column will be lost.
  - Added the required column `pollname` to the `polls` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `polls` DROP COLUMN `Options`,
    ADD COLUMN `pollname` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `options` (
    `pollid` INTEGER NOT NULL,
    `optionid` INTEGER NOT NULL AUTO_INCREMENT,
    `optionname` VARCHAR(191) NOT NULL,
    `votes` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`optionid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `options` ADD CONSTRAINT `options_pollid_fkey` FOREIGN KEY (`pollid`) REFERENCES `polls`(`pollid`) ON DELETE RESTRICT ON UPDATE CASCADE;
