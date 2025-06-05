import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

const router = Router();
const orderController = new OrderController();

router.post("/product", orderController.createOrder);
router.get("/product", orderController.listOrders);
router.get("/product/:id", orderController.findOrderById);
router.put("/product/:id", orderController.updateOrder);
router.delete("/product/:id", orderController.deleteOrder);

export default router;