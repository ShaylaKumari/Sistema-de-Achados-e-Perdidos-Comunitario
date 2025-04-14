/*
  Warnings:

  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "item" DROP CONSTRAINT "item_pkey",
ALTER COLUMN "code" SET DATA TYPE TEXT,
ADD CONSTRAINT "item_pkey" PRIMARY KEY ("code");
