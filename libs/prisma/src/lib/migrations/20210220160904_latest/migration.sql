-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "ownerId" TEXT;

-- AddForeignKey
ALTER TABLE "Community" ADD FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
