/*
  Warnings:

  - Added the required column `provider` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "provider" TEXT NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL,
ADD COLUMN     "accessToken" TEXT,
ADD COLUMN     "refreshToken" TEXT;
