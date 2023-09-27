import express from "express";
import { RAZORPAY_API_KEY } from "../config";
const router = express.Router();
import {
  orderController,
  registerController,
  loginController,
  userController,
  refreshController,
  logoutController,
  paymentController,
  productController,
} from "../controllers";
import auth from "../middlewares/auth";
import admin from "../middlewares/admin";
import multer from "multer";
// import pincodeController from "../controllers/pincodes";
import settingsController from "../controllers/settingController";

// router.get("/", (req, res) => {
//   res.send("HI MY Name Rehan");
// });
router.post("/api/register", registerController.register);
router.post("/api/login", loginController.login);
router.get("/api/me", auth, userController.me);
router.post("/api/refresh", refreshController.refreshToken);
router.post("/api/logout", auth, logoutController.logout);
router.post("/api/checkout", paymentController.checkout);
router.post("/api/address", paymentController.address);
router.post("/api/order", auth, orderController.order);
router.get("/api/orders", orderController.index);
router.put("/api/order/:id", [auth, admin], orderController.update);
router.post("/paymentverification", paymentController.paymentVerification);
router.get("/api/getkey", (req, res) => {
  res.status(200).json({ key: RAZORPAY_API_KEY });
});
router.get("/api/getsettings", settingsController.getSettings);
router.post("/api/updatesettings", settingsController.updateRestaurantStatus);
router.post("/api/deletepincode", settingsController.deletePincode);

// router.get("/api/pincode", pincodeController.store);
router.post("/api/addpincode", settingsController.addPincode);
// router.post("/api/deletepincode", pincodeController.deletePincode);
router.post("/api/addProduct", [auth, admin], productController.store);
router.put("/api/product/:id", [auth, admin], productController.update);
router.delete("/api/product/:id", [auth, admin], productController.delete);
router.get("/api/products", productController.index);

export default router;
