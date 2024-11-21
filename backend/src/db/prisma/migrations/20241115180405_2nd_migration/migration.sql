/*
  Warnings:

  - Added the required column `statis` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Element" ADD COLUMN     "statis" BOOLEAN NOT NULL;
