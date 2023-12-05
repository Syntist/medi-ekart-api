import { ObjectId } from "mongodb";
import Medicine from "../model/Medicine.model.js";
import User from "../model/User.model.js";

export const getMedicinesProvider = async (req, res) => {
  const medicines = await Medicine.find({ userId: req.user._id });
  if (medicines) return res.send(medicines);

  return res.status(400).send({ message: "No Medicines Found" });
};

export const getMedicineProvider = async (req, res) => {
  const medicineId = new ObjectId(req.params.medicineId);
  const medicine = await Medicine.findOne({
    _id: medicineId,
    userId: req.user._id,
  });
  if (medicine) return res.send(medicine);

  return res.status(400).send({ message: "No Medicine Found" });
};

export const createMedicine = async (req, res) => {
  const { body, user } = req;

  try {
    const medicine = await Medicine.create({
      ...body,
      userId: user._id,
      approved: false,
    });

    await User.findByIdAndUpdate(user._id, {
      $push: { medicines: medicine.id },
    });

    return res.send(medicine);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const updateMedicine = async (req, res) => {
  const medicineId = new ObjectId(req.params.medicineId);
  const { body, user } = req;

  const medicine = await Medicine.find({
    _id: medicineId,
    userId: user._id,
  });
  if (!medicine) {
    return res.status(401).send({ message: "Not authorized to update" });
  }

  const update = await Medicine.findByIdAndUpdate(
    medicineId,
    { ...body, approved: false },
    {
      new: true,
    },
  );
  return res.send(update);
};
