import { Request, Response } from "express";
import { ProdutosAtivosUseCase } from "../useCase/ProdutosAtivocUseCase";

export class ProdutosAtivosController {
    async handle(request: Request, response: Response) {
        const produtosAtivosUseCase = new ProdutosAtivosUseCase();

        const paths = await produtosAtivosUseCase.execute();

        return response.json(paths);
    }
}