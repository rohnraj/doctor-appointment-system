import pool from "../config/db.js";


export const isTimeSlotAvailable = async (appointment_dates, appointment_time) => {

  try{

    const query = `SELECT COUNT(*) FROM appointments WHERE appointments_dates = $1 AND appointments_time = $2 AND status = 'Approved'`;
    const result = await pool.query(query, [appointment_dates, appointment_time]);
    console.log(result.rows[0].count === '0')
    return result.rows[0].count === '0'; // Returns true if no pending appointment exists
  }
  catch(err){
    console.log('isTimeSlotAvailable query not working err: '+ err)
  }
};

// Book an Appointment
export const bookAppointment = async (doctor_id, user_id, consult_type, location ,appointment_dates, appointment_time, user_info, status='Pending') => {

  try{
    const query = `
      INSERT INTO appointments (doctor_id, user_id, consult_type, status, location, appointments_dates, appointments_time, user_info) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
      RETURNING *;
    `;
    const values = [doctor_id, user_id, consult_type, status, location, appointment_dates, appointment_time, JSON.stringify(user_info)];
    const result = await pool.query(query, values);
    console.log('bookAppointment query working properly')
    return result.rows[0];
  }
  catch(err){
    console.log('bookAppointment query not working err: '+ err)
  }
};

export const getBookedSlots = async () =>{
  try{
    const query = `SELECT * FROM appointments`;
    const result = await pool.query(query);
    console.log('result rows '+ result.rows)
    return result.rows;
  }
  catch(err){
    console.log('getBookedSlots query not working err: '+ err)
  }
}

export const approveSlot = async (id) =>{
  try{
    const query = `UPDATE appointments SET status = 'Approved' WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    console.log('result rows '+ result.rows)
    return result.rows;
  }
  catch(err){
    console.log('approveSlot query not working err: '+ err)
  }
}

export const rejectSlot = async (id) =>{
  try{
    const query = `UPDATE appointments SET status = 'Denied' WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);
    console.log('result rows '+ result.rows)
    return result.rows;
  }
  catch(err){
    console.log('rejectSlot query not working err: '+ err)
  }
}
