-- AlterTable
ALTER TABLE "Connection" ADD COLUMN     "channelId" TEXT;

-- AddForeignKey
ALTER TABLE "Connection" ADD FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
