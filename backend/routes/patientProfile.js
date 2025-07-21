import express from "express";
import Patient from "../models/Patient.js";

const router = express.Router();

// Update or complete patient profile
router.put("/profile/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, isCompleted: true } },
      { new: true }
    );
    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res
      .status(200)
      .json({ message: "Profile updated", patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET patient by partial uniqueId
router.get("/profile/uniqueId/:uniqueId", async (req, res) => {
  try {
    const patients = await Patient.find({
      uniqueId: { $regex: req.params.uniqueId, $options: "i" }
    }).select("fullName username email uniqueId ");

    if (patients.length === 0) {
      return res.status(404).json({ message: "No matching patients found" });
    }

    res.status(200).json(patients);
  } catch (err) {
    console.error("Error fetching patient:", err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
