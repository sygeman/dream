/*
  Warnings:

  - You are about to drop the column `userId` on the `ModeWaitlistSpotify` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModeWaitlistSpotify" DROP CONSTRAINT "ModeWaitlistSpotify_userId_fkey";

-- AlterTable
ALTER TABLE "ModeWaitlistSpotify" DROP COLUMN "userId";
