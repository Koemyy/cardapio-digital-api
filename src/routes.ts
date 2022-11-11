import { Router } from "express";
import { CriarClienteController } from "./modulos/clientes/controller/CriarClienteController";
import { AutenticarClienteController } from "./modulos/clientes/controller/AutenticarClienteController";

const routes = Router();

const criarClienteController = new CriarClienteController();
const autenticarClienteController = new AutenticarClienteController();

routes.post("/cliente/", criarClienteController.handle);
routes.post("/cliente/autenticar/", autenticarClienteController.handle)

export { routes };