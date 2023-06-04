-- AlterTable
CREATE SEQUENCE ped_pedidos_ped_id_seq;
ALTER TABLE "ped_pedidos" ALTER COLUMN "ped_id" SET DEFAULT nextval('ped_pedidos_ped_id_seq');
ALTER SEQUENCE ped_pedidos_ped_id_seq OWNED BY "ped_pedidos"."ped_id";
