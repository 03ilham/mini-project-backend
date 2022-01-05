import { Router } from "express";
import IndexCtrl from "../controller/IndexCtrl";
import UpDownloadHelpers from "../helpers/UpDownloadHelpers";

const router = Router();

router.get("/", IndexCtrl.HousesCtrl.findAll);

router.post("/paging/", IndexCtrl.HousesCtrl.housesPaging);

router.get('/paging/:id', IndexCtrl.HousesCtrl.housesPaging);

router.get("/one/:id", IndexCtrl.HousesCtrl.findOne);

// untuk insert lebih dari 1 images one to many ke table house_images
router.post(
  "/createImages",
  IndexCtrl.HousesCtrl.createHouseImages,
  IndexCtrl.HouseImagesCtrl.createHouseImages,
  IndexCtrl.HouseImagesCtrl.findHouseImageById
);

// untuk upload 1 images
router.post(
  "/one",
  IndexCtrl.HousesCtrl.createSingleImages,
  IndexCtrl.HouseImagesCtrl.createHouseImages,
  IndexCtrl.HouseImagesCtrl.findHouseImageById
);

router.post(
  "/singgle",
  IndexCtrl.HostedCtrl.createHosted,
  IndexCtrl.HousesCtrl.createSingleImages,
  IndexCtrl.HouseImagesCtrl.createHouseImages,
  IndexCtrl.HousesCtrl.findHouses
);

// untuk menampilkan images
router.get("/images/:filename", UpDownloadHelpers.showProductImage);

// update house + images
router.put("/:id", IndexCtrl.HousesCtrl.updateHouseImages);

router.put("/update/:id", IndexCtrl.HousesCtrl.updateRows);

router.get("/:id", IndexCtrl.HousesCtrl.findById);
router.delete("/:id", IndexCtrl.HousesCtrl.deleteHouses);

export default router;
