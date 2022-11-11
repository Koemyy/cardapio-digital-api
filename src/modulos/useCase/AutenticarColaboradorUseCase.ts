import { prisma } from "../../database/prismaClient";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

interface IAutenticarColaborador{
    col_email: string,
    col_senha: string
}

export class AutenticarColaboradorUseCase {
    async execute({ col_email, col_senha }: IAutenticarColaborador) {

        //Validar email colaborador
        const ColaboradorExiste = await prisma.col_colaboradores.findFirst({
            where: {
                col_email
            }
        })

        if (!ColaboradorExiste) {
            throw new Error("Usuário não existe ou senha invalida");
        }

        //Validar senha
        const senhaMatch = await compare(col_senha, ColaboradorExiste.col_senha);

        if(!senhaMatch) {
            throw new Error("Usuário não existe ou senha invalida");
        }

        //Criar webtoken
        const token = sign({ col_email }, "31121311", {
            subject: ColaboradorExiste.col_nome,
            expiresIn: "1d"
        })

        return token;
    }
}