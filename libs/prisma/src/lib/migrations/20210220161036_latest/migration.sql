/*
  Warnings:

  - Made the column `ownerId` on table `Community` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Community" ALTER COLUMN "ownerId" SET NOT NULL;
