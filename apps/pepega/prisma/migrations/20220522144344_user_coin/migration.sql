/*
  Warnings:

  - You are about to drop the `UserCoins` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "UserCoinAction" AS ENUM ('INCREASE', 'DECREASE');

-- DropForeignKey
ALTER TABLE "UserCoins" DROP CONSTRAINT "UserCoins_clipId_fkey";

-- DropForeignKey
ALTER TABLE "UserCoins" DROP CONSTRAINT "UserCoins_userId_fkey";

-- DropTable
DROP TABLE "UserCoins";

-- DropEnum
DROP TYPE "UserCoinsAction";

-- CreateTable
CREATE TABLE "UserCoin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clipId" TEXT NOT NULL,
    "action" "UserCoinAction" NOT NULL,
    "coins" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserCoin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserCoin" ADD CONSTRAINT "UserCoin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCoin" ADD CONSTRAINT "UserCoin_clipId_fkey" FOREIGN KEY ("clipId") REFERENCES "Clip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
