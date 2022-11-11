import { Request, Response } from "express";
import { AutenticarClienteUseCase } from "../useCase/AutenticarClienteUseCase";

export class AutenticarClienteController {
    async handle(request: Request, response: Response) {
        const { cli_nome, cli_token } = request.body;

        const autenticarClienteUseCase = new AutenticarClienteUseCase();
        const result = await autenticarClienteUseCase.execute({
            cli_nome,
            cli_token
        })

        return response.json(result);
    }
}