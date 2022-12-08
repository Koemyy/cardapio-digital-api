import { prisma } from "../../../database/prismaClient"

interface Retorno {
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
        let retorno: Retorno[];
        let produto: Produto;
        let aux: Retorno;
        
        /*
        let inferno: Produto = {
            pro_id: 1,
            pro_nome: 'elemento.pro_nome',
            pro_preco: 123,
            pro_descricao: 'elemento.pro_descricao',
            pro_imagem: 'elemento.pro_imagem'
        }

        let python: Produto[] = [];
        python.push(inferno);
       
        console.log(python);
        */
        
        
        //aaasfuxproduto.push(aaauxproduto);


        //console.log(aaauxproduto)

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
        let sessaoNome: any
        let pro_produtos: any[]
        let produtos: Produto[] = []
        let auxproduto: Produto;

        ses_pro.forEach( async element => {
            sessaoNome = await prisma.ses_sessoes.findFirst({
                where: {
                    ses_id: element.ses_id
                }
            })

            const nome: string = sessaoNome.ses_nome

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
                    sp.ses_id = ${element.ses_id} AND p.pro_status = 'atv'
            `
            
            pro_produtos.forEach(elemento =>{
            
                auxproduto = {
                    pro_id: elemento.pro_id,
                    pro_nome: elemento.pro_nome,
                    pro_preco: elemento.pro_preco,
                    pro_descricao: elemento.pro_descricao,
                    pro_imagem: elemento.pro_imagem
                }
        
                
                //auxproduto = elemento;
                
                produtos.push(auxproduto);
            })

            console.log(produtos);
            console.log(typeof(nome));
            
        });
        

        
        return produtos;
        
    }



    naoaguento() {
        return this.execute();
    }
}