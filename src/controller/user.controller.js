import { ObjectId } from "mongodb";
import User from "../model/User.model.js";
import Medicine from "../model/Medicine.model.js";
import Order from "../model/Order.model.js";

export const getOrdersUser = async (req, res) => {
  const { user } = req;
  const orders = await Order.find({ userId: user._id }).populate({
    path: "medicines.medicine",
    model: "Medicine",
  });

  if (orders) return res.send(orders);

  return res.status(403).send({ message: "Order Not Found" });
};

export const getUser = async (req, res) => {
  const id = new ObjectId(req.user.id);

  const user = await User.findOne(id).select("-password");
  if (user) return res.send(user);

  return res.status(400).send({ message: "Not Found" });
};

export const getMedicinesUser = async (req, res) => {
  const medicines = await Medicine.find({ approved: true });
  if (medicines) return res.send(medicines);

  return res.status(400).send({ message: "No Medicines Found" });
};
