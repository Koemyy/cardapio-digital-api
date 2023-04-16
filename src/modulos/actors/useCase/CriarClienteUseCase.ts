import { prisma } from "../../../database/prismaClient";

export class CriarClienteUseCase {
    async execute(cli_nome: string) {

        //Validar se a mesa ja esta em uso
        const clienteExiste = await prisma.cli_clientes.findFirst({
            where: {
                cli_nome
            }
        })


        if (clienteExiste != null) {
            throw new Error("Usuário já existe");
        }

        //Criar cliente
        const cliente = await prisma.cli_clientes.create({
            data: {
                cli_nome
            }
        })

        return cliente
    }
}