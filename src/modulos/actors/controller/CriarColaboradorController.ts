import { Request, Response } from "express";
import { CriarColaboradorUseCase } from "../useCase/CriarColaboradorUseCase"; 

export class CriarColaboradorController {
    async handle(request: Request, response: Response) {
        let { col_nome, col_email, col_senha, fun_id } = request.body;


        if(typeof fun_id === 'string'){ 
            fun_id = parseInt(fun_id)
        }

        const criarColaboradorUseCase = new CriarColaboradorUseCase();
        const result = await criarColaboradorUseCase.execute({
            col_nome, 
            col_email, 
            col_senha,
            fun_id
        });

        return response.json(result);
    }
}