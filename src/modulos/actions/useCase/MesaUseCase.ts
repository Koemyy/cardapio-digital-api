import { prisma } from "../../../database/prismaClient";

export class MesasUseCase{
    async listarMesas() {
         const mes_mesa: [] = await prisma.$queryRaw
            `
            SELECT 
                *
            FROM
                mes_mesa  
            WHERE mes_status = 'atv'
            `
            
          return mes_mesa;
     }


     async cadastrarMesa() {
        const result =  await prisma.mes_mesa.create({
            data: {}
        });

        return result ;
    }
}