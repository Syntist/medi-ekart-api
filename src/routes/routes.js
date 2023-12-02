import express from "express";
import { login, register } from "../controller/auth.controller.js";
import { requiredAuth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/checkAuth", requiredAuth);

export default router;
