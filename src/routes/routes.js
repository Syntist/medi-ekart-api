import express from "express";
import { login, register, verifyToken } from "../controller/auth.controller.js";
import {
  requiredAdmin,
  requiredAuth,
  requiredMedoxer,
  requiredProvider,
} from "../middleware/auth.middleware.js";
import {
  authorized,
  getUsersAdmin,
  unauthorized,
} from "../controller/admin.controller.js";
import {
  createMedicine,
  getMedicineProvider,
  getMedicinesProvider,
  updateMedicine,
} from "../controller/provider.controller.js";
import {
  approveMedicine,
  approveOrder,
  getMedicinesMedoxer,
  getOrdersMedoxer,
  rejectMedicine,
  rejectOrder,
} from "../controller/medoxer.controller.js";
import {
  getMedicinesUser,
  getOrdersUser,
} from "../controller/user.controller.js";
import createOrder from "../controller/order.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verifyLogin", verifyToken);

// User Routes

router.get("/medicines", requiredAuth, getMedicinesUser);
router.get("/order", requiredAuth, getOrdersUser);

// Admin Routes

router.get("/admin/users", requiredAuth, requiredAdmin, getUsersAdmin);
router.post(
  "/admin/authorized/:username",
  requiredAuth,
  requiredAdmin,
  authorized,
);
router.post(
  "/admin/unauthorized/:username",
  requiredAuth,
  requiredAdmin,
  unauthorized,
);

// Provider Routes

router.get(
  "/provider/medicines",
  requiredAuth,
  requiredProvider,
  getMedicinesProvider,
);

router.get(
  "/provider/medicine/:medicineId",
  requiredAuth,
  requiredProvider,
  getMedicineProvider,
);

router.post(
  "/provider/createMedicine",
  requiredAuth,
  requiredProvider,
  createMedicine,
);

router.post(
  "/provider/updateMedicine/:medicineId",
  requiredAuth,
  requiredProvider,
  updateMedicine,
);

// Medoxer Routes

router.get(
  "/medoxer/medicines",
  requiredAuth,
  requiredMedoxer,
  getMedicinesMedoxer,
);
router.post(
  "/medoxer/approveMedicine/:medicineId",
  requiredAuth,
  requiredMedoxer,
  approveMedicine,
);

router.post(
  "/medoxer/rejectMedicine/:medicineId",
  requiredAuth,
  requiredMedoxer,
  rejectMedicine,
);

router.get("/medoxer/orders", requiredAuth, requiredMedoxer, getOrdersMedoxer);
router.post(
  "/medoxer/approveOrder/:orderId",
  requiredAuth,
  requiredMedoxer,
  approveOrder,
);
router.post(
  "/medoxer/rejectOrder/:orderId",
  requiredAuth,
  requiredMedoxer,
  rejectOrder,
);

// Order
router.post("/order/create", requiredAuth, createOrder);

export default router;
