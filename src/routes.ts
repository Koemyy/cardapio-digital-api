import { Router } from "express";
import { CriarClienteController } from "./modulos/actors/controller/CriarClienteController";
import { AutenticarClienteController } from "./modulos/actors/controller/AutenticarClienteController";

import { CriarColaboradorController } from "./modulos/actors/controller/CriarColaboradorController";
import { AutenticarColaboradorController } from "./modulos/actors/controller/AutenticarColaboradorController";
import { ListarProdutosController } from "./modulos/products/controller/ListarProdutosController";
import { ListarPromocoesController } from "./modulos/products/controller/ListarPromocoesController";
import { RetornoProdutoController } from "./modulos/products/controller/RetornoProdutoController";

const routes = Router();

const criarClienteController = new CriarClienteController();
const autenticarClienteController = new AutenticarClienteController();

const criarColaboradorController = new CriarColaboradorController();
const autenticarColaboradorController = new AutenticarColaboradorController();
const listarProdutosController = new ListarProdutosController;
const listarPromocoesController  = new ListarPromocoesController ;

const retornoProdutoController = new RetornoProdutoController;

routes.post("/cliente/", criarClienteController.handle);
routes.post("/cliente/autenticar/", autenticarClienteController.handle);

routes.post("/colaborador/", criarColaboradorController.handle);
routes.post("/colaborador/autenticar/", autenticarColaboradorController.handle);

routes.get("/cardapio/", listarProdutosController.handle);
routes.get("/cardapio/promocoes", listarPromocoesController.handle);

routes.get("/produto/:id", retornoProdutoController.handle);

export { routes };