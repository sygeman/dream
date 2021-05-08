/*
  Warnings:

  - Made the column `mode` on table `Channel` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Channel" ALTER COLUMN "mode" SET NOT NULL,
ALTER COLUMN "mode" SET DEFAULT E'NONE';
