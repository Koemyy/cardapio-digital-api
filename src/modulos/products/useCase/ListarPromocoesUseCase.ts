import { prisma } from "../../../database/prismaClient"

interface Retorno {
    prm_id: string,
    prm_nome: string,
    prm_descricao: string,
    prm_desconto: number,
    produtos: Produto[]
}

interface Produto {
    pro_id: number,
    pro_nome: string,
    pro_preco: number,
    prm_desconto: number,
    pro_imagem: string,
}

export class ListarPromocoesUseCase {

    async execute() {

        const prm_promocao: any = await prisma.prm_promocoes.findFirst({
            where: {
                prm_status: 'atv'
            }
        })

        const pro_produto: any[] = await prisma.$queryRaw
        `
            SELECT 
                p.pro_id, p.pro_nome, p.pro_preco, pr.prm_desconto, p.pro_imagem
            FROM
                pro_produtos p
            INNER JOIN
                prm_promocoes pr
                ON
                    p.prm_id = pr.prm_id
            WHERE
                p.prm_id = ${prm_promocao?.prm_id}
        `

        let produtos: Produto[] = [];
        let auxProdutos: Produto;

        pro_produto.forEach(elemento => {
            auxProdutos = {
                pro_id: elemento.pro_id,
                pro_nome: elemento.pro_nome,
                pro_preco: elemento.pro_preco,
                prm_desconto: parseFloat(elemento.prm_desconto),
                pro_imagem: elemento.pro_imagem
            }

            produtos.push(auxProdutos);
        });

        
        const retorno: Retorno = {
            prm_id: prm_promocao.prm_id,
            prm_nome: prm_promocao.prm_nome,
            prm_descricao: prm_promocao.prm_descricao,
            prm_desconto: parseFloat(prm_promocao.prm_desconto),
            produtos: produtos
        }
        

        return retorno;        
    }
}