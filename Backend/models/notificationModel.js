import pool from "../config/db.js";

// Send Notification
export const sendNotification = async (userId, message) => {
  const query = `
    INSERT INTO notifications (user_id, message) 
    VALUES ($1, $2) 
    RETURNING *;
  `;
  const values = [userId, message];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Get Notifications for User
export const getNotificationsByUser = async (userId) => {
  const query = `SELECT * FROM notifications WHERE user_id = $1;`;
  const result = await pool.query(query, [userId]);
  return result.rows;
};
