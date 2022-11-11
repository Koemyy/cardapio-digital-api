import { Router } from "express";
import { CriarClienteController } from "./modulos/controller/CriarClienteController";
import { AutenticarClienteController } from "./modulos/controller/AutenticarClienteController";

import { CriarColaboradorController } from "./modulos/controller/CriarColaboradorController";
import { AutenticarColaboradorController } from "./modulos/controller/AutenticarColaboradorController";

const routes = Router();

const criarClienteController = new CriarClienteController();
const autenticarClienteController = new AutenticarClienteController();

const criarColaboradorController = new CriarColaboradorController();
const autenticarColaboradorController = new AutenticarColaboradorController();

routes.post("/cliente/", criarClienteController.handle);
routes.post("/cliente/autenticar/", autenticarClienteController.handle);

routes.post("/colaborador/", criarColaboradorController.handle);
routes.post("/colaborador/autenticar/", autenticarColaboradorController.handle);

export { routes };