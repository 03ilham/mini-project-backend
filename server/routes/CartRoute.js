import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";

const router = Router();

//cretae line item
//sukksess
router.post(
  "/items/:id",
  IndexCtrl.CartCtrl.cekUser,
  IndexCtrl.CartCtrl.cekcart,
  IndexCtrl.CartCtrl.create,
  IndexCtrl.CartCtrl.findoutBedroom,
  IndexCtrl.CartCtrl.findoutHouses,
  IndexCtrl.CartCtrl.cekline,
  IndexCtrl.CartCtrl.cretaeLine,
);

//create order
router.post(
  "/order/:id",
  IndexCtrl.CartCtrl.cekUser,
  IndexCtrl.CartCtrl.cekcart,
  IndexCtrl.CartCtrl.findqty,
  IndexCtrl.CartCtrl.payment,
  IndexCtrl.CartCtrl.cekord,
  IndexCtrl.CartCtrl.createOrder,
  IndexCtrl.CartCtrl.closeCart,
  IndexCtrl.CartCtrl.cekLine
);

//update order
router.put(
  "/update/:id",
  IndexCtrl.CartCtrl.cekUser,
  IndexCtrl.CartCtrl.cekcartCloses,
  IndexCtrl.CartCtrl.cekord,
  IndexCtrl.CartCtrl.cekCartClose,
  IndexCtrl.CartCtrl.findqty,
  IndexCtrl.CartCtrl.cekord,
  IndexCtrl.CartCtrl.updateOrder,
  IndexCtrl.CartCtrl.checkPay
);

//untuk cancel order
//suksess
router.put(
  "/cencel/:id",
  IndexCtrl.CartCtrl.cekUser,
  IndexCtrl.CartCtrl.cekord,
  IndexCtrl.CartCtrl.censelOrder
);

//update line item
router.put(
  "/update/line/:id",
  IndexCtrl.CartCtrl.cekUser,
  IndexCtrl.CartCtrl.cekcart,
  IndexCtrl.CartCtrl.findoutBedroom,
  IndexCtrl.CartCtrl.findoutHouses,
  IndexCtrl.CartCtrl.cekline,
  IndexCtrl.CartCtrl.updateLineItem
);

export default router;
