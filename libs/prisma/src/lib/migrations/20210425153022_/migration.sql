/*
  Warnings:

  - You are about to drop the column `Locale` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "Locale",
ADD COLUMN     "locale" "Locale" DEFAULT E'en_US';
