/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoriaId` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `codigo` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `contato` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `cor` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `foto` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `localizacao` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `Item` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contact` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `loacation` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_usuarioId_fkey";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "categoriaId",
DROP COLUMN "codigo",
DROP COLUMN "contato",
DROP COLUMN "cor",
DROP COLUMN "foto",
DROP COLUMN "localizacao",
DROP COLUMN "nome",
DROP COLUMN "usuarioId",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "code" INTEGER NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "contact" TEXT NOT NULL,
ADD COLUMN     "loacation" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT,
ADD COLUMN     "userId" INTEGER NOT NULL,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("code");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
