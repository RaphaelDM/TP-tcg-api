/*
  Warnings:

  - You are about to alter the column `lastBooster` on the `user` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `lastBooster` INTEGER NULL;
