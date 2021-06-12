-- CreateTable
CREATE TABLE "ModeWaitlistYoutubeVideo" (
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
CREATE TABLE "ModeWaitlistYoutubeItem" (
    "id" TEXT NOT NULL,
    "duration" INTEGER DEFAULT 0,
    "start" INTEGER DEFAULT 0,
    "end" INTEGER,
    "skipped" BOOLEAN DEFAULT false,
    "canceled" BOOLEAN DEFAULT false,
    "videoId" TEXT,
    "channelId" TEXT,
    "authorId" TEXT,
    "startedAt" TIMESTAMP(3),
    "endedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ModeWaitlistYoutube" (
    "id" TEXT NOT NULL,
    "itemId" TEXT,
    "channelId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ModeWaitlistYoutubeItem" ADD FOREIGN KEY ("videoId") REFERENCES "ModeWaitlistYoutubeVideo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistYoutubeItem" ADD FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistYoutubeItem" ADD FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistYoutube" ADD FOREIGN KEY ("itemId") REFERENCES "ModeWaitlistYoutubeItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ModeWaitlistYoutube" ADD FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
