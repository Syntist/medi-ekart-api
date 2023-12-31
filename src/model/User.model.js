import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["admin", "user", "provider", "modexer"],
    required: true,
  },
  authorized: {
    type: Boolean,
    default: false, // Set a default value if needed
  },
  medicines: [
    {
      type: Schema.Types.ObjectId,
      ref: "Medicine",
    },
  ],
});

const User = model("User", userSchema);

export default User;
