import { prisma } from "../../../database/prismaClient";

export class CriarClienteUseCase {
    async execute(mes_id: number) {

        //Criar cliente
        const cliente = await prisma.cli_clientes.create({
            data: {
                mes_id
            }
        })

        return cliente
    }
}