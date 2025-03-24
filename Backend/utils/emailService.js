import nodemailer from "nodemailer";
import pool from "../config/db.js";

// Get user email from DB
const getUserEmail = async (userId) => {
  const query = `SELECT email FROM users WHERE id = $1`;
  const result = await pool.query(query, [userId]);
  return result.rows[0]?.email;
};

// Send Appointment Confirmation Email
export const sendAppointmentEmail = async (userId, doctor, appointment) => {
  const userEmail = await getUserEmail(userId);
  if (!userEmail) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-email-password",
    },
  });

  const emailContent = appointment.consultType === "online"
    ? `Your online appointment with Dr. ${doctor.name} is confirmed for ${appointment.timeSlot}.`
    : `Your in-person appointment with Dr. ${doctor.name} at ${doctor.location} is confirmed for ${appointment.timeSlot}.`;

  const mailOptions = {
    from: "your-email@gmail.com",
    to: userEmail,
    subject: "Appointment Confirmation",
    text: emailContent,
  };

  await transporter.sendMail(mailOptions);
};
