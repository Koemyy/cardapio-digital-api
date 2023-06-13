import { prisma } from "../../../database/prismaClient";


interface pedidos{
    ped_id : number,
    ped_status : string
}

export class PedidosUseCase{
    async buscarPedidos(status: string) {
        const pedidos = await prisma.$queryRaw
          `
          SELECT 
            ped.*,
            pro_nome,
            cli.mes_id
          FROM ped_pedidos ped
          INNER JOIN pro_produtos pro ON pro.pro_id = ped.pro_id
          INNER JOIN cli_clientes cli ON cli.cli_id = ped.cli_id
          WHERE ped_status  like ${status}
          `;
      
        return pedidos;
    }


    async atualizarPedido({ped_id, ped_status } : pedidos) {
        const result = await prisma.$executeRaw
            `
                UPDATE ped_pedidos
                SET ped_status = ${ped_status}
                WHERE ped_id = ${ped_id}
            
            `;
        return result;
    }
}