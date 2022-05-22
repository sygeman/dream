/*
  Warnings:

  - You are about to drop the column `channelId` on the `Connection` table. All the data in the column will be lost.
  - You are about to drop the `Channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChannelMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Community` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Emoji` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpotifyMode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpotifyModeItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SpotifyTrack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TenorGif` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TwitchMode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YoutubeMode` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YoutubeModeItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `YoutubeVideo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Channel" DROP CONSTRAINT "Channel_communityId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelMessage" DROP CONSTRAINT "ChannelMessage_channelId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelMessage" DROP CONSTRAINT "ChannelMessage_tenorGifId_fkey";

-- DropForeignKey
ALTER TABLE "ChannelMessage" DROP CONSTRAINT "ChannelMessage_userId_fkey";

-- DropForeignKey
ALTER TABLE "Community" DROP CONSTRAINT "Community_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Connection" DROP CONSTRAINT "Connection_channelId_fkey";

-- DropForeignKey
ALTER TABLE "Emoji" DROP CONSTRAINT "Emoji_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Emoji" DROP CONSTRAINT "Emoji_communityId_fkey";

-- DropForeignKey
ALTER TABLE "SpotifyMode" DROP CONSTRAINT "SpotifyMode_channelId_fkey";

-- DropForeignKey
ALTER TABLE "SpotifyMode" DROP CONSTRAINT "SpotifyMode_hostId_fkey";

-- DropForeignKey
ALTER TABLE "SpotifyMode" DROP CONSTRAINT "SpotifyMode_itemId_fkey";

-- DropForeignKey
ALTER TABLE "SpotifyModeItem" DROP CONSTRAINT "SpotifyModeItem_authorId_fkey";

-- DropForeignKey
ALTER TABLE "SpotifyModeItem" DROP CONSTRAINT "SpotifyModeItem_channelId_fkey";

-- DropForeignKey
ALTER TABLE "SpotifyModeItem" DROP CONSTRAINT "SpotifyModeItem_trackId_fkey";

-- DropForeignKey
ALTER TABLE "TwitchMode" DROP CONSTRAINT "TwitchMode_channelId_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeMode" DROP CONSTRAINT "YoutubeMode_channelId_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeMode" DROP CONSTRAINT "YoutubeMode_itemId_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeModeItem" DROP CONSTRAINT "YoutubeModeItem_authorId_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeModeItem" DROP CONSTRAINT "YoutubeModeItem_channelId_fkey";

-- DropForeignKey
ALTER TABLE "YoutubeModeItem" DROP CONSTRAINT "YoutubeModeItem_videoId_fkey";

-- AlterTable
ALTER TABLE "Connection" DROP COLUMN "channelId";

-- DropTable
DROP TABLE "Channel";

-- DropTable
DROP TABLE "ChannelMessage";

-- DropTable
DROP TABLE "Community";

-- DropTable
DROP TABLE "Emoji";

-- DropTable
DROP TABLE "SpotifyMode";

-- DropTable
DROP TABLE "SpotifyModeItem";

-- DropTable
DROP TABLE "SpotifyTrack";

-- DropTable
DROP TABLE "TenorGif";

-- DropTable
DROP TABLE "TwitchMode";

-- DropTable
DROP TABLE "YoutubeMode";

-- DropTable
DROP TABLE "YoutubeModeItem";

-- DropTable
DROP TABLE "YoutubeVideo";

-- DropEnum
DROP TYPE "ChannelMode";

-- DropEnum
DROP TYPE "SpotifyModeStrategy";
