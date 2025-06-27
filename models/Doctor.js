import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  specialization: String,
  dob: String,
  drId: String,
  password: String,
  isVerified: { type: Boolean, default: false },
  uniqueId: String,
  username: {
  type: String,
  required: true,
  unique: true,
}
});

export default mongoose.model("Doctor", doctorSchema);
