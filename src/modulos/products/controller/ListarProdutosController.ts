import { Request, Response } from "express";
import { ListaProdutosUseCase } from "../useCase/ListarProdutosUseCase";

export class ListaProdutosController {
    async handle(request: Request, response: Response) {
        const listaProdutosUseCase = new ListaProdutosUseCase();

        const cardapio = await listaProdutosUseCase.naoaguento();

        return response.json(cardapio);
    }
}