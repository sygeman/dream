-- CreateEnum
CREATE TYPE "SpotifyModeStrategy" AS ENUM ('QUEUE', 'HOST');

-- AlterTable
ALTER TABLE "SpotifyMode" ADD COLUMN     "strategy" "SpotifyModeStrategy" DEFAULT E'QUEUE';
