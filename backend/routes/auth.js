import express from "express";
import { sendOTP, sendUniqueID } from "../utils/sendOtp.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import slugify from "slugify";
import bcrypt from "bcrypt";

const router = express.Router();
const otps = {}; // In-memory OTP store

// === Doctor Signup ===
router.post("/signup/doctor", async (req, res) => {
  const email = req.body.email.toLowerCase();

  try {
    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otps[email] = { otp, data: { ...req.body, email, type: "doctor" } };
    // console.log("OTP stored:", otps[email]);

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent to doctor email" });
  } catch (err) {
    console.error("Doctor signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// === Patient Signup ===
router.post("/signup/patient", async (req, res) => {
  //  photo: "",  fullName: "",email: "",username: "",  password: "",  confirmPassword: "",  otp: "",
  const email = req.body.email.toLowerCase();

  try {
    const existing = await Patient.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);
    otps[email] = { otp, data: { ...req.body, email, type: "patient" } };
    // console.log("OTP stored:", otps[email]);

    await sendOTP(email, otp);
    res.status(200).json({ message: "OTP sent to patient email" });
  } catch (err) {
    console.error("Patient signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// === Generate Unique ID ===
const generateUniqueId = (name, dob, role) => {
  const namePrefix = name?.slice(0, 2).toUpperCase();
  const dobYear = dob?.slice(2, 4);
  const roleCode = role === "doctor" ? "DR" : "PT";
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${namePrefix}${dobYear}${roleCode}-${random}`;
};

// === Username Generator (Doctor Only) ===
const generateUniqueUsername = async (name, dob) => {
  const base = slugify(
    `dr.${name.split(" ")[0]}${dob.replace(/-/g, "").slice(2)}`,
    {
      lower: true,
      strict: true,
    }
  );

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
  const email = req.body.email.toLowerCase();
  const { otp } = req.body;
  const stored = otps[email];
  // console.log("Stored OTP:", stored);

  if (!stored || stored.otp != otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const { fullName, dob, type } = stored.data;

  // Generate Unique ID
  let uniqueId;
  let isUnique = false;
  for (let i = 0; i < 5 && !isUnique; i++) {
    const tempId = generateUniqueId(fullName, dob, type);
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
      email,
      password: hashedPassword,
      isVerified: true,
      uniqueId,
    };

    if (type === "doctor") {
      const username = await generateUniqueUsername(fullName, dob);
      const doctor = new Doctor({ ...userData, username });
      await doctor.save();
      console.log("Doctor saved:", doctor);
      await sendUniqueID(email, uniqueId, username, "doctor");
    } else {
      const patient = new Patient({ ...userData });
      console.log("Patient saved:", patient);
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

// === Login Routes (Doctor + Patient) ===
router.post("/login/doctor", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const doctor = await Doctor.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier },
        { uniqueId: identifier },
      ],
    });

    if (!doctor) return res.status(401).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    if (!doctor.isVerified)
      return res.status(403).json({ message: "Account not verified" });

    res.status(200).json({
      message: "Login successful",
      doctor: {
        fullName: doctor.fullName,
        uniqueId: doctor.uniqueId,
        email: doctor.email,
        gender: doctor.gender,
        specialization: doctor.specialization,
        experience: doctor.experience,
        degree: doctor.degree,
        dob: doctor.dob,
        place: doctor.place,
        city: doctor.city,
        taluka: doctor.taluka,
        district: doctor.district,
        state: doctor.state,
        nation: doctor.nation,
        photo: doctor.photo,
        isVerified: doctor.isVerified,
      },
    });
  } catch (err) {
    console.error("Doctor login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login/patient", async (req, res) => {
  const { identifier, password } = req.body;

  try {
    const patient = await Patient.findOne({
      $or: [
        { email: identifier.toLowerCase() },
        { username: identifier },
        { uniqueId: identifier },
      ],
    });

    if (!patient) return res.status(401).json({ message: "Patient not found" });

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });
    if (!patient.isVerified)
      return res.status(403).json({ message: "Account not verified" });

    res.status(200).json({
      message: "Login successful",
      patient: {
        _id: patient._id,
        fullName: patient.fullName,
        username: patient.username,
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
        photo: patient.photo,
      },
    });
  } catch (err) {
    console.error("Patient login error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// === Email & Username Checks ===
router.post("/check-email", async (req, res) => {
  const email = req.body.email.toLowerCase();
  const { type } = req.body;

  try {
    let exists = false;
    if (type === "doctor") exists = !!(await Doctor.findOne({ email }));
    if (type === "patient") exists = !!(await Patient.findOne({ email }));

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
  if (!search)
    return res.status(400).json({ message: "Search query is required" });

  try {
    const doctors = await Doctor.find({
      fullName: { $regex: search, $options: "i" },
    }).limit(10);

    const result = doctors.map((doc) => ({
      _id: doc._id,
      fullName: doc.fullName,
      email: doc.email,
      experience: doc.experience,
      specialization: doc.specialization,
      uniqueId: doc.uniqueId,
      photo: doc.photo,
      place: `${doc.place}, ${doc.city}, ${doc.district}, ${doc.state}, ${doc.nation}`,
      degree: doc.degree,
      isVerified: doc.isVerified,
    }));

    res.status(200).json(result);
  } catch (err) {
    console.error("Doctor search error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
