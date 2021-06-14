/*
  Warnings:

  - You are about to drop the `ModeWaitlistSpotifyTrack` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModeWaitlistSpotifyItem" DROP CONSTRAINT "ModeWaitlistSpotifyItem_trackId_fkey";

-- DropTable
DROP TABLE "ModeWaitlistSpotifyTrack";

-- CreateTable
CREATE TABLE "SpotifyTrack" (
    "id" TEXT NOT NULL,
    "artists" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModeWaitlistSpotifyItem" ADD FOREIGN KEY ("trackId") REFERENCES "SpotifyTrack"("id") ON DELETE SET NULL ON UPDATE CASCADE;
