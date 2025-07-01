import express from "express";
import { v4 as uuidv4 } from "uuid";
import { sendOTP, sendUniqueID } from "../utils/sendOtp.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import slugify from "slugify";
import bcrypt from "bcrypt";


const router = express.Router();

const otps = {}; // temp memory

// === Doctor Signup ===
router.post("/signup/doctor", async (req, res) => {
  const { name, email, gender, specialization, dob, drId, password, place, city, taluka, district, state, nation } = req.body;

  try {
    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

  const otp = Math.floor(100000 + Math.random() * 900000);

  otps[email] = { otp, data: { name, email, gender, specialization, dob, drId, password, place, city, taluka, district, state, nation } };

  await sendOTP(email, otp);
  res.status(200).json({ message: "OTP sent to doctor email" });
}catch (err) {
    res.status(500).json({ message: "Server error" });
  } 
});

// === Patient Signup ===
router.post("/signup/patient", async (req, res) => {
  const { name, email, phone, gender, dob, password,place, nation, state,district, taluka, city } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  otps[email] = { otp, data: { name, email, phone, gender, dob, password,place, nation, state,district, taluka, city } };

  await sendOTP(email, otp);
  res.status(200).json({ message: "OTP sent to patient email" });
});

// Helper to generate readable ID
const generateUniqueId = (name, dob, role) => {
  const namePrefix = name.slice(0, 2).toUpperCase();
  const dobYear = dob.slice(2, 4);
  const roleCode = role === "doctor" ? "DR" : "PT";
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${namePrefix}${dobYear}${roleCode}-${random}`;
};


// Helper to generate username
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

  // Generate a truly unique ID
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
    return res.status(500).json({ message: "Failed to generate unique ID, try again." });
  }

  const userData = { ...stored.data, isVerified: true, uniqueId };

  try {
    let username;
    if (type === "doctor") {
      username = await generateUniqueUsername(name, dob);
      const hashedPassword = await bcrypt.hash(stored.data.password, 10);
      const doctor = new Doctor({ ...userData, password: hashedPassword, username });
      await doctor.save();
    } else if (type === "patient") {
      const hashedPassword = await bcrypt.hash(stored.data.password, 10);
      const patient = new Patient({userData,  password: hashedPassword });
      await patient.save();
    }

    await sendUniqueID(email, uniqueId, username, type);
    console.log("✅ Unique ID email sent to:", email);

    delete otps[email];
    res.status(200).json({ message: "Verified successfully", uniqueId});
  } catch (err) {
    console.error("❌ Error saving user:", err);
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

    const query = {};
    query[method] = identifier;

    const doctor = await Doctor.findOne(query);

    if (!doctor) {
      return res.status(401).json({ message: "Doctor not found" });
    }

    if (!(await bcrypt.compare(password, doctor.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!doctor.isVerified) {
      return res.status(403).json({ message: "Account not verified" });
    }

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


router.post("/check-email", async (req, res) => {
  const { email } = req.body;
  const doctor = await Doctor.findOne({ email });
  res.json({ exists: !!doctor });
});




export default router;