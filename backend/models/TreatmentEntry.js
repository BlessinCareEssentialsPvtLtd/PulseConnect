import mongoose from "mongoose";

const treatmentEntrySchema = new mongoose.Schema({
    doctorId: { type: String, required: true }, // Doctor.uniqueId
    patientId: { type: String, required: true }, // Patient.uniqueId
    diagnosis: { type: String, required: true },
    prescription: [{
        drug: String,
        dosage: String,
        times: String,
    }],
    notes: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TreatmentEntry", treatmentEntrySchema); 