import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  doctorName:{ type: String},
  doctorId: { type: String, required: true },
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
  patientName: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "approved"], default: "pending" },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", AppointmentSchema);
export default Appointment;
