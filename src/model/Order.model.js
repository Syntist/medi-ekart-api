import mongoose from "mongoose";
import Medicine from "./Medicine.model.js";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medicines: [
    {
      medicine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Medicine",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
      },
    },
  ],
  prescriptionUrl: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "shipped", "rejected", "delivered"],
    default: "pending",
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
});

orderSchema.pre("save", async function (next) {
  try {
    // Fetch all medicines with their quantities
    const populatedMedicines = await Promise.all(
      this.medicines.map(async (item) => {
        const medicine = await Medicine.findById(item.medicine);
        if (!medicine) {
          throw new Error("Medicine not found");
        }

        return {
          medicine,
          quantity: item.quantity,
        };
      }),
    );

    const total = populatedMedicines.reduce(
      (acc, item) => acc + item.medicine.price * item.quantity,
      0,
    );

    this.totalPrice = total;

    // Update the stock and perform other checks as before
    await Promise.all(
      populatedMedicines.map(async (item) => {
        const { medicine, quantity } = item;

        if (medicine.prescriptionRequired && !this.prescriptionUrl) {
          throw new Error(`Prescription Required for ${medicine.name}`);
        } else if (medicine.stock < quantity) {
          throw new Error(`Insufficient stock for ${medicine.name}`);
        }

        medicine.stock -= quantity;
        await medicine.save();
      }),
    );

    next();
  } catch (error) {
    next(error);
  }
});

orderSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    const orderId = this.getQuery()._id;

    if (update && update.status === "approved") {
      update.status = "shipped";

      // Perform any additional actions related to the transition
      console.log(`Order ${this.getQuery()._id} is being updated to shipped.`);
    } else if (update && update.status === "rejected") {
      // Fetch the order details before the update
      const existingOrder = await this.model.findById(orderId);

      // Perform actions based on the existing order before the update
      await Promise.all(
        existingOrder.medicines.map(async (item) => {
          const medicine = await Medicine.findById(item.medicine);
          if (!medicine) {
            throw new Error("Medicine not found");
          }

          // Restore the quantity back to the stock
          medicine.stock += item.quantity;
          await medicine.save();
        }),
      );

      console.log(`Order ${orderId} is being updated to rejected.`);
    }

    return next();
  } catch (error) {
    console.error("Error in pre-update hook:", error);
    return next(error);
  }
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
