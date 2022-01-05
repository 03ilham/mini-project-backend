import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.HouseImagesCtrl.findAll);
router.post("/", IndexCtrl.HouseImagesCtrl.cretaeRow);
router.put("/:id", IndexCtrl.HouseImagesCtrl.updateRow);
router.delete("/:id", IndexCtrl.HouseImagesCtrl.deleteImages);

export default router;
