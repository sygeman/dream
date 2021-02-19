/*
  Warnings:

  - You are about to drop the `Instance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_instanceId_fkey";

-- AlterTable
ALTER TABLE "Connection" ALTER COLUMN "instanceId" DROP NOT NULL;

-- DropTable
DROP TABLE "Instance";
