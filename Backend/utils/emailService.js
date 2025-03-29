import nodemailer from "nodemailer";
import pool from "../config/db.js";

// Get user email from DB
const getUserEmail = async (userId) => {
  const query = `SELECT email FROM users WHERE id = $1`;
  const result = await pool.query(query, [userId]);
  return result.rows[0]?.email;
};

// Send Appointment Confirmation Email
export const sendAppointmentEmail = async (consult_type, user_id, doctor_name, date, time, location, status) => {

  console.log(date,time)
  const userEmail = await getUserEmail(user_id);
  if (!userEmail) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.emailID,
      pass: process.env.mail_password,
    },
  });
  

  const emailContent = status === "Denied"
    ? `Your appointment with Dr. ${doctor_name} is denied on ${date} at ${time}.`
    : consult_type === "online"
    ? `Your online appointment with Dr. ${doctor_name} is confirmed on ${date} at ${time}.`
    : `Your in-person appointment with Dr. ${doctor_name} at ${location} is confirmed on ${date} at ${time}.`;

  

  const mailOptions = {
    from: process.env.emailID,
    to: userEmail,
    subject: "Appointment Confirmation",
    text: emailContent,
  };

  await transporter.sendMail(mailOptions);
};
