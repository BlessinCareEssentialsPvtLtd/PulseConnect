import express from "express";
import Request from "../models/Request";

const router = express.Router();


// Example GET route
router.post("/request/access", async (req, res) => {

    const { patientUID, patientName, doctorID, doctorName } = req.body;

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 3); // Set expiration to 24 hours from now

    try {

        if (!patientUID || !patientName || !doctorID || !doctorName) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRequest = new Request({
            patientUID,
            PatientName: patientName,
            doctorID,
            doctorName,
            expiresAt
        });

        const savedRequest = await newRequest.save();
        res.status(201).json({ message: "Request created successfully", request: savedRequest });

    } catch (error) {
        console.error("Error creating request:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

});

router.post("/request/access/:requestId/approve", async (req, res) => {

})

export default router;