import { prisma } from "../../../database/prismaClient";


interface ped_pedidos{
    ped_id : number,
    ped_status : string
}

export class PedidosUseCase{
    async buscarPedidosAtivos() {
        const ped_pedidos: [] = await prisma.$queryRaw
            `
                SELECT 
                    *
                FROM
                    ped_pedidos 
                WHERE ped_status  like 'A%'
            `
         return ped_pedidos;
    }


    async atualizarPedido({ped_id, ped_status } : ped_pedidos) {
        const result = await prisma.$executeRaw
            `
                UPDATE ped_pedidos
                SET ped_status = ${ped_status}
                WHERE ped_id = ${ped_id}
            
            `;
        return result;
    }
}