import pool from "../config/db.js";
import bcrypt from "bcrypt";

// Check if user exists by email
export const getUserByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1`;
  const result = await pool.query(query, [email]);
  return result.rows[0];
};

// Create a new user with role as the first argument
export const createUser = async (role = "patient", name, phone, email, password, googleId = null) => {

  console.log('---->',`role: ${role}`, `name: ${name}`, `phone: ${phone}`, `email: ${email}`, `password ${password}`, `googleid: ${googleId}`)
  const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
  try{

    const query = `
      INSERT INTO users (role, name, phone, email, password, google_id) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id, role, name, phone, email;
    `;
  
    const values = [role, name, phone, email, hashedPassword, googleId];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
  catch(err){
    console.log(`somthing went wrong in createUser() method: ${err}`)
  }
};


export const getAllUserModel = async () =>{
  const query = `SELECT * FROM users`;
  const result = await pool.query(query);
  return result.rows.length-1;
}

export const userExistWithGoogleID = async (google_id) =>{
  const query = 'SELECT * FROM users WHERE google_id=$1';
  try{

    const response = await pool.query(query, [google_id])
    return response.rows;
  }catch(err){
    console.log(`Error with finding user with google ID: ${err}`)
  }
}