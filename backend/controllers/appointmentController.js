// controllers/appointmentController.js
import Appointment from "../models/Appointment.js";

// Create
exports.createAppointment = async (req, res) => {
    try {
        const newAppt = await Appointment.create(req.body);
        res.status(201).json(newAppt);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Read All (auto-complete past confirmed appointments)
exports.getAppointments = async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
        const allAppointments = await Appointment.find();

        const updatedAppointments = await Promise.all(
            allAppointments.map(async (appt) => {
                if (appt.status === "Confirmed" && appt.date < today) {
                    appt.status = "Completed";
                    await appt.save();
                }
                return appt;
            })
        );

        res.json(updatedAppointments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Update
exports.updateAppointment = async (req, res) => {
    try {
        const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete
exports.deleteAppointment = async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
