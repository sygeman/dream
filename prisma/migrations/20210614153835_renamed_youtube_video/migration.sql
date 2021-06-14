/*
  Warnings:

  - You are about to drop the `ModeWaitlistYoutubeVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ModeWaitlistYoutubeItem" DROP CONSTRAINT "ModeWaitlistYoutubeItem_videoId_fkey";

-- DropTable
DROP TABLE "ModeWaitlistYoutubeVideo";

-- CreateTable
CREATE TABLE "YoutubeVideo" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover" TEXT,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModeWaitlistYoutubeItem" ADD FOREIGN KEY ("videoId") REFERENCES "YoutubeVideo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
