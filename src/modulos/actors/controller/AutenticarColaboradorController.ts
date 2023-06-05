import { Request, Response } from "express";
import { AutenticarColaboradorUseCase } from "../useCase/AutenticarColaboradorUseCase";

export class AutenticarColaboradorController {
    async handle(request: Request, response: Response) {
        const { col_email, col_senha } = request.body;

        const autenticarColaboradorUseCase = new AutenticarColaboradorUseCase();
        const result = await autenticarColaboradorUseCase.execute({
            col_email,
            col_senha
        })

        return response.json({webToken: result});
    }
}