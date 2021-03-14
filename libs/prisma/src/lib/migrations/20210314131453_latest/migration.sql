/*
  Warnings:

  - You are about to drop the `ModeWaitlist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ModeWaitlistQueue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModeWaitlist" DROP CONSTRAINT "ModeWaitlist_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ModeWaitlist" DROP CONSTRAINT "ModeWaitlist_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ModeWaitlistQueue" DROP CONSTRAINT "ModeWaitlistQueue_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ModeWaitlistQueue" DROP CONSTRAINT "ModeWaitlistQueue_channelId_fkey";

-- DropTable
DROP TABLE "ModeWaitlist";

-- DropTable
DROP TABLE "ModeWaitlistQueue";

-- CreateTable
CREATE TABLE "ModeWaitlistSpotifyQueue" (
    "id" TEXT NOT NULL,
    "trackId" TEXT NOT NULL,
    "artists" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT,
    "duration" INTEGER NOT NULL,
    "channelId" TEXT NOT NULL,
    "authorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeWaitlistSpotify" (
    "id" TEXT NOT NULL,
    "trackId" TEXT,
    "artists" TEXT,
    "title" TEXT,
    "cover" TEXT,
    "duration" INTEGER,
    "channelId" TEXT NOT NULL,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start" TIMESTAMP(3) NOT NULL,
    "playkey" TEXT,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotifyQueue" ADD FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotifyQueue" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotify" ADD FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotify" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
