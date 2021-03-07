/*
  Warnings:

  - You are about to drop the `CommunitySource` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CommunitySource" DROP CONSTRAINT "CommunitySource_communityId_fkey";

-- DropForeignKey
ALTER TABLE "CommunitySource" DROP CONSTRAINT "CommunitySource_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "CommunitySource" DROP CONSTRAINT "CommunitySource_userId_fkey";

-- DropTable
DROP TABLE "CommunitySource";
