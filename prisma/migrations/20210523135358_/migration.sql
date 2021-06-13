/*
  Warnings:

  - You are about to drop the column `artists` on the `ModeWaitlistSpotify` table. All the data in the column will be lost.
  - You are about to drop the column `authorId` on the `ModeWaitlistSpotify` table. All the data in the column will be lost.
  - You are about to drop the column `cover` on the `ModeWaitlistSpotify` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `ModeWaitlistSpotify` table. All the data in the column will be lost.
  - You are about to drop the column `playkey` on the `ModeWaitlistSpotify` table. All the data in the column will be lost.
  - You are about to drop the column `start` on the `ModeWaitlistSpotify` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `ModeWaitlistSpotify` table. All the data in the column will be lost.
  - You are about to drop the column `trackId` on the `ModeWaitlistSpotify` table. All the data in the column will be lost.
  - You are about to drop the `ModeWaitlistSpotifyQueue` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModeWaitlistSpotifyQueue" DROP CONSTRAINT "ModeWaitlistSpotifyQueue_authorId_fkey";

-- DropForeignKey
ALTER TABLE "ModeWaitlistSpotifyQueue" DROP CONSTRAINT "ModeWaitlistSpotifyQueue_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ModeWaitlistSpotify" DROP CONSTRAINT "ModeWaitlistSpotify_authorId_fkey";

-- AlterTable
ALTER TABLE "ModeWaitlistSpotify" DROP COLUMN "artists",
DROP COLUMN "authorId",
DROP COLUMN "cover",
DROP COLUMN "duration",
DROP COLUMN "playkey",
DROP COLUMN "start",
DROP COLUMN "title",
DROP COLUMN "trackId",
ADD COLUMN     "itemId" TEXT,
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "channelId" DROP NOT NULL;

-- DropTable
DROP TABLE "ModeWaitlistSpotifyQueue";

-- CreateTable
CREATE TABLE "ModeWaitlistSpotifyTrack" (
    "id" TEXT NOT NULL,
    "artists" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeWaitlistSpotifyItem" (
    "id" TEXT NOT NULL,
    "start" INTEGER DEFAULT 0,
    "end" INTEGER,
    "skipped" BOOLEAN DEFAULT false,
    "canceled" BOOLEAN DEFAULT false,
    "trackId" TEXT,
    "channelId" TEXT,
    "authorId" TEXT,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotifyItem" ADD FOREIGN KEY ("trackId") REFERENCES "ModeWaitlistSpotifyTrack"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotifyItem" ADD FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotifyItem" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotify" ADD FOREIGN KEY ("itemId") REFERENCES "ModeWaitlistSpotifyItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotify" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
