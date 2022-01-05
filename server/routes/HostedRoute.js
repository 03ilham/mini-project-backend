import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/", IndexCtrl.HostedCtrl.findAllRows);
router.post("/", IndexCtrl.HostedCtrl.createRows);
router.get("/:id", IndexCtrl.HostedCtrl.findById);
router.put("/:id", IndexCtrl.HostedCtrl.updateRows);
router.delete("/:id", IndexCtrl.HostedCtrl.deleteRows);

export default router;
