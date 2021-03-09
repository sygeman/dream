/*
  Warnings:

  - Made the column `artists` on table `ModeWaitlistQueue` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ModeWaitlistQueue" ALTER COLUMN "artists" SET NOT NULL;
