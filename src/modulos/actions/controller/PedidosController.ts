import { Request, Response } from "express";
import { PedidosUseCase } from "../useCase/PedidosUseCase";

export class PedidosController{
    async buscarPedidosByFlag(request: Request, response: Response) {
        const pedidosUseCase = new PedidosUseCase();
        const {status} = request.body;
        
        const result = await pedidosUseCase.buscarPedidos(status+'%');
        return response.status(200).json(result);
    }


    async atualizarStatusPedido(request: Request, response: Response) {
        const { ped_id, ped_status } = request.body;
        const pedidosUseCase = new PedidosUseCase();
        const result = await pedidosUseCase.atualizarPedido({ped_id, ped_status});
        return response.status(200).json({linhasAtualizadas: result});
    }
}