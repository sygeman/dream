-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('User', 'Admin', 'Mod');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT E'User';
