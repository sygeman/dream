/*
  Warnings:

  - You are about to drop the column `chatId` on the `Channel` table. All the data in the column will be lost.
  - You are about to drop the `Chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChatMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CommunitySource` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_chatId_fkey";

-- DropForeignKey
ALTER TABLE "ChatMessage" DROP CONSTRAINT "ChatMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "CommunitySource" DROP CONSTRAINT "CommunitySource_communityId_fkey";

-- DropForeignKey
ALTER TABLE "CommunitySource" DROP CONSTRAINT "CommunitySource_sourceId_fkey";

-- DropForeignKey
ALTER TABLE "CommunitySource" DROP CONSTRAINT "CommunitySource_userId_fkey";

-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_chatId_fkey";

-- AlterTable
ALTER TABLE "Channel" DROP COLUMN "chatId";

-- CreateTable
CREATE TABLE "ChannelMessage" (
    "id" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "channelId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- DropTable
DROP TABLE "Chat";

-- DropTable
DROP TABLE "ChatMessage";

-- DropTable
DROP TABLE "CommunitySource";

-- DropTable
DROP TABLE "Source";

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
