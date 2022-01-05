import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router()

router.get("/:id", IndexCtrl.HousesReserveLinesCtrl.findAll);
router.post("/succes/", IndexCtrl.HousesReserveLinesCtrl.findByOrder);
router.post("/", IndexCtrl.HousesReserveLinesCtrl.createRows);
router.delete("/delete/:id", IndexCtrl.HousesReserveLinesCtrl.deleteRows);
router.put("/:id", IndexCtrl.HousesReserveLinesCtrl.updateRows);

export default router