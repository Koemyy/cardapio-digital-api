import { prisma } from "../../../database/prismaClient"

interface Produto {
    pro_id: number,
    pro_nome: string,
    pro_preco: number,
    prm_desconto: number,
    pro_descricao: string,
    pro_serve: number,
    pro_imagem: string,
    pro_combo: boolean,
    amb_id: number,
    tags: Tag[]
    ingredientes: Ingrediente[]
}

interface Tag {
    tag_id: number,
    tag_nome: string,
    tag_cor: string
}

interface Ingrediente {
    ing_nome: string
}

export class RetornoProdutoUseCase {

    async execute(request: number) {

        let auxTag: Tag;
        let tags: Tag[] = [];

        let auxIng: Ingrediente;
        let ingredientes: Ingrediente[] = [];
        
        const pro_produto: any = await prisma.$queryRaw
        `
        SELECT 
            p.pro_id, p.pro_nome, p.pro_preco, p.pro_descricao, p.pro_serve, p.pro_imagem, pr.prm_desconto, pr.prm_status
        FROM
            pro_produtos p
        INNER JOIN
            prm_promocoes pr
            ON
                pr.prm_id = p.prm_id
        WHERE
            p.pro_id = ${request} AND p.pro_status = 'atv'
        `
                
        let desconto;
        if(pro_produto[0].prm_status == "atv") desconto = parseFloat(pro_produto[0].prm_desconto)
        else desconto = 0;

        const tag_tags: any[] = await prisma.$queryRaw
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
                p.pro_id = ${pro_produto[0].pro_id} AND t.tag_status = 'atv' AND tp.tag_pro_status = 'atv'
        `
        
        tag_tags.forEach(elemento => {
            auxTag= {
                tag_id: elemento.tag_id,
                tag_nome: elemento.tag_nome,
                tag_cor: elemento.tag_cor
            }

            tags.push(auxTag);
        });

        const ing_ingredientes: any[] = await prisma.$queryRaw
        `
            SELECT 
                i.ing_nome
            FROM
                ing_pro_ingredientes_produtos ip
            INNER JOIN 
                ing_ingredientes i
                ON 
                    i.ing_id = ip.ing_id
            INNER JOIN
                pro_produtos p
                ON
                    p.pro_id = ip.pro_id
            WHERE
                p.pro_id = ${pro_produto[0].pro_id} AND i.ing_status = 'atv' AND ip.ing_pro_status = 'atv'
        `
        
        ing_ingredientes.forEach(elemento => {
            auxIng= {
                ing_nome: elemento.ing_nome
            }

            ingredientes.push(auxIng);
        });
        
        const produto: Produto = {
            pro_id: pro_produto[0].pro_id,
            pro_nome: pro_produto[0].pro_nome,
            pro_preco: parseFloat(pro_produto[0].pro_preco),
            prm_desconto: desconto,
            pro_descricao: pro_produto[0].pro_descricao,
            pro_serve: pro_produto[0].pro_serve,
            pro_imagem: pro_produto[0].pro_imagem,
            pro_combo: pro_produto[0].pro_combo,
            amb_id: pro_produto[0].amb_id,
            tags: tags,
            ingredientes: ingredientes
        }
        
        return produto;        
    }
}