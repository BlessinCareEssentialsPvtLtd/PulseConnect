import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  gender: String,
  specialization: String,
  dob: String,
  drId: String,
  password: String,
  isVerified: { type: Boolean, default: false },
  uniqueId: { type: String, unique: true },
  username: { type: String, unique: true },
  place: String,
  city: String,
  taluka: String,
  district: String,
  state: String,
  nation: String
});

export default mongoose.model("Doctor", doctorSchema);
