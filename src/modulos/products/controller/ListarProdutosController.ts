import { Request, Response } from "express";
import { ListarProdutosUseCase } from "../useCase/ListarProdutosUseCase";

export class ListarProdutosController {
    async handle(request: Request, response: Response) {
        const listarProdutosUseCase = new ListarProdutosUseCase();

        const cardapio = await listarProdutosUseCase.execute();

        return response.json(cardapio);
    }
}