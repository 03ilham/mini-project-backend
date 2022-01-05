import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.get("/:id", IndexCtrl.UserCtrl.findAllRows);
router.post("/signup", IndexCtrl.UserCtrl.signup);

router.post(
  "/daftar",
  IndexCtrl.UserCtrl.daftarAccount,
  IndexCtrl.AdressCtrl.createAddres
);

router.get("/signin", IndexCtrl.UserCtrl.signin);
router.put("/:id", IndexCtrl.UserCtrl.updateOneUsers);
router.put("/update/password/:id", IndexCtrl.UserCtrl.updateUser);
router.delete("/:id", IndexCtrl.UserCtrl.deleteUsers);

export default router;
