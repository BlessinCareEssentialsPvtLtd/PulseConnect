// backend/models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patient: String,
  p_id: String,
  doctor: String,
  specialty: String,
  date: String,
  time: String,
  notes: String,
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Rejected", "Completed"],
    default: "Pending",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
