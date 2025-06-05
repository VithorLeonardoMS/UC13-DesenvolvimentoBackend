import { Request, Response } from "express";
import { Order } from "../models/Order";
import { AppDataSource } from "../config/data-source";

const orderRepository = AppDataSource.getRepository(Order);

export class OrderController{

  // Criar um novo produto
  public async createOrder(req: Request, res: Response){
    const {status} = req.body
  
    if(!status){
      res.status(400).json({ mensagem: "Todos os dados devem ser fornecidos - status"})
      return;
    }
  
    const newOrder= new Order(status);
  
    const order = orderRepository.create({status});
    await orderRepository.save(order);
  
    res.status(201).json({ mensagem: "Pedido/Order criado com sucesso!", Product: newOrder });
    return;
  };
  
  // Listar todos os produtos
  public async listOrders(req: Request, res: Response){
    const orders = await orderRepository.find()
    res.status(200).json(orders);
    return;
  };
  
  // Buscar um produto por ID
  public async findOrderById(req: Request, res: Response){
    const id = Number(req.params.id);
    const order = await orderRepository.findOneBy({id:id})
    if (!order) {
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }
    res.status(200).json(order);
    return;
  };
  
  // Atualizar um produto
  public async updateOrder(req: Request, res: Response){
    const id = Number(req.params.id);
    const { name, price, description } = req.body;
    
    if(!id){
      res.status(400).json({mensagem:"Id é obrigatório!"})
      return;
    }
  
    if(!name && !price && !description){
      res.status(400).json({mensagem:"Um dos campos!"})
      return;
    }
  
    const order = await orderRepository.findOneBy({id:id});
  
    if (!order) {
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ incompleto

    await orderRepository.save(order)
  
    res.status(200).json({ mensagem: "Produto atualizado com sucesso!", order });
    return;
  };
  
  // Deletar um produto
  public async deleteOrder(req: Request, res: Response){
    const id = Number(req.params.id);
  
    if(!id){
      res.status(400).json({mensagem:"O id precisa ser fornecido!"})
      return;
    }
    const order = await orderRepository.findOneBy({id:id})

    if(!order){
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }

    await orderRepository.delete(order)
    res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
    return;
  };
  
}

