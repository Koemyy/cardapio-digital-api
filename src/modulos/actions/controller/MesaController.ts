import { Request, Response } from "express";
import { MesasUseCase } from "../useCase/MesaUseCase";

export class MesaController{
    async listarMesas(request: Request, response: Response) {
        const mesasUseCase = new MesasUseCase();
        const result = await mesasUseCase.listarMesas();

        return response.status(200).json(result);
    }

    async cadastrarMesa(request: Request, response: Response) {
        const mesasUseCase = new MesasUseCase();
        const result = await mesasUseCase.cadastrarMesa();

        return response.status(200).json(result);
    }
}