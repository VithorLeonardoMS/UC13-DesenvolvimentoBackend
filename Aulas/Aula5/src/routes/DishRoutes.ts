import { Router } from "express";
import { DishController } from "../controllers/DishController";

const router = Router();
const dishController = new DishController();

router.post("/product", dishController.createDish);
router.get("/product", dishController.listDishes);
router.get("/product/:id", dishController.findDishById);
router.get("/product/name/:name",dishController.findByName)
router.put("/product/:id", dishController.updateDish);
router.delete("/product/:id", dishController.deleteDish);

export default router;