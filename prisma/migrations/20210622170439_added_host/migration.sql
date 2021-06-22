-- AlterTable
ALTER TABLE "SpotifyMode" ADD COLUMN     "hostId" TEXT;

-- AddForeignKey
ALTER TABLE "SpotifyMode" ADD FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
