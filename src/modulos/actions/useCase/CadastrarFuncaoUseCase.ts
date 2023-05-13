import { prisma } from "../../../database/prismaClient"
import isEmpty from "../../util/metodosUteis";

interface Funcao{
    fun_nome: string
    fun_status: string
}

export class CadastrarFuncaoUseCase{
    async execute({fun_nome, fun_status} : Funcao) {
        
        const colaboradorExiste = await prisma.fun_funcoes.findFirst({
            where: {
                fun_nome
            }
        })

        if (colaboradorExiste) {
            throw new Error("Função já cadastrada");
        }

        if(fun_nome === null || isEmpty(fun_nome)){
            throw new Error("Função sem nome"); 
        }

        const colaborador = await prisma.fun_funcoes.create({
            data: {
                fun_nome,
                fun_status
            }   
        })
        return colaborador;

        
    }
}