import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.HouseBedroomsCtrl.findAllRows);
router.post("/", IndexCtrl.HouseBedroomsCtrl.createBedroom);
router.get("/:id", IndexCtrl.HouseBedroomsCtrl.findById);
router.put("/:id", IndexCtrl.HouseBedroomsCtrl.updateBedroom);
router.delete("/:id", IndexCtrl.HouseBedroomsCtrl.deleteBedroom);

export default router;
