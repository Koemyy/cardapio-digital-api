import { prisma } from "../../../database/prismaClient";

export class CriarClienteUseCase {
    async execute(mes_id_str: string) {

       const mes_id = parseInt(mes_id_str)
        //Criar cliente
        const cliente = await prisma.cli_clientes.create({
            data: {
                mes_id
            }
        })

        return cliente
    }
}