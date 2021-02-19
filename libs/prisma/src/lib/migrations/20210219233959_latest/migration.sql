/*
  Warnings:

  - Made the column `communityId` on table `Channel` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `channelId` on table `Connection` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "communityId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Connection" ALTER COLUMN "channelId" SET NOT NULL;
