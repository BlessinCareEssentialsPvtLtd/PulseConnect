import express from "express";
import Patient from "../models/Patient.js";
import { authenticateJWT } from "../middleware/auth.js";
const router = express.Router();

// Update or complete patient profile
router.put("/profile/:id", authenticateJWT, async (req, res) => {
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

export default router;
