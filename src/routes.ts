import { Router } from "express";
import { CriarClienteController } from "./modulos/actors/controller/CriarClienteController";
import { AutenticarClienteController } from "./modulos/actors/controller/AutenticarClienteController";

import { CriarColaboradorController } from "./modulos/actors/controller/CriarColaboradorController";
import { AutenticarColaboradorController } from "./modulos/actors/controller/AutenticarColaboradorController";
import { ListaProdutosController } from "./modulos/products/controller/ListarProdutosController";

const routes = Router();

const criarClienteController = new CriarClienteController();
const autenticarClienteController = new AutenticarClienteController();

const criarColaboradorController = new CriarColaboradorController();
const autenticarColaboradorController = new AutenticarColaboradorController();
const listaProdutosController = new ListaProdutosController;

routes.post("/cliente/", criarClienteController.handle);
routes.post("/cliente/autenticar/", autenticarClienteController.handle);

routes.post("/colaborador/", criarColaboradorController.handle);
routes.post("/colaborador/autenticar/", autenticarColaboradorController.handle);

routes.get("/produtos/", listaProdutosController.handle);

export { routes };