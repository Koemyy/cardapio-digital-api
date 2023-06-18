import { Request, Response } from "express";
import { CriarClienteUseCase } from "../useCase/CriarClienteUseCase";

export class CriarClienteController {
    async handle(request: Request, response: Response) {
        const { mes_id } = request.body;

        const criarClienteUseCase = new CriarClienteUseCase();
        const result = await criarClienteUseCase.execute(mes_id);

        return response.json(result);
    }
}