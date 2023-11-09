import { Router } from "express";
import { CriarClienteController } from "./modulos/actors/controller/CriarClienteController";
import { AutenticarClienteController } from "./modulos/actors/controller/AutenticarClienteController";

import { CriarColaboradorController } from "./modulos/actors/controller/CriarColaboradorController";
import { AutenticarColaboradorController } from "./modulos/actors/controller/AutenticarColaboradorController";
import { ListarProdutosController } from "./modulos/products/controller/ListarProdutosController";
import { ListarPromocoesController } from "./modulos/products/controller/ListarPromocoesController";
import { RetornoProdutoController } from "./modulos/products/controller/RetornoProdutoController";

import { ProdutosAtivosController } from "./modulos/products/controller/ProdutosAtivocController";
import { SalvarCompraController } from "./modulos/actions/controller/SalvarCompraController";
import { CadastrarFuncaoController } from "./modulos/actions/controller/CadastrarFuncaoController";
import { ListarFuncoesController } from "./modulos/actions/controller/ListarFuncoesController";
import { EnsureAuthenticatedColaborador } from "./middlewares/ensureAuthenticatedColaborador";
import { PedidosController } from "./modulos/actions/controller/PedidosController";
import { MesaController } from "./modulos/actions/controller/MesaController";

const routes = Router();

const criarClienteController = new CriarClienteController();
const autenticarClienteController = new AutenticarClienteController();

const criarColaboradorController = new CriarColaboradorController();
const autenticarColaboradorController = new AutenticarColaboradorController();
const listarProdutosController = new ListarProdutosController;
const listarPromocoesController  = new ListarPromocoesController ;
const produtosAtivosController = new ProdutosAtivosController;

const retornoProdutoController = new RetornoProdutoController;

const salvarCompraController = new SalvarCompraController();
const cadastrarFuncaoController = new CadastrarFuncaoController();
const listarFuncoesController = new ListarFuncoesController();
const pedidosController = new PedidosController();
const mesaController = new MesaController();

routes.post("/cliente/", criarClienteController.handle);
routes.get("/cliente/autenticar/", autenticarClienteController.handle);

routes.post("/colaborador/", criarColaboradorController.handle);
routes.post("/colaborador/autenticar/", autenticarColaboradorController.handle);

routes.get("/cardapio/", listarProdutosController.handle);
routes.get("/cardapio/promocoes", listarPromocoesController.handle);

routes.get("/produto/:id", retornoProdutoController.handle);

routes.get("/paths/", produtosAtivosController.handle);


routes.post("/actions/salvarCompra", salvarCompraController.handle);
routes.post("/actions/cadastrarFuncao", cadastrarFuncaoController.handle);
routes.get("/actions/listarFuncoes", listarFuncoesController.handle);
routes.post("/actions/atualizarPedido",pedidosController.atualizarStatusPedido);
routes.post("/actions/atualizarStatusPagementoPedido",pedidosController.atualizarStatusPagementoPedido);
routes.post("/actions/atualizarPedidoByCliente",pedidosController.atualizarStatusPedidoByCliente);
routes.post("/actions/buscarPedidos",pedidosController.buscarPedidosByFlag);
routes.post("/actions/buscarPedidosParaPagamento",pedidosController.buscarPedidosParaPagamentoByFlag);
routes.post("/actions/buscarTodosPedidos",pedidosController.buscarTodosPedidos);
routes.get("/actions/listarMesas",mesaController.listarMesas);
routes.get("/actions/cadastrarMesa",mesaController.cadastrarMesa);


routes.get("/teste", EnsureAuthenticatedColaborador);



export { routes };