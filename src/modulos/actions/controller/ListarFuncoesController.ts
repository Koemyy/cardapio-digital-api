import { Request, Response } from "express";
import { ListarFuncoesUseCase } from "../useCase/ListarFuncoesUseCase";

export class ListarFuncoesController {
    async handle(request: Request, response: Response) {

        const  listarFuncoesUseCase = new ListarFuncoesUseCase();
        
        const result = await listarFuncoesUseCase.execute();

        return response.status(200).json(result);
    }
}