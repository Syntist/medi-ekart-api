import { ObjectId } from "mongodb";
import Medicine from "../model/Medicine.model.js";
import Order from "../model/Order.model.js";
import { stripPayment } from "../utils/stripe.js";

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { body } = req;
    const { medicines } = body;

    const areAllMedicinesApproved = await Promise.all(
      medicines.map(async (med) => {
        const medicine = await Medicine.findById(new ObjectId(med.medicineId));

        return medicine && medicine.approved;
      }),
    );

    if (!areAllMedicinesApproved.every(Boolean)) {
      return res.status(400).send({
        message: "Some medicines are not approved and cannot be ordered.",
      });
    }

    const order = new Order({
      userId,
      ...body,
      medicines: medicines.map((med) => ({
        medicine: med.medicineId,
        quantity: med.quantity,
      })),
      status: "pending",
    });

    const link = await stripPayment(
      await order.populate([
        "userId",
        {
          path: "medicines.medicine",
          model: "Medicine",
        },
      ]),
    );

    await order.save();

    return res.status(201).json({ url: link.url });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export default createOrder;
