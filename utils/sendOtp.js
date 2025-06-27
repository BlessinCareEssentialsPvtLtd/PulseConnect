import nodemailer from "nodemailer";

export async function sendOTP(email, otp) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Pulse Connect" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP for Verification",
    html: `<h2>Your OTP is: ${otp}</h2>`,
  };

  await transporter.sendMail(mailOptions);
}

export const sendUniqueID = async (email, uniqueId, username, userType) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,    // use App Password, not actual password
    },
  });

  const mailOptions = {
    from: "Pulse Connect <your-email@gmail.com>",
    to: email,
    subject: `${userType} Registration Successful – Your Unique ID`,
    html: `
      <h2>Welcome to Pulse Connect</h2>
      <p>Your account has been verified successfully.</p>
      <p><strong>Your Unique ${userType === "doctor" ? "Doctor" : "Patient"} ID:</strong> ${uniqueId}</p>
      <p><strong>Username:</strong> ${username}</p>
      <p>Please use this ID to log in to your account.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
