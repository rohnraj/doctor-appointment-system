import pool from "../config/db.js";

// Check if time slot is available (Prevent overlapping)
export const isTimeSlotAvailable = async (doctorId, timeSlot) => {
  const query = `SELECT * FROM appointments WHERE doctor_id = $1 AND time_slot = $2`;
  const result = await pool.query(query, [doctorId, timeSlot]);
  return result.rowCount === 0; // True if slot is available
};

// Book an Appointment
export const bookAppointment = async (doctorId, userId, timeSlot, details, consultType, patientInfo, doctorLocation) => {
  const query = `
    INSERT INTO appointments (doctor_id, user_id, time_slot, details, consult_type, status, patient_info, location) 
    VALUES ($1, $2, $3, $4, $5, 'Confirmed', $6, $7) 
    RETURNING *;
  `;
  const values = [doctorId, userId, timeSlot, details, consultType, JSON.stringify(patientInfo), doctorLocation];
  const result = await pool.query(query, values);
  return result.rows[0];
};
