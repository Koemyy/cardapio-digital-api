import { Request, Response, response } from "express";
import { CriarClienteUseCase } from "../useCase/CriarClienteUseCase";

export class CriarClienteController {
    async handle(request: Request, response: Response) {
        const { cli_nome } = request.body;

        const criarClienteUseCase = new CriarClienteUseCase();
        const result = await criarClienteUseCase.execute(cli_nome);

        return response.json(result);
    }
}