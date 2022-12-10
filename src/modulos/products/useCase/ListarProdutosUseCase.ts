import { prisma } from "../../../database/prismaClient"

interface Sessoes{
    ses_nome: string,
    ses_cor: string,
    produtos: Produto[]
}

interface Produto {
    pro_id: number,
    pro_nome: string,
    pro_preco: number,
    prm_desconto: number,
    pro_descricao: string,
    pro_imagem: string,
    tags: tag[]
}

interface tag {
    tag_id: number,
    tag_nome: string,
    tag_cor: string
}

export class ListarProdutosUseCase {

    async execute() {
        let retorno: Sessoes[] = [];
        let auxRet: Sessoes;

        let produtos: Produto[];
        let auxPro: Produto;
        
        let tags: tag[] = [];
        let auxTag: tag;

        let ses_nomes: any;
        let pro_produtos: any[];
        let tag_tags: any[];


        let auxNome: string;
        let auxCor: string;

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

            produtos = [];

            auxNome = ses_nomes.ses_nome;
            auxCor = ses_nomes.ses_cor;

            pro_produtos = await prisma.$queryRaw
            `
            SELECT 
                p.pro_id, p.pro_nome, p.pro_preco, p.pro_descricao, p.pro_imagem, pr.prm_desconto, pr.prm_status
            FROM
                ses_pro_sessoes_produtos sp
            INNER JOIN 
                pro_produtos p
                ON 
                    p.pro_id = sp.pro_id
            INNER JOIN
                prm_promocoes pr
                ON
                    pr.prm_id = p.prm_id
            WHERE
                sp.ses_id = ${ses_pro[i].ses_id} AND p.pro_status = 'atv'
            `

            for(let i=0; i<pro_produtos.length; i++){
                
                tags = [];
                
                tag_tags = await prisma.$queryRaw
                `
                    SELECT 
                        t.tag_id, t.tag_nome, t.tag_cor
                    FROM
                        tag_pro_tags_produtos tp
                    INNER JOIN 
                        tag_tags t
                        ON 
                            t.tag_id = tp.tag_id
                    INNER JOIN
                        pro_produtos p
                        ON
                            p.pro_id = tp.pro_id
                    WHERE
                        p.pro_id = ${pro_produtos[i].pro_id} AND t.tag_status = 'atv' AND tp.tag_pro_status = 'atv'
                `

                tag_tags.forEach(elemento => {
                    auxTag = {
                        tag_id: elemento.tag_id,
                        tag_nome: elemento.tag_nome,
                        tag_cor: elemento.tag_cor
                    }

                    tags.push(auxTag);
                });

                let desconto: number;
                if(pro_produtos[i].prm_status == 'atv') desconto = parseFloat(pro_produtos[i].prm_desconto);
                else desconto = 0.0;

                auxPro = {
                    pro_id: pro_produtos[i].pro_id,
                    pro_nome: pro_produtos[i].pro_nome,
                    pro_preco: parseFloat(pro_produtos[i].pro_preco),
                    prm_desconto: desconto,
                    pro_descricao: pro_produtos[i].pro_descricao,
                    pro_imagem: pro_produtos[i].pro_imagem,
                    tags: tags
                };

                produtos.push(auxPro);
            };

            auxRet = {
                ses_nome: auxNome,
                ses_cor: auxCor,
                produtos: produtos
            }

            retorno.push(auxRet)
        }

        return retorno;        
    }
}