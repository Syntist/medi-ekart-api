import mongoose from "mongoose";
import Medicine from "./Medicine.model.js";
import { generateShippingLabel } from "../utils/shippingLabel.js";

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
  state: {
    type: String,
    required: true,
  },
  insuranceCompany: {
    type: String, // Adjust the type based on your requirements
    required: true,
  },
  policyNumber: {
    type: String, // Adjust the type based on your requirements
    required: true,
  },
  trackingNumber: {
    type: String,
  },
  label: {
    type: String,
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
      const order = await this.model.findById(orderId).populate("userId");

      const shipInfo = {
        name: `${order.userId.firstName} ${order.userId.lastName}`,
        address_line1: order.address,
        city_locality: order.city,
        state_province: order.state,
        postal_code: order.zipCode,
        country_code: "US",
        address_residential_indicator: "yes",
      };

      const label = await generateShippingLabel(shipInfo);

      update.trackingNumber = label.tracking_number;
      update.label = label.label_download.pdf;
      update.status = "shipped";

      console.log(`Order ${this.getQuery()._id} is being updated to shipped.`);
    } else if (update && update.status === "rejected") {
      const existingOrder = await this.model.findById(orderId);

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
