import express from "express";
import { sendOTP, sendUniqueID } from "../utils/sendOtp.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import slugify from "slugify";
import bcrypt from "bcrypt";

const router = express.Router();
const otps = {}; // In-memory temp OTP storage

// === Doctor Signup ===
router.post("/signup/doctor", async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otps[email] = { otp, data: req.body };

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent to doctor email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// === Patient Signup ===
router.post("/signup/patient", async (req, res) => {
  const { email } = req.body;

  try {
    const existing = await Patient.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otps[email] = { otp, data: req.body };

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent to patient email" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// === Unique ID Generator ===
const generateUniqueId = (name, dob, role) => {
  const namePrefix = name.slice(0, 2).toUpperCase();
  const dobYear = dob.slice(2, 4);
  const roleCode = role === "doctor" ? "DR" : "PT";
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${namePrefix}${dobYear}${roleCode}-${random}`;
};

// === Username Generator === (only for doctor)
const generateUniqueUsername = async (name, dob) => {
  const base = slugify(`dr.${name.split(" ")[0]}${dob.replace(/-/g, "").slice(2)}`, {
    lower: true,
    strict: true,
  });

  let username = base;
  let counter = 1;

  while (await Doctor.findOne({ username })) {
    username = `${base}${counter}`;
    counter++;
  }

  return username;
};

// === OTP Verification Route ===
router.post("/verify", async (req, res) => {
  const { email, otp, type } = req.body;
  const stored = otps[email];

  if (!stored || stored.otp != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const { name, dob } = stored.data;

  // Generate unique ID
  let uniqueId;
  let isUnique = false;
  for (let attempts = 0; attempts < 5 && !isUnique; attempts++) {
    const tempId = generateUniqueId(name, dob, type);
    const exists =
      type === "doctor"
        ? await Doctor.findOne({ uniqueId: tempId })
        : await Patient.findOne({ uniqueId: tempId });

    if (!exists) {
      uniqueId = tempId;
      isUnique = true;
    }
  }

  if (!isUnique) {
    return res.status(500).json({ message: "Failed to generate unique ID" });
  }

  try {
    const hashedPassword = await bcrypt.hash(stored.data.password, 10);
    const userData = {
      ...stored.data,
      password: hashedPassword,
      isVerified: true,
      uniqueId,
    };

    if (type === "doctor") {
      const username = await generateUniqueUsername(name, dob);
      const doctor = new Doctor({ ...userData, username });
      await doctor.save();
      await sendUniqueID(email, uniqueId, username, "doctor");
    } else {
      const patient = new Patient({ ...userData });
      await patient.save();
      await sendUniqueID(email, uniqueId, "", "patient");
    }

    delete otps[email];
    res.status(200).json({ message: "Verified successfully", uniqueId });
  } catch (err) {
    console.error("Error saving user:", err);
    res.status(500).json({ message: "Error saving to database" });
  }
});

// === Doctor Login ===
router.post("/login/doctor", async (req, res) => {
  const { identifier, password, method } = req.body;

  try {
    if (!["email", "uniqueId", "username"].includes(method)) {
      return res.status(400).json({ message: "Invalid login method" });
    }

    const doctor = await Doctor.findOne({ [method]: identifier });
    if (!doctor) return res.status(401).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    if (!doctor.isVerified) return res.status(403).json({ message: "Account not verified" });

    res.status(200).json({
      message: "Login successful",
      doctor: {
        name: doctor.name,
        uniqueId: doctor.uniqueId,
        email: doctor.email,
        gender: doctor.gender,
        specialization: doctor.specialization,
        dob: doctor.dob,
        place: doctor.place,
        city: doctor.city,
        taluka: doctor.taluka,
        district: doctor.district,
        state: doctor.state,
        nation: doctor.nation,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/login/patient", async (req, res) => {
  const { identifier, password, method } = req.body;

  try {
    if (!["email", "uniqueId", "username"].includes(method)) {
      return res.status(400).json({ message: "Invalid login method" });
    }

    const query = {};
    query[method] = identifier;

    const patient = await Patient.findOne(query);
    if (!patient) {
      return res.status(401).json({ message: "Patient not found" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!patient.isVerified) {
      return res.status(403).json({ message: "Account not verified" });
    }

    // ✅ Return full safe patient info, including `username` and `photo`
    res.status(200).json({
      message: "Login successful",
       patient: {
          name: patient.name,
          username: patient.username,   // <-- ADD THIS
          email: patient.email,
          uniqueId: patient.uniqueId,
          phone: patient.phone,
          gender: patient.gender,
          dob: patient.dob,
          place: patient.place,
          city: patient.city,
          taluka: patient.taluka,
          district: patient.district,
          state: patient.state,
          nation: patient.nation,
          photo: patient.photo,         // <-- AND THIS
        },
      });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});



// === Email Check Route === (Doctor + Patient)
router.post("/check-email", async (req, res) => {
  const { email, type } = req.body;

  try {
    let exists = false;
    if (type === "doctor") {
      exists = !!(await Doctor.findOne({ email }));
    } else if (type === "patient") {
      exists = !!(await Patient.findOne({ email }));
    }

    res.json({ exists });
  } catch {
    res.status(500).json({ exists: false });
  }
});

router.post("/check-username", async (req, res) => {
  const { username } = req.body;
  try {
    const patient = await Patient.findOne({ username });
    res.json({ exists: !!patient });
  } catch {
    res.status(500).json({ exists: true });
  }
});


// === Doctor Search by Name ===
router.get("/doctors", async (req, res) => {
  const { search } = req.query;

  if (!search) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const doctors = await Doctor.find({
      name: { $regex: search, $options: "i" }, // case-insensitive match
    }).limit(10); // optional: limit results

  // Return only safe public data
  const result = doctors.map((doc) => ({
      _id: doc._id,
      name: doc.name,
      specialization: doc.specialization,
      uniqueId: doc.uniqueId,
      photo: doc.photo,
      place: `${doc.place}, ${doc.city}, ${doc.district}, ${doc.state}, ${doc.nation}`, // 👈 full address
  }));


    res.status(200).json(result);
  } catch (err) {
    console.error("Doctor search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});




export default router;
