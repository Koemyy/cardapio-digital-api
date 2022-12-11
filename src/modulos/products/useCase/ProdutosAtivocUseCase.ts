import { prisma } from "../../../database/prismaClient"

interface Retorno {
    params: Pro_id
}

interface Pro_id {
    id: string
}

export class ProdutosAtivosUseCase {

    async execute() {
        const produtos = await prisma.pro_produtos.findMany({
            where: {
                pro_status: 'atv'
            }
        })

        let retorno: Retorno[] = [];
        let auxRetorno: Retorno;


        produtos.forEach(elemento => {
            auxRetorno = {
                params:{
                    id: elemento.pro_id.toString()
                } 
            }

            retorno.push(auxRetorno);
        })

        return retorno;        
    }
}