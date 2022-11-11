-- CreateTable
CREATE TABLE "amb_ambientes" (
    "amb_id" SMALLSERIAL NOT NULL,
    "amb_nome" VARCHAR(50) NOT NULL,
    "amb_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "amb_pk" PRIMARY KEY ("amb_id")
);

-- CreateTable
CREATE TABLE "car_cardapios" (
    "car_id" SMALLSERIAL NOT NULL,
    "car_nome" VARCHAR(50) NOT NULL,
    "car_descricao" VARCHAR(300),
    "car_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "car_pk" PRIMARY KEY ("car_id")
);

-- CreateTable
CREATE TABLE "car_ses_cardapios_sessoes" (
    "car_id" SMALLSERIAL NOT NULL,
    "ses_id" SMALLSERIAL NOT NULL,
    "car_ses_status" CHAR(3) NOT NULL,

    CONSTRAINT "car_ses_pk" PRIMARY KEY ("car_id","ses_id")
);

-- CreateTable
CREATE TABLE "cli_clientes" (
    "cli_id" SERIAL NOT NULL,
    "cli_nome" CHAR(4) NOT NULL,
    "cli_token" UUID NOT NULL,
    "cli_entrada" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "cli_saida" TIMESTAMP(6),
    "cli_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "cli_pk" PRIMARY KEY ("cli_id")
);

-- CreateTable
CREATE TABLE "com_combos" (
    "pro_id_combo" SMALLSERIAL NOT NULL,
    "pro_id" SMALLSERIAL NOT NULL,
    "com_qtd" SMALLINT NOT NULL,
    "com_status" CHAR(3) NOT NULL,

    CONSTRAINT "com_pk" PRIMARY KEY ("pro_id_combo","pro_id")
);

-- CreateTable
CREATE TABLE "col_colaboradores" (
    "col_id" SMALLSERIAL NOT NULL,
    "col_nome" VARCHAR(50) NOT NULL,
    "col_email" VARCHAR(100) NOT NULL,
    "col_senha" VARCHAR(50) NOT NULL,
    "fun_id" SMALLSERIAL NOT NULL,
    "col_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "col_pk" PRIMARY KEY ("col_id")
);

-- CreateTable
CREATE TABLE "fun_funcoes" (
    "fun_id" SMALLSERIAL NOT NULL,
    "fun_nome" VARCHAR(50) NOT NULL,
    "fun_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "fun_pk" PRIMARY KEY ("fun_id")
);

-- CreateTable
CREATE TABLE "ing_ingredientes" (
    "ing_id" SMALLSERIAL NOT NULL,
    "ing_nome" VARCHAR(50) NOT NULL,
    "ing_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "ing_pk" PRIMARY KEY ("ing_id")
);

-- CreateTable
CREATE TABLE "ing_pro_ingredientes_produtos" (
    "pro_id" SMALLSERIAL NOT NULL,
    "ing_id" SMALLSERIAL NOT NULL,
    "ing_pro_qtd" SMALLINT NOT NULL,
    "ing_pro_status" CHAR(3) NOT NULL,

    CONSTRAINT "ing_pro_pk" PRIMARY KEY ("pro_id","ing_id")
);

-- CreateTable
CREATE TABLE "ped_pedidos" (
    "ped_id" SMALLINT NOT NULL,
    "cli_id" SMALLINT NOT NULL,
    "pro_id" SMALLINT NOT NULL,
    "ped_status" CHAR(3) NOT NULL DEFAULT 'agu',
    "ped_horario" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ped_pk" PRIMARY KEY ("ped_id")
);

-- CreateTable
CREATE TABLE "pri_col_privilegios_colaboradores" (
    "pri_id" SMALLSERIAL NOT NULL,
    "col_id" SMALLSERIAL NOT NULL,
    "pri_col_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "pri_col_pk" PRIMARY KEY ("pri_id","col_id")
);

-- CreateTable
CREATE TABLE "pri_privilegios" (
    "pri_id" SMALLSERIAL NOT NULL,
    "pri_nome" VARCHAR(50) NOT NULL,
    "pri_descricao" VARCHAR(300),
    "pri_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "pri_pk" PRIMARY KEY ("pri_id")
);

-- CreateTable
CREATE TABLE "prm_promocoes" (
    "prm_id" SMALLSERIAL NOT NULL,
    "prm_nome" VARCHAR(50) NOT NULL,
    "prm_desconto" DECIMAL(5,2) NOT NULL,
    "prm_descricao" VARCHAR(300),
    "prm_status" CHAR(3) NOT NULL,

    CONSTRAINT "prm_pk" PRIMARY KEY ("prm_id")
);

-- CreateTable
CREATE TABLE "pro_produtos" (
    "pro_id" SMALLSERIAL NOT NULL,
    "pro_nome" VARCHAR(50) NOT NULL,
    "pro_preco" MONEY NOT NULL,
    "pro_descricao" VARCHAR(300),
    "pro_serve" SMALLINT NOT NULL DEFAULT 1,
    "pro_imagem" VARCHAR(200),
    "pro_combo" BOOLEAN NOT NULL DEFAULT false,
    "pro_status" CHAR(3) NOT NULL DEFAULT 'atv',
    "amb_id" SMALLSERIAL NOT NULL,
    "prm_id" SMALLSERIAL NOT NULL,

    CONSTRAINT "pro_pk" PRIMARY KEY ("pro_id")
);

