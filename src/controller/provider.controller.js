import { ObjectId } from "mongodb";
import Medicine from "../model/Medicine.model.js";
import User from "../model/User.model.js";

export const getMedicinesProvider = async (req, res) => {
  const medicines = await Medicine.find({ userId: req.user._id });
  if (medicines) return res.send(medicines);

  return res.status(400).send({ message: "No Medicines Found" });
};

export const createMedicine = async (req, res) => {
  const { body } = req;

  try {
    const medicine = await Medicine.create({
      ...body,
      userId: req.user._id,
      approve: false,
    });

    await User.findByIdAndUpdate(req.user._id, {
      $push: { medicines: medicine.id },
    });

    return res.send(medicine);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const updateMedicine = async (req, res) => {
  const medicineId = new ObjectId(req.params.medicineId);
  const { body } = req;

  const medicine = await Medicine.find({
    id: medicineId,
    userId: req.user._id,
  });
  if (!medicine) {
    return res.status(401).send({ message: "Not authorized to update" });
  }

  const update = await Medicine.findByIdAndUpdate(
    medicineId,
    { ...body, approve: false },
    {
      new: true,
    },
  );
  return res.send(update);
};
