import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

export const createDoctor = async (userId, name, photo, specialty, experience, degree, location, availableTimes, availableDate, gender) => {
  if (!userId) userId = uuidv4(); // Generate UUID if missing

  // console.log(typeof availableTimes)
  const availableDates = availableDate.split(',')
  console.log(availableDates)
  const query = `
    INSERT INTO doctors (user_id, name, photo, specialty, experience, degree, location, available_times, available_dates, gender, rating) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 0) 
    RETURNING *;
  `;
  const values = [userId, name, photo, specialty, experience, degree, location, availableTimes, availableDates, gender];

  const result = await pool.query(query, values);
  return result.rows[0];
};


// Fetch Top 6 Doctors by Rating
export const getTopDoctors = async (page, rating, experience, gender) => {
  let query = `SELECT * FROM doctors WHERE 1=1`; 
  const values = [];
  let index = 1;

  // Filter by rating
  if (Number(rating)) {
    query += ` AND rating = $${index}`;
    values.push(Number(rating));
    index++;
  }

  // Filter by experience
  if (experience) {
    switch (experience) {
      case '15+':
        query += ` AND experience >= $${index}`;
        values.push(15);
        index++;
        break;
      case '10-15':
        query += ` AND experience BETWEEN $${index} AND $${index + 1}`;
        values.push(10);
        values.push(14);
        index += 2;
        break;
      case '5-10':
        query += ` AND experience BETWEEN $${index} AND $${index + 1}`;
        values.push(5);
        values.push(9);
        index += 2;
        break;
      case '3-5':
        query += ` AND experience BETWEEN $${index} AND $${index + 1}`;
        values.push(3);
        values.push(4);
        index += 2;
        break;
      case '1-3':
        query += ` AND experience BETWEEN $${index} AND $${index + 1}`;
        values.push(1);
        values.push(3);
        index += 2;
        break;
      case '0-1':
        query += ` AND experience BETWEEN $${index} AND $${index + 1}`;
        values.push(0);
        values.push(1);
        index += 2;
        break;
      default:
        break;
    }
  }

  // Filter by gender
  if (Number(gender)) {
    const genderValue = Number(gender) === 1 ? 'male' : 'female';
    query += ` AND gender = $${index}`;
    values.push(genderValue);
    index++;
  }

  // Pagination - fix offset calculation
  if(page) {
    query += ` ORDER BY rating DESC LIMIT 6 OFFSET ($${index++})`;
    values.push((page - 1) * 6);
  }
    

  // Execute the query

  try {

    console.log("Final Query:", query);
    console.log("Values:", values);

    const result = await pool.query(query, values);
    // console.log(result.rows);
    return result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
    throw error;
  }

};


// Search Doctors with Filters
export const searchDoctors = async ({ search, page = 1, limit = 10 }) => {
  let query = `SELECT * FROM doctors WHERE 1=1`;
  const values = [];
  let index = 1;

  // if (name) {
  //   query += ` AND LOWER(name) LIKE LOWER($${index++})`;
  //   values.push(`%${name}%`);
  // }
  // if (specialty) {
  //   query += ` AND LOWER(specialty) LIKE LOWER($${index++})`;
  //   values.push(`%${specialty}%`);
  // }
  if (search) {
      query += ` AND LOWER(name) LIKE LOWER($${index})
                  OR LOWER(specialty) LIKE LOWER($${index})
                  OR LOWER(degree) LIKE LOWER($${index})`;
      values.push(`%${search}%`);
      index++
    }
  // if (experience) {
  //   query += ` AND experience >= $${index++}`;
  //   values.push(experience);
  // }
  // if (rating) {
  //   query += ` AND rating >= $${index++}`;
  //   values.push(rating);
  // }
  // if (degree) {
  //   query += ` AND LOWER(degree) LIKE LOWER($${index++})`;
  //   values.push(`%${degree}%`);
  // }

  query += ` ORDER BY rating DESC LIMIT $${index++} OFFSET $${index++}`;
  values.push(limit, (page - 1) * limit);

  const result = await pool.query(query, values);
  return result.rows;
};

// Get Doctor by ID
export const getDoctorById = async (id) => {
  const query = `SELECT * FROM doctors WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};


//getAllDoc
export const getAllDoctorsModel = async() =>{
  const query = `SELECT * FROM doctors;`;
  const data = await pool.query(query);
  return data.rows.length;
}

//deleteDoc
export const deleteDoctorById = async(id) =>{
  const query = `DELETE FROM doctors WHERE id = $1;`;
  const data = await pool.query(query,[id]);
  return data.rows.length;
}

//getting Availabe slot
export const availableSlotModel = async(id) =>{
  const query = `SELECT available_times FROM doctors WHERE id = $1;`;
  const data = await pool.query(query, [id]);
  return data.rows[0].available_times;
}

export const updateDoctorslot = async(id, availableTimes) =>{
  try{

    const query = `UPDATE doctors SET available_times = $1 WHERE id = $2;`;
    const data = await pool.query(query, [availableTimes, id]);
    return data.rows[0];
  }
  catch(err){
    console.log('some error in query to update doctor slot')
  }
}
