import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  gender: String,
  dob: String,
  password: String,
  isVerified: { type: Boolean, default: false },
  uniqueId: String,
});

export default mongoose.model("Patient", patientSchema);