-- CreateTable
CREATE TABLE "ses_pro_sessoes_produtos" (
    "ses_id" SMALLSERIAL NOT NULL,
    "pro_id" SMALLSERIAL NOT NULL,
    "ses_pro_status" CHAR(3) NOT NULL,

    CONSTRAINT "ses_pro_pk" PRIMARY KEY ("ses_id","pro_id")
);

-- CreateTable
CREATE TABLE "ses_sessoes" (
    "ses_id" SMALLSERIAL NOT NULL,
    "ses_nome" VARCHAR(50) NOT NULL,
    "ses_cor" CHAR(7) NOT NULL,
    "ses_descricao" VARCHAR(300),
    "ses_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "ses_pk" PRIMARY KEY ("ses_id")
);

-- CreateTable
CREATE TABLE "tag_pro_tags_produtos" (
    "tag_id" SMALLSERIAL NOT NULL,
    "pro_id" SMALLSERIAL NOT NULL,
    "tag_pro_status" CHAR(3) NOT NULL,

    CONSTRAINT "tag_pro_pk" PRIMARY KEY ("pro_id","tag_id")
);

-- CreateTable
CREATE TABLE "tag_tags" (
    "tag_id" SERIAL NOT NULL,
    "tag_nome" VARCHAR(50) NOT NULL,
    "tag_descricao" VARCHAR(300),
    "tag_status" CHAR(3) NOT NULL DEFAULT 'atv',

    CONSTRAINT "tag_pk" PRIMARY KEY ("tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "amb_unique" ON "amb_ambientes"("amb_id", "amb_nome");

-- CreateIndex
CREATE UNIQUE INDEX "car_unique" ON "car_cardapios"("car_id", "car_nome");

-- CreateIndex
CREATE UNIQUE INDEX "ing_unique" ON "ing_ingredientes"("ing_id", "ing_nome");

-- CreateIndex
CREATE UNIQUE INDEX "prm_unique" ON "prm_promocoes"("prm_id", "prm_nome");

-- CreateIndex
CREATE UNIQUE INDEX "pro_unique" ON "pro_produtos"("pro_id", "pro_nome");

-- CreateIndex
CREATE UNIQUE INDEX "ses_unique" ON "ses_sessoes"("ses_id", "ses_nome");

-- CreateIndex
CREATE UNIQUE INDEX "tag_unique" ON "tag_tags"("tag_id", "tag_nome");

-- AddForeignKey
ALTER TABLE "car_ses_cardapios_sessoes" ADD CONSTRAINT "car_ses_fk_car_id" FOREIGN KEY ("car_id") REFERENCES "car_cardapios"("car_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "car_ses_cardapios_sessoes" ADD CONSTRAINT "car_ses_fk_ses_id" FOREIGN KEY ("ses_id") REFERENCES "ses_sessoes"("ses_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "com_combos" ADD CONSTRAINT "com_fk_pro_id" FOREIGN KEY ("pro_id") REFERENCES "pro_produtos"("pro_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "com_combos" ADD CONSTRAINT "com_fk_pro_id_combo" FOREIGN KEY ("pro_id_combo") REFERENCES "pro_produtos"("pro_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "col_colaboradores" ADD CONSTRAINT "col_fk_fun_id" FOREIGN KEY ("fun_id") REFERENCES "fun_funcoes"("fun_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ing_pro_ingredientes_produtos" ADD CONSTRAINT "ing_pro_fk_ing_id" FOREIGN KEY ("ing_id") REFERENCES "ing_ingredientes"("ing_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ing_pro_ingredientes_produtos" ADD CONSTRAINT "ing_pro_fk_pro_id" FOREIGN KEY ("pro_id") REFERENCES "pro_produtos"("pro_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ped_pedidos" ADD CONSTRAINT "ped_fk_cli_id" FOREIGN KEY ("cli_id") REFERENCES "cli_clientes"("cli_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ped_pedidos" ADD CONSTRAINT "ped_fk_pro_id" FOREIGN KEY ("pro_id") REFERENCES "pro_produtos"("pro_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pri_col_privilegios_colaboradores" ADD CONSTRAINT "pri_col_fk_col_id" FOREIGN KEY ("col_id") REFERENCES "col_colaboradores"("col_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pri_col_privilegios_colaboradores" ADD CONSTRAINT "pri_col_fk_pri_id" FOREIGN KEY ("pri_id") REFERENCES "pri_privilegios"("pri_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pro_produtos" ADD CONSTRAINT "pro_fk_amb_id" FOREIGN KEY ("amb_id") REFERENCES "amb_ambientes"("amb_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pro_produtos" ADD CONSTRAINT "pro_fk_prm_id" FOREIGN KEY ("prm_id") REFERENCES "prm_promocoes"("prm_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ses_pro_sessoes_produtos" ADD CONSTRAINT "ses_pro_fk_pro_id" FOREIGN KEY ("pro_id") REFERENCES "pro_produtos"("pro_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ses_pro_sessoes_produtos" ADD CONSTRAINT "ses_pro_fk_ses_id" FOREIGN KEY ("ses_id") REFERENCES "ses_sessoes"("ses_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_pro_tags_produtos" ADD CONSTRAINT "tag_pro_fk_pro_id" FOREIGN KEY ("pro_id") REFERENCES "pro_produtos"("pro_id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tag_pro_tags_produtos" ADD CONSTRAINT "tag_pro_fk_tag_id" FOREIGN KEY ("tag_id") REFERENCES "tag_tags"("tag_id") ON DELETE NO ACTION ON UPDATE CASCADE;
