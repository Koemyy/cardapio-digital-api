import { Request, Response } from "express";
import { AutenticarClienteUseCase } from "../useCase/AutenticarClienteUseCase";

export class AutenticarClienteController {
    async handle(request: Request, response: Response) {
        let {cli_token } = request.query;

        cli_token = cli_token?.toString();

        const autenticarClienteUseCase = new AutenticarClienteUseCase();
        const result = await autenticarClienteUseCase.execute({
            
            cli_token
        })

        return response.json(result);
    }
}