/*
  Warnings:

  - The primary key for the `Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `category` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Item` table. All the data in the column will be lost.
  - Added the required column `categoriaId` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `codigo` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contato` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cor` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `localizacao` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Item_code_key";

-- AlterTable
ALTER TABLE "Item" DROP CONSTRAINT "Item_pkey",
DROP COLUMN "category",
DROP COLUMN "code",
DROP COLUMN "color",
DROP COLUMN "contact",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "location",
DROP COLUMN "name",
DROP COLUMN "photo",
ADD COLUMN     "categoriaId" INTEGER NOT NULL,
ADD COLUMN     "codigo" TEXT NOT NULL,
ADD COLUMN     "contato" TEXT NOT NULL,
ADD COLUMN     "cor" TEXT NOT NULL,
ADD COLUMN     "foto" TEXT,
ADD COLUMN     "localizacao" TEXT NOT NULL,
ADD COLUMN     "nome" TEXT NOT NULL,
ADD COLUMN     "usuarioId" INTEGER NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "Item_pkey" PRIMARY KEY ("codigo");

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
