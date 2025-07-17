import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  uniqueId: { type: String, required: true, unique: true },
  phone: { type: String },
  dob: { type: String },
  gender: { type: String },
  photo: { type: String },
  state: { type: String },
  district: { type: String },
  address: { type: String },
  pinCode: { type: String },
  emergencyContact: { type: String },
  bloodGroup: { type: String },
  height: { type: String },
  weight: { type: String },
  pastDiseases: { type: String },
  chronicDiseases: { type: String },
  familyMedHistory: { type: String },
  lifestyleHabits: { type: String },
  allergies: { type: String },
  isVerified: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
});

export default mongoose.model("Patient", patientSchema);
