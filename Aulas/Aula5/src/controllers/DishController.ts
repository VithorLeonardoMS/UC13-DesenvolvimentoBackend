import { Request, Response } from "express";
import { Dish } from "../models/Dish";
import { AppDataSource } from "../config/data-source";

const dishRepository = AppDataSource.getRepository(Dish);

export class DishController{

  // Criar um novo produto
  public async createDish(req: Request, res: Response){
    const {name, price, description, available } = req.body
  
    if(!name || !price || !description || !available){
      res.status(400).json({ mensagem: "Todos os dados devem ser fornecidos - name, description, price e avaliable"})
      return;
    }
  
    const newDish = new Dish(name, price, description, available);
  
    const dish = dishRepository.create({name, price, description});
    await dishRepository.save(dish);
  
    res.status(201).json({ mensagem: "Prato/Dish criado com sucesso!", Product: newDish });
    return;
  };
  
  // Listar todos os produtos
  public async listDishes(req: Request, res: Response){
    const dishes = await dishRepository.find({
      select:{
        id:true,
        name:true,
        price:true,
        description:true,
        available:true
      }
    })
    res.status(200).json(dishes);
    return;
  };
  
  // Buscar um produto por ID
  public async findDishById(req: Request, res: Response){
    const id = Number(req.params.id);
    const dish = await dishRepository.findOneBy({id:id})
    if (!dish) {
      res.status(404).json({ mensagem: "Prato não encontrado" });
      return;
    }
    res.status(200).json(dish);
    return;
  };

  public async findByName(req:Request, res: Response){
    const { name } = req.params;

    const dish = await dishRepository.findBy({name});

    if(!dish){
      res.status(404).json({mensage: "Produto não encontrado"})
      return;
    }

    res.status(200).json(dish)
    return;
  }
  
  // Atualizar um produto
  public async updateDish(req: Request, res: Response){
    const id = Number(req.params.id);
    const { name, price, description, available } = req.body;
    
    if(!id){
      res.status(400).json({mensagem:"Id é obrigatório!"})
      return;
    }
  
    if(!name || !price || !description || !available){
      res.status(400).json({mensagem:"Um dos campos devem ser fornecidos! - name, price, description ou avaliable"})
      return;
    }
  
    const dish = await dishRepository.findOneBy({id:id});
  
    if (!dish) {
      res.status(404).json({ mensagem: "Prato não encontrado" });
      return;
    }
    
    dish.name = name || dish.name;
    dish.price = price || dish.price;
    dish.description = description || dish.description;
    dish.available = available != undefined? available : dish.available; 

    await dishRepository.save(dish)
  
    res.status(200).json({ mensagem: "Produto atualizado com sucesso!", dish });
    return;
  };
  
  // Deletar um produto
  public async deleteDish(req: Request, res: Response){
    const id = Number(req.params.id);
  
    if(!id){
      res.status(400).json({mensagem:"O id precisa ser fornecido!"})
      return;
    }
    const dish = await dishRepository.findOneBy({id:id})

    if(!dish){
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }

    await dishRepository.delete(dish)
    res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
    return;
  };
  
}

