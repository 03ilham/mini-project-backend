import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/:id", IndexCtrl.HousesReserveCtrl.findAllRows);
router.get("/sucess/:id", IndexCtrl.HousesReserveCtrl.findByOrder);
router.post("/", IndexCtrl.HousesReserveCtrl.createRows);
router.get("/:id", IndexCtrl.HousesReserveCtrl.findById);
router.put("/:id", IndexCtrl.HousesReserveCtrl.updateRows);
router.delete("/:id", IndexCtrl.HousesReserveCtrl.deleteRows);

export default router;