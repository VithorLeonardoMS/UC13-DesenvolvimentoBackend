import { Router } from "express";
import { criarProduto, listarProdutos, buscarProdutoPorId, atualizarProduto,deletarProduto } from "../controller/ProdutosController"

const router = Router();

router.post("/produto", criarProduto);
router.get("/produtos", listarProdutos);
router.get("/produtos/:id", buscarProdutoPorId);
router.put("/produtos/:id/atualizar", atualizarProduto);
router.delete("/produtos/:id/deletar", deletarProduto);

export default router;