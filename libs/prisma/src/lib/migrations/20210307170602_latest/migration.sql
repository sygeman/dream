/*
  Warnings:

  - Made the column `trackId` on table `ModeWaitlistQueue` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `title` on table `ModeWaitlistQueue` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `ModeWaitlistQueue` required. The migration will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `ModeWaitlistQueue` required. The migration will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ModeWaitlistQueue" ALTER COLUMN "trackId" SET NOT NULL,
ALTER COLUMN "title" SET NOT NULL,
ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL;

-- CreateTable
CREATE TABLE "ModeWaitlist" (
    "id" TEXT NOT NULL,
    "trackId" TEXT,
    "title" TEXT,
    "cover" TEXT,
    "duration" INTEGER,
    "channelId" TEXT NOT NULL,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModeWaitlist" ADD FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlist" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
