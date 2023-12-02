import mongoose from "mongoose";

const { Schema, model } = mongoose;

const medicineSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
  name: {
    type: String,
    required: true,
  },
  manufacturer: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  prescriptionRequired: {
    type: Boolean,
    default: false, // Set a default value if needed
  },
  approved: {
    type: Boolean,
    default: false, // Set a default value if needed
  },
  // You can add more fields based on your requirements
});

const Medicine = model("Medicine", medicineSchema);

export default Medicine;
