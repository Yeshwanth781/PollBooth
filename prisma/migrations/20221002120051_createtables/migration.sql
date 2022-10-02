/*
  Warnings:

  - You are about to drop the `Polls` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Polls` DROP FOREIGN KEY `Polls_teamid_fkey`;

-- DropTable
DROP TABLE `Polls`;

-- CreateTable
CREATE TABLE `polls` (
    `pollid` INTEGER NOT NULL AUTO_INCREMENT,
    `teamid` INTEGER NOT NULL,
    `Options` JSON NULL,

    UNIQUE INDEX `polls_teamid_key`(`teamid`),
    PRIMARY KEY (`pollid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `polls` ADD CONSTRAINT `polls_teamid_fkey` FOREIGN KEY (`teamid`) REFERENCES `teams`(`teamid`) ON DELETE RESTRICT ON UPDATE CASCADE;
