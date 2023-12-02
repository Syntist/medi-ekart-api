import { ObjectId } from "mongodb";
import Medicine from "../model/Medicine.model.js";

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
