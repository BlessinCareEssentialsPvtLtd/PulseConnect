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
  username: { type: String, unique: true },


  // Add these fields for address info
  place: String,
  city: String,
  taluka: String,
  district: String,
  state: String,
  nation: String,
});

export default mongoose.model("Patient", patientSchema);
