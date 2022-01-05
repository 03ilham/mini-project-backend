import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/:id", IndexCtrl.OrdersCtrl.findAll)
router.get("/cancel/:id", IndexCtrl.OrdersCtrl.cancelOrder)
router.post("/", IndexCtrl.OrdersCtrl.createOrders)

export default router