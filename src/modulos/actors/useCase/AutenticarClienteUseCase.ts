import { prisma } from "../../../database/prismaClient";
import { sign } from "jsonwebtoken";

 interface IAutenticarCliente {
     cli_token:  string | undefined
 }

export class AutenticarClienteUseCase {
    async execute({cli_token}: IAutenticarCliente) {

        if(cli_token == null || cli_token  == undefined){
            throw new Error("invalido token");
        }

        //Validar acesso a mesa
        const clienteExiste = await prisma.cli_clientes.findFirst({
            where: {
                cli_token
            }
        })

        if (!clienteExiste) {
            throw new Error("Mesa nao existe ou esta ativa");
        }

        const {cli_nome} = clienteExiste
        //Criar webtoken
        const webToken = sign({cli_nome}, "40028922", {
            subject: clienteExiste.cli_nome,
            expiresIn: "1d"
        })


        return webToken;
    }
}