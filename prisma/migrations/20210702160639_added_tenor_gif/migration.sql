-- AlterTable
ALTER TABLE "ChannelMessage" ADD COLUMN     "tenorGifId" TEXT;

-- CreateTable
CREATE TABLE "TenorGif" (
    "id" TEXT NOT NULL,
    "height" INTEGER NOT NULL,
    "width" INTEGER NOT NULL,
    "preview" TEXT NOT NULL,
    "video" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "TenorGif.id_unique" ON "TenorGif"("id");

-- AddForeignKey
ALTER TABLE "ChannelMessage" ADD FOREIGN KEY ("tenorGifId") REFERENCES "TenorGif"("id") ON DELETE SET NULL ON UPDATE CASCADE;
