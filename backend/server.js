const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
dotenv.config();


app.use(cors()); // Allow all origins
const appointmentRoutes = require("./routes/appointments");

// Middleware
app.use(express.json()); // Parse JSON bodies

// Routes
app.use("/api/appointments", appointmentRoutes);

const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI;


mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));
// Start server

app.listen(PORT, () => {
  console.log(`App is listening on Port 8080`);
});
