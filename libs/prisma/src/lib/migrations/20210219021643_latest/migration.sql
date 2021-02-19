/*
  Warnings:

  - You are about to drop the column `code` on the `Token` table. All the data in the column will be lost.
  - You are about to drop the column `accessToken` on the `Token` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Token" DROP COLUMN "code",
DROP COLUMN "accessToken";
