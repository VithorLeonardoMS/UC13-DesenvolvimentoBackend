import { Request, Response } from "express";
import { Product } from "../models/Product";
import { AppDataSource } from "../database/data-source";

const productRepository = AppDataSource.getRepository(Product);

export class ProductController{

  // Criar um novo produto
  public async createProduct(req: Request, res: Response){
    const {name, description, price } = req.body
  
    if(!name || !price || !description){
      res.status(400).json({ mensagem: "Todos os dados devem ser fornecidos - name, description e price"})
      return;
    }
  
    const newProduct = new Product(name, description, price);
  
    const product = await productRepository.create({name, price, description});
    await productRepository.save(product);
  
    res.status(201).json({ mensagem: "Produto criado com sucesso!", Product: newProduct });
    return;
  };
  
  // Listar todos os produtos
  public async listProducts(req: Request, res: Response){
    const products = await productRepository.find()
    res.status(200).json(products);
    return;
  };
  
  // Buscar um produto por ID
  public async findProductById(req: Request, res: Response){
    const id = Number(req.params.id);
    const product = await productRepository.findOneBy({id:id})
    if (!product) {
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }
    res.status(200).json(product);
    return;
  };

  public async findByName(req:Request, res: Response){
    const { name } = req.params;

    const product = await productRepository.findBy({name});

    if(!product){
      res.status(404).json({mensage: "Produto não encontrado"})
      return;
    }

    res.status(200).json(product)
  }
  
  // Atualizar um produto
  public async updateProducts(req: Request, res: Response){
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
  
    const product = await productRepository.findOneBy({id:id});
  
    if (!product) {
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }
    
    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;

    await productRepository.save(product)
  
    res.status(200).json({ mensagem: "Produto atualizado com sucesso!", product });
    return;
  };
  
  // Deletar um produto
  public async deleteProduct(req: Request, res: Response){
    const id = Number(req.params.id);
  
    if(!id){
      res.status(400).json({mensagem:"O id precisa ser fornecido!"})
      return;
    }
    const product = await productRepository.findOneBy({id:id})

    if(!product){
      res.status(404).json({ mensagem: "Produto não encontrado" });
      return;
    }

    await productRepository.delete(product)
    res.status(200).json({ mensagem: "Produto deletado com sucesso!" });
    return;
  };
  
}

