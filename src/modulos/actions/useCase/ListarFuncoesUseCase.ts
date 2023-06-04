import { prisma } from "../../../database/prismaClient";

export class ListarFuncoesUseCase{
    async execute() {

       const fun_funcoes: [] = await prisma.$queryRaw
            `
            SELECT 
                *
            FROM
                fun_funcoes  ff
            `

        return fun_funcoes;
    }
}