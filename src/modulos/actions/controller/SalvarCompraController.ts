import { Request, Response } from "express";
import { SalvarCompraUseCase } from "../useCase/SalvarCompraUseCase";

export class SalvarCompraController {
    async handle(request: Request, response: Response) {

        let { cli_id, pro_id, ped_status, ped_quantidade, ped_observacao} = request.body;
        const ped_horario = new Date();
        const salvarCompraUseCase = new SalvarCompraUseCase();
    
        const result = await salvarCompraUseCase.execute({cli_id, pro_id, ped_status, ped_horario, ped_quantidade, ped_observacao})

        return response.json({result: result});
    }
}