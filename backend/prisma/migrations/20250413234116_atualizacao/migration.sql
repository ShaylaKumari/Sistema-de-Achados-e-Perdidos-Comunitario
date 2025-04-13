/*
  Warnings:

  - You are about to drop the column `loacation` on the `item` table. All the data in the column will be lost.
  - Added the required column `location` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" DROP COLUMN "loacation",
ADD COLUMN     "location" TEXT NOT NULL;
