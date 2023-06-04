import { Request, Response } from "express";
import { CadastrarFuncaoUseCase } from "../useCase/CadastrarFuncaoUseCase";

export class CadastrarFuncaoController {
    async handle(request: Request, response: Response) {

        const {fun_nome} = request.body;  
        const fun_status= 'S';
        const  cadastrarFuncaoUseCase = new CadastrarFuncaoUseCase();
        
        const result = await cadastrarFuncaoUseCase.execute({fun_nome, fun_status});

        return response.status(200).json(result);
    }
}