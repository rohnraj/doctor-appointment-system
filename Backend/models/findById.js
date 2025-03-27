
import pool from '../config/db.js'

export const findById = async (id) =>{
    const queryCmd = 'SELECT * FROM users WHERE id=$1'
    const values=[id]
    
    try{
        const result = await pool.query(queryCmd,values)
        return result.rows[0]
    }
    catch(err){
        console.log('query to get user by ID is not working')
    }
}