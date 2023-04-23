import { Request, Response } from "express";
import { SalvarCompraUseCase } from "../useCase/SalvarCompraUseCase";

export class SalvarCompraController {
    async handle(request: Request, response: Response) {

        let {ped_id, cli_id, pro_id, ped_status} = request.body;

        const ped_horario = new Date();
    
        const salvarCompraUseCase = new SalvarCompraUseCase();
        
        const result = await salvarCompraUseCase.execute({cli_id, pro_id, ped_status, ped_horario})

        return response.json({result: result});
    }
}