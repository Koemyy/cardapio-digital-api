import { prisma } from "../../../database/prismaClient"

interface Sessoes{
    ses_nome: string,
    produtos: Produto[]
}

interface Produto {
    pro_id: number,
    pro_nome: string,
    pro_preco: number,
    pro_descricao: string,
    pro_imagem: string
}

export class ListaProdutosUseCase {

    async execute() {
        let retorno: Sessoes[] = [];
        let auxRet: Sessoes;

        let produtos: Produto[] = [];
        let auxPro: Produto;

        let pro_produtos: any[]
        let ses_nomes: any;

        let auxNome: string

        const ses_pro: any[] = await prisma.$queryRaw
        `
            SELECT
                DISTINCT sp.ses_id
            FROM
                ses_pro_sessoes_produtos sp
            INNER JOIN 
                pro_produtos p
                ON 
                    p.pro_id = sp.pro_id
            WHERE
                sp.ses_pro_Status = 'atv' AND p.pro_status = 'atv'
            ORDER BY 
                ses_id ASC;
        `

        for(let i=0; i<ses_pro.length; i++){
            ses_nomes = await prisma.ses_sessoes.findFirst({
                where: {
                    ses_id: ses_pro[i].ses_id
                }
            });

            auxNome = ses_nomes.ses_nome;

            pro_produtos = await prisma.$queryRaw
            `
                SELECT 
                    p.pro_id, p.pro_nome, p.pro_preco, p.pro_descricao, p.pro_imagem
                FROM
                    ses_pro_sessoes_produtos sp
                INNER JOIN 
                    pro_produtos p
                    ON 
                        p.pro_id = sp.pro_id
                WHERE
                    sp.ses_id = ${ses_pro[i].ses_id} AND p.pro_status = 'atv'
            `

            pro_produtos.forEach(elemento => {

                auxPro = {
                    pro_id: elemento.pro_id,
                    pro_nome: elemento.pro_nome,
                    pro_preco: elemento.pro_preco,
                    pro_descricao: elemento.pro_descricao,
                    pro_imagem: elemento.pro_imagem
                };

                produtos.push(auxPro);
            });

            auxRet = {
                ses_nome: auxNome,
                produtos: produtos
            }

            retorno.push(auxRet)

        }

        
        return retorno;
        
    }
}