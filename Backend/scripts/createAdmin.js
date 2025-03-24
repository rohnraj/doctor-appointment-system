import pool from "../config/db.js"; // Ensure correct DB connection
import bcrypt from "bcrypt";

const createAdmin = async () => {
  try {
    const name = "admin";
    const email = "admin@example.com";
    const role = "admin";
    const password = await bcrypt.hash("Admin@123", 10); // Hash the password

    const query = `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *`;
    const values = [name, email, password, role];

    const result = await pool.query(query, values);
    console.log("Admin created successfully:", result.rows[0]);
  } catch (error) {
    console.error("Error creating admin:", error.message);
  } finally {
    pool.end(); // Close DB connection
  }
};

// Run the function
createAdmin();
