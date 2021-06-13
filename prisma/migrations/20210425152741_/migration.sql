-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('en_US', 'ru_RU');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "Locale" "Locale" DEFAULT E'en_US';
