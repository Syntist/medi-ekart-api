import jwt from "jsonwebtoken";

import User from "../model/User.model.js";

export const requiredAuth = async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ username: decoded.username });
    if (!user.authorized) return res.status(401);

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
};

export const requiredAdmin = async (req, res, next) => {
  if (req.user?.type === "admin") return next();

  return res.sendStatus(401);
};

export const requiredProvider = async (req, res, next) => {
  if (req.user?.type === "provider") return next();

  return res.sendStatus(401);
};

export const requiredMedoxer = async (req, res, next) => {
  if (req.user?.type === "medoxer") return next();

  return res.sendStatus(401);
};
