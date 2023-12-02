import Medicine from "../model/Medicine.model.js";
import Order from "../model/Order.model.js";

const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { medicines } = req.body;

    const areAllMedicinesApproved = await Promise.all(
      medicines.map(async (med) => {
        const medicine = await Medicine.findById(med.medicineId);
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
      medicines: medicines.map((med) => ({
        medicine: med.medicineId,
        quantity: med.quantity,
      })),
      status: "pending",
    });

    await order.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", order });
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default createOrder;
