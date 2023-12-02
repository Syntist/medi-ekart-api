import express from "express";
import { login, register } from "../controller/auth.controller.js";
import {
  requiredAdmin,
  requiredAuth,
  requiredMedoxer,
  requiredProvider,
} from "../middleware/auth.middleware.js";
import { authorized, getUsersAdmin } from "../controller/admin.controller.js";
import {
  createMedicine,
  getMedicinesProvider,
  updateMedicine,
} from "../controller/provider.controller.js";
import {
  approveMedicine,
  approveOrder,
  getMedicinesMedoxer,
  getOrdersMedoxer,
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
router.get("/checkAuth", requiredAuth);

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

// Provider Routes

router.get(
  "/provider/medicines",
  requiredAuth,
  requiredProvider,
  getMedicinesProvider,
);

router.post(
  "/provider/createMedicine",
  requiredAuth,
  requiredProvider,
  createMedicine,
);
router.put(
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

router.get("/medoxer/orders", requiredAuth, requiredMedoxer, getOrdersMedoxer);
router.put(
  "/medoxer/approveOrder/:orderId",
  requiredAuth,
  requiredMedoxer,
  approveOrder,
);
router.put(
  "/medoxer/rejectOrder/:orderId",
  requiredAuth,
  requiredMedoxer,
  rejectOrder,
);

// Order
router.get("/order/create", requiredAuth, createOrder);

export default router;
