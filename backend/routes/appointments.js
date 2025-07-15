import express from "express";
import Appointment from "../models/Appointment.js";
const router = express.Router();

// Get all appointments for doctor, split by status
router.get("/doctor/:doctorId", async (req, res) => {
  const doctorId = req.params.doctorId;
  const all = await Appointment.find({ doctorId }).sort({ date: 1 });
  res.json({
    pending: all.filter(a => a.status === "pending"),
    approved: all.filter(a => a.status === "approved"),
  });
});

// Patient requests appointment
router.post("/request", async (req, res) => {
  const { doctorName ,doctorId, patientId, patientName, date } = req.body;

  // Log the incoming body
  console.log("Received appointment request:", req.body);

  if (!doctorId || !patientId || !patientName || !date)
    return res.status(400).json({ message: "All fields required" });

  const appt = new Appointment({ doctorId, patientId, patientName, date, doctorName});
  await appt.save();
  res.status(201).json(appt);
});


// Doctor approves a pending appointment
router.put("/:apptId/approve", async (req, res) => {
  const appt = await Appointment.findById(req.params.apptId);
  if (!appt) return res.status(404).json({ message: "Not found" });
  appt.status = "approved";
  await appt.save();
  res.json(appt);
});

// GET all appointments for a patient
router.get("/patient/:patientId", async (req, res) => {
  try {
    const appts = await Appointment.find({ patientId: req.params.patientId });
    res.json(appts);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE /api/appointments/:id
router.delete("/:id", async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.json({ message: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});



export default router;