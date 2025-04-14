/*
  Warnings:

  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `code` column on the `item` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "item" DROP CONSTRAINT "item_pkey",
DROP COLUMN "code",
ADD COLUMN     "code" SERIAL NOT NULL,
ADD CONSTRAINT "item_pkey" PRIMARY KEY ("code");
