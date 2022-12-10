import { Request, Response } from "express";
import { RetornoProdutoUseCase } from "../useCase/RetornoProdutoUseCase";

export class RetornoProdutoController {
    async handle(request: Request, response: Response) {
        const retornoProdutoUseCase = new RetornoProdutoUseCase();
        const {id:pro_id} = request.params;

        const produto = await retornoProdutoUseCase.execute(parseInt(pro_id));

        return response.json(produto);
    }
}