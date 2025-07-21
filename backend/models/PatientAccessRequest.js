import mongoose from "mongoose";

const patientAccessRequestSchema = new mongoose.Schema({
    doctorId: { type: String, required: true }, // Doctor.uniqueId
    patientId: { type: String, required: true }, // Patient.uniqueId
    status: { type: String, enum: ["pending", "approved", "declined"], default: "pending" },
    expiresAt: { type: Date }, // null if not approved or no expiry
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("PatientAccessRequest", patientAccessRequestSchema); 