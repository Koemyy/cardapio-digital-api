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
          WHERE ped_status = ${status}
          `;
      
        return pedidos;
    }


    async buscarTodosPedidos(cli_id : number) {
        const pedidos = await prisma.$queryRaw
          `
          select 
              cli_id,
              pro_id,
              sum(ped_quantidade)::text AS ped_quantidade,
              pro_nome,
              TO_CHAR(CAST(sum(ped_preco) AS numeric), '9999.99') as ped_preco
	        from (
		          SELECT 
                  ped.cli_id,
                  pro.pro_id,
                  pro.pro_nome,
                  ped.ped_quantidade,
                  (pro_preco * ped.ped_quantidade) AS ped_preco
              FROM ped_pedidos ped
              INNER JOIN pro_produtos pro ON pro.pro_id = ped.pro_id
              INNER JOIN cli_clientes cli ON cli.cli_id = ped.cli_id
              WHERE cli.cli_id  = ${cli_id}
              and ped.ped_status <> 'PG'
	        ) as data
          group by cli_id, pro_id, pro_nome
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


    async atualizarPedidoByCliente(cli_id  : number,  ped_status : string) {
        const result = await prisma.$executeRaw
            `
                UPDATE ped_pedidos
                SET ped_status = ${ped_status}
                WHERE cli_id = ${cli_id}
            
            `;
        return result;
    }
}