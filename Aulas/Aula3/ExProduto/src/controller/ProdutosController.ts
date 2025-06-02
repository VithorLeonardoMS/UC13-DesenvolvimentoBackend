import { Request, Response } from "express";
import { produtos, Produto } from "../models/produto";

// Criar um novo usuário
let id:number = produtos.length

export const criarProduto = (req: Request, res: Response) => {
  const { nome, descricao, preco, quantidade } = req.body

  if(!nome || !preco || !quantidade || ! descricao){
    res.status(400).json({ mensagem: "Todos os dados devem ser fornecidos - nome, descricao, preco e quantidade"})
    return;
  }

  const novoProduto = new Produto(id, nome, descricao, preco,quantidade);
  id += 1;

  produtos.push(novoProduto);
  res.status(201).json({ mensagem: "Produto criado com sucesso!", Produto: novoProduto });
  return;
};

// Listar todos os usuários
export const listarProdutos = (req: Request, res: Response) => {
  res.status(200).json(produtos);
  return;
};

// Buscar um usuário por ID
export const buscarProdutoPorId = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const produto = produtos.find(p => p.id === id);
  if (!produto) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }
  res.status(200).json(produto);
  return;
};

// Atualizar um usuário
export const atualizarProduto = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { nome, preco, quantidade } = req.body;
  
  if(!id){
    res.status(400).json({mensagem:"Id é obrigatório!"})
    return;
  }

  if(!nome && !preco && !quantidade){
    res.status(400).json({mensagem:"Um dos campos!"})
    return;
  }

  const produto = produtos.find(u => u.id === id);

  if (!produto) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }
  
  produto.nome = nome || produto.nome;
  produto.preco = preco || produto.preco;
  produto.quantidade = quantidade || produto.quantidade;

  res.status(200).json({ mensagem: "Produto atualizado com sucesso!", Produto });
  return;
};

// Deletar um usuário
export const deletarProduto = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  if(!id){
    res.status(400).json({mensagem:"O id precisa ser fornecido!"})
    return;
  }

  const index = produtos.findIndex(u => u.id === id);
  if (index === -1) {
    res.status(404).json({ mensagem: "Produto não encontrado" });
    return;
  }

  produtos.splice(index, 1);
  res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
  return;
};