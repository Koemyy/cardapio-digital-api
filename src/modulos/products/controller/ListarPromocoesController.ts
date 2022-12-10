import { Request, Response } from "express";
import { ListarPromocoesUseCase } from "../useCase/ListarPromocoesUseCase";

export class ListarPromocoesController {
    async handle(request: Request, response: Response) {
        const listarPromocoesUseCase = new ListarPromocoesUseCase();

        const promocoes = await listarPromocoesUseCase.execute();

        return response.json(promocoes);
    }
}