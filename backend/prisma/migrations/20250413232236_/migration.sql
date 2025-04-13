/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `categoria` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "categoria_name_key" ON "categoria"("name");
