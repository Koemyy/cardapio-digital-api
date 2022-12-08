import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken";

interface IAutenticarCliente {
    cli_nome: string,
    cli_token: string
}

export class AutenticarClienteUseCase {
    async execute({ cli_nome, cli_token }: IAutenticarCliente) {

        //Validar acesso a mesa
        const clienteExiste = await prisma.cli_clientes.findFirst({
            where: {
                cli_nome,
                cli_token
            }
        })

        if (!clienteExiste) {
            throw new Error("Mesa nao existe ou esta ativa");
        }

        //Criar webtoken
        const token = sign({ cli_nome }, "40028922", {
            subject: clienteExiste.cli_nome,
            expiresIn: "1d"
        })

        return token;
    }
}