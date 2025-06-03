/*
  Warnings:

  - You are about to drop the column `phone` on the `Client` table. All the data in the column will be lost.
  - Added the required column `status` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Client` DROP COLUMN `phone`,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;
