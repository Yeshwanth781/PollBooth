/*
  Warnings:

  - You are about to drop the column `owner` on the `members` table. All the data in the column will be lost.
  - Added the required column `creator` to the `teams` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `members` DROP COLUMN `owner`;

-- AlterTable
ALTER TABLE `teams` ADD COLUMN `creator` INTEGER NOT NULL;
