/*
  Warnings:

  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `teams` (
    `teamid` INTEGER NOT NULL AUTO_INCREMENT,
    `teamname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`teamid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `members` (
    `userid` INTEGER NOT NULL,
    `teamid` INTEGER NOT NULL,
    `owner` BOOLEAN NOT NULL,

    UNIQUE INDEX `members_userid_teamid_key`(`userid`, `teamid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Polls` (
    `pollid` INTEGER NOT NULL AUTO_INCREMENT,
    `teamid` INTEGER NOT NULL,
    `Options` JSON NOT NULL,

    UNIQUE INDEX `Polls_teamid_key`(`teamid`),
    PRIMARY KEY (`pollid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_userid_fkey` FOREIGN KEY (`userid`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `members` ADD CONSTRAINT `members_teamid_fkey` FOREIGN KEY (`teamid`) REFERENCES `teams`(`teamid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Polls` ADD CONSTRAINT `Polls_teamid_fkey` FOREIGN KEY (`teamid`) REFERENCES `teams`(`teamid`) ON DELETE RESTRICT ON UPDATE CASCADE;
