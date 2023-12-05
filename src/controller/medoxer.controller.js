import { ObjectId } from "mongodb";
import Medicine from "../model/Medicine.model.js";
import Order from "../model/Order.model.js";
import { checkPurchase } from "../utils/stripe.js";

export const getMedicinesMedoxer = async (req, res) => {
  const medicines = await Medicine.find();
  if (medicines) return res.send(medicines);

  return res.status(400).send({ message: "No Medicines Found" });
};

export const approveMedicine = async (req, res) => {
  const medicineId = new ObjectId(req.params.medicineId);

  const medicine = await Medicine.findById(medicineId);

  if (!medicine) return res.status(401).send({ message: "Medicine Not Found" });

  const updateMedicine = await Medicine.findByIdAndUpdate(
    medicineId,
    { approved: true },
    {
      new: true,
    },
  );
  return res.send(updateMedicine);
};

export const rejectMedicine = async (req, res) => {
  const medicineId = new ObjectId(req.params.medicineId);

  const medicine = await Medicine.findById(medicineId);

  if (!medicine) return res.status(401).send({ message: "Medicine Not Found" });

  const updateMedicine = await Medicine.findByIdAndUpdate(
    medicineId,
    { approved: false },
    {
      new: true,
    },
  );
  return res.send(updateMedicine);
};

export const getOrdersMedoxer = async (req, res) => {
  const orders = await Order.find().populate([
    {
      path: "medicines.medicine",
      model: "Medicine",
    },
    "userId",
  ]);

  if (orders) return res.send(orders);

  return res.status(403).send({ message: "Order Not Found" });
};

export const approveOrder = async (req, res) => {
  const orderId = new ObjectId(req.params.orderId);

  const order = await Order.findById(orderId);

  if (!order) return res.status(401).send({ message: "Order Not Found" });

  if (await checkPurchase(orderId.toString())) {
    const updateOrder = await Order.findByIdAndUpdate(
      orderId,
      { status: "approved" },
      {
        new: true,
      },
    );
    return res.send(updateOrder);
  }

  return res.status(401).send({ message: "Could not Approve at the Moment" });
};

export const rejectOrder = async (req, res) => {
  const orderId = new ObjectId(req.params.orderId);

  const order = await Order.findById(orderId);

  if (!order) return res.status(401).send({ message: "Order Not Found" });

  const updateOrder = await Order.findByIdAndUpdate(
    orderId,
    { status: "rejected" },
    {
      new: true,
    },
  );
  return res.send(updateOrder);
};
