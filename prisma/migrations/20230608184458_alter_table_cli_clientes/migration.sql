/*
  Warnings:

  - You are about to drop the column `cli_nome` on the `cli_clientes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cli_clientes" DROP COLUMN "cli_nome",
ADD COLUMN     "mes_id" SMALLSERIAL NOT NULL;

-- CreateTable
CREATE TABLE "mes_mesa" (
    "mes_id" SMALLSERIAL NOT NULL,

    CONSTRAINT "mes_pk" PRIMARY KEY ("mes_id")
);

-- AddForeignKey
ALTER TABLE "cli_clientes" ADD CONSTRAINT "cli_fk_mes_id" FOREIGN KEY ("mes_id") REFERENCES "mes_mesa"("mes_id") ON DELETE NO ACTION ON UPDATE CASCADE;
