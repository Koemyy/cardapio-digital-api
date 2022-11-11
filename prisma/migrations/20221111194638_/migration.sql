/*
  Warnings:

  - A unique constraint covering the columns `[col_email]` on the table `col_colaboradores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "col_colaboradores_col_email_key" ON "col_colaboradores"("col_email");
