import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/:id",IndexCtrl.AdressCtrl.findOneAddress)
router.post("/:id",IndexCtrl.AdressCtrl.createRow)
router.put("/update/:id", IndexCtrl.AdressCtrl.updateAdress)
router.delete("/:id", IndexCtrl.AdressCtrl.deleteAddress)

export default router;