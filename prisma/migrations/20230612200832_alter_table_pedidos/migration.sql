/*
  Warnings:

  - Added the required column `ped_quantidade` to the `ped_pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ped_pedidos" ADD COLUMN     "ped_quantidade" INTEGER NOT NULL;
