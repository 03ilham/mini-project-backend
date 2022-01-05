import { Router } from "express";
import AuthJwt from "../helpers/AuthJWT";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

router.post("/signin", AuthJwt.authenticate, AuthJwt.login);
router.post("/signup", IndexCtrl.UserCtrl.signup, IndexCtrl.AdressCtrl.create);

export default router;
