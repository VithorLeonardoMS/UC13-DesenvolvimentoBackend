import { User } from "../models/User";
import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import bcrypt from "bcryptjs";

const UserRepository = AppDataSource.getRepository(User);

export class UserController {
  async createUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if(!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const existEmail = await UserRepository.findOneBy({ email });

    if (existEmail) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }
    const user = new User(email, password);
    const newUser = UserRepository.create(user);
    await UserRepository.save(newUser);

    res
      .status(201)
      .json({ message: "User created successfully!", usuario: newUser });
    return;
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password are required" });
      return;
    }

    const existEmail = await UserRepository.findOneBy({ email });

    if (!existEmail) {
      res.status(404).json({ message: "Email invalido" });
      return;
    }

    const isValid = await bcrypt.compare(password, existEmail.password);

    if (!isValid) {
      res.status(401).json({ message: "Senha invalida" });
      return;
    }

    res.status(200).json({ message: "Login realizado com sucesso!" });
    return;
  }
}