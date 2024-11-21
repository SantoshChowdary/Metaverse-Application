/*
  Warnings:

  - You are about to drop the column `statis` on the `Element` table. All the data in the column will be lost.
  - Added the required column `static` to the `Element` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Element" DROP COLUMN "statis",
ADD COLUMN     "static" BOOLEAN NOT NULL;
