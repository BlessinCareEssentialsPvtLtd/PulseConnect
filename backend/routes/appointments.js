// routes/appointments.js
const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

const {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment
} = require("../controllers/appointmentController");

router.post("/", createAppointment);
router.get("/", getAppointments);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);




// PUT /api/appointments/:id/status
router.put("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Confirmed", "Pending", "Rejected", "Completed"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({ message: "Failed to update status" });
  }
});

module.exports = router;

