import { Router } from "express";
import { UserController } from "../controllers/UserController"

const router = Router();
const userController:UserController = new UserController()

router.get("/users", userController.list);
router.post("/users", userController.create)
router.get("/users/:id", userController.show)
router.put("/users/:id", userController.update)
router.delete("/user/:id", userController.delete)

export default router;