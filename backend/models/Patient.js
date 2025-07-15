import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  email: String,
  uniqueId: String,
  username: { type: String, unique: true },
  phone: String,
  gender: String,
  dob: String,
  password: String,
  isVerified: { type: Boolean, default: false },



  // Add these fields for address info
  place: String,
  city: String,
  taluka: String,
  district: String,
  state: String,
  nation: String,
  photo: { type: String }, 
});

export default mongoose.model("Patient", patientSchema);
