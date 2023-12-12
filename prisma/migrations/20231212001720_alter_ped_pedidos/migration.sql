/*
  Warnings:

  - You are about to alter the column `ped_observacao` on the `ped_pedidos` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(300)`.

*/
-- AlterTable
ALTER TABLE "ped_pedidos" ALTER COLUMN "ped_observacao" SET DATA TYPE VARCHAR(300);
