import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.HouseReviewsCtrl.findAllRows)
router.post("/", IndexCtrl.HouseReviewsCtrl.create)
router.put("/:id", IndexCtrl.HouseReviewsCtrl.update)
router.delete("/:id", IndexCtrl.HouseReviewsCtrl.deleteRows)
router.get("/:id", IndexCtrl.HouseReviewsCtrl.findById)

export default router; 