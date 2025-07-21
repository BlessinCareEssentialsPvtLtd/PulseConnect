import express from "express";
import PatientAccessRequest from "../models/PatientAccessRequest.js";
import TreatmentEntry from "../models/TreatmentEntry.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";

const router = express.Router();

// Doctor requests access to patient data
router.post("/request-access", async (req, res) => {
    const { doctorId, patientId } = req.body;
    if (!doctorId || !patientId) return res.status(400).json({ message: "doctorId and patientId required" });
    // Only one pending request at a time
    const existing = await PatientAccessRequest.findOne({ doctorId, patientId, status: "pending" });
    if (existing) return res.status(409).json({ message: "Request already pending" });
    const reqDoc = new PatientAccessRequest({ doctorId, patientId });
    await reqDoc.save();
    res.status(201).json(reqDoc);
});

// Patient views all access requests
router.get("/requests/:patientId", async (req, res) => {
    const requests = await PatientAccessRequest.find({ patientId: req.params.patientId }).sort({ createdAt: -1 });
    res.json(requests);
});

// Patient approves/declines a request
router.put("/requests/:requestId", async (req, res) => {
    const { status, durationMinutes } = req.body; // status: "approved" or "declined"
    const reqDoc = await PatientAccessRequest.findById(req.params.requestId);
    if (!reqDoc) return res.status(404).json({ message: "Request not found" });
    if (status === "approved") {
        // Set expiry
        const expiresAt = new Date(Date.now() + (durationMinutes || 60) * 60000);
        reqDoc.status = "approved";
        reqDoc.expiresAt = expiresAt;
    } else {
        reqDoc.status = "declined";
        reqDoc.expiresAt = null;
    }
    await reqDoc.save();
    res.json(reqDoc);
});

// Doctor checks if access is granted
router.get("/check-access", async (req, res) => {
    const { doctorId, patientId } = req.query;
    const reqDoc = await PatientAccessRequest.findOne({ doctorId, patientId, status: "approved" });
    if (!reqDoc || (reqDoc.expiresAt && reqDoc.expiresAt < new Date())) {
        return res.json({ access: false });
    }
    res.json({ access: true, expiresAt: reqDoc.expiresAt });
});

// Doctor fetches patient data (if access granted)
router.get("/patient-data", async (req, res) => {
    const { doctorId, patientId } = req.query;
    const reqDoc = await PatientAccessRequest.findOne({ doctorId, patientId, status: "approved" });
    if (!reqDoc || (reqDoc.expiresAt && reqDoc.expiresAt < new Date())) {
        return res.status(403).json({ message: "Access not granted or expired" });
    }
    const patient = await Patient.findOne({ uniqueId: patientId });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    res.json(patient);
});

// Doctor adds treatment entry
router.post("/treatment-entry", async (req, res) => {
    const { doctorId, patientId, diagnosis, prescription, notes } = req.body;
    // Check access
    const reqDoc = await PatientAccessRequest.findOne({ doctorId, patientId, status: "approved" });
    if (!reqDoc || (reqDoc.expiresAt && reqDoc.expiresAt < new Date())) {
        return res.status(403).json({ message: "Access not granted or expired" });
    }
    const entry = new TreatmentEntry({ doctorId, patientId, diagnosis, prescription, notes });
    await entry.save();
    res.status(201).json(entry);
});

// Patient views treatment entries
router.get("/treatment-entries/:patientId", async (req, res) => {
    const entries = await TreatmentEntry.find({ patientId: req.params.patientId }).sort({ createdAt: -1 });
    res.json(entries);
});

// Doctor searches for a patient by unique ID (for preview before requesting access)
router.get("/search-patient/:patientId", async (req, res) => {
    // console.log(req.params.patientId);
    const patient = await Patient.findOne({
        $or: [
            { email: new RegExp(`^${req.params.patientId}$`, 'i') },
            { username: new RegExp(`^${req.params.patientId}$`, 'i') },
            { uniqueId: new RegExp(`^${req.params.patientId}$`, 'i') },
        ],
    });
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    // Only return non-sensitive info
    const preview = {
        uniqueId: patient.uniqueId,
        fullName: patient.fullName,
        email: patient.email,
        gender: patient.gender,
        dob: patient.dob,
        phone: patient.phone,
        address: patient.address,
        district: patient.district,
    };
    res.json(preview);
});

// Get doctor info by uniqueId
router.get("/doctor/:doctorId", async (req, res) => {
    const doctor = await Doctor.findOne({ uniqueId: req.params.doctorId });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({
        fullName: doctor.fullName,
        email: doctor.email,
        specialization: doctor.specialization,
        experience: doctor.experience,
        photo: doctor.photo,
        uniqueId: doctor.uniqueId,
    });
});

// Get all patients for whom doctor has approved access (not expired)
router.get("/approved-patients/:doctorId", async (req, res) => {
    const now = new Date();
    // console.log("[DEBUG] doctorId:", req.params.doctorId);
    // console.log("[DEBUG] now:", now);
    const approved = await PatientAccessRequest.find({
        doctorId: req.params.doctorId,
        status: "approved",
        $or: [
            { expiresAt: null },
            { expiresAt: { $gt: now } },
        ],
    });
    // console.log("[DEBUG] approved requests:", approved);
    const patientIds = approved.map(r => r.patientId);
    // console.log("[DEBUG] patientIds:", patientIds);
    const patients = await Patient.find({ uniqueId: { $in: patientIds } });
    // console.log("[DEBUG] found patients:", patients);
    // Return basic info for each patient
    const result = patients.map(p => ({
        uniqueId: p.uniqueId,
        fullName: p.fullName,
        email: p.email,
        gender: p.gender,
        dob: p.dob,
        phone: p.phone,
        address: p.address,
        district: p.district,
    }));
    res.json(result);
});

export default router; 