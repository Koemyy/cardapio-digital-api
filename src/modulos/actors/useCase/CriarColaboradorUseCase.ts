import { prisma } from "../../../database/prismaClient";
import { hash } from "bcrypt";

interface ICriarColaborador {
    col_nome: string,
    fun_id: number,
    col_email: string,
    col_senha: string
}

export class CriarColaboradorUseCase {
    async execute({col_nome, fun_id, col_email, col_senha}: ICriarColaborador) {

        //Validar se o email ja esta cadastrado
        const colaboradorExiste = await prisma.col_colaboradores.findFirst({
            where: {
                col_email
            }
        })

        if (colaboradorExiste) {
            throw new Error("Email ja cadastrado");
        }

        //Encriptar senha
        const hashSenha = await hash(col_senha, 10)

        //Criar Colaborador
        const colaborador = await prisma.col_colaboradores.create({
            data: {
                col_nome,
                fun_id,
                col_email,
                col_senha: hashSenha
            }
            
        })

        return colaborador
    }
}