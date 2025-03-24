import pool from "../config/db.js";

// Create Reviews Table (Run once)
// const createReviewTable = async () => {
//   const query = `
//     CREATE TABLE IF NOT EXISTS reviews (
//       id SERIAL PRIMARY KEY,
//       patient_id INT REFERENCES users(id) ON DELETE CASCADE,
//       doctor_id INT REFERENCES doctors(id) ON DELETE CASCADE,
//       appointment_id INT UNIQUE REFERENCES appointments(id) ON DELETE CASCADE,
//       rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
//       review TEXT NOT NULL,
//       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//     );
//   `;
//   await pool.query(query);
// };

// createReviewTable();

// Add a Review
export const addReview = async (patientId, doctorId, appointmentId, rating, review) => {
  // Ensure the appointment exists and is completed
  const checkQuery = `SELECT * FROM appointments WHERE id = $1 AND status = 'completed'`;
  const checkResult = await pool.query(checkQuery, [appointmentId]);

  if (checkResult.rows.length === 0) {
    throw new Error("Appointment must be completed before leaving a review.");
  }

  // Ensure the patient hasn't already reviewed this appointment
  const existingReviewQuery = `SELECT * FROM reviews WHERE appointment_id = $1`;
  const existingReview = await pool.query(existingReviewQuery, [appointmentId]);

  if (existingReview.rows.length > 0) {
    throw new Error("You have already reviewed this appointment.");
  }

  // Insert the review
  const query = `
    INSERT INTO reviews (patient_id, doctor_id, appointment_id, rating, review) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *;
  `;
  const values = [patientId, doctorId, appointmentId, rating, review];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get Reviews for a Doctor
export const getReviewsByDoctor = async (doctorId) => {
  const query = `SELECT * FROM reviews WHERE doctor_id = $1 ORDER BY created_at DESC;`;
  const result = await pool.query(query, [doctorId]);
  return result.rows;
};
