import mongoose from "mongoose";

const connectionString = process.env.ATLAS_URI || "";

// Connect to MongoDB
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listener for successful connection
db.on("connected", () => {
  console.log("Connected to MongoDB");
});

// Event listener for connection errors
db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Event listener for disconnection
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

export default db;
