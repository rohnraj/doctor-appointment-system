
import jwt from "jsonwebtoken";
import { findById } from "../models/findById.js";


export const userController = async (req, res) =>{
    console.log(req.cookies)
    const token = req.cookies.token; // Get token from cookies
    if (!token) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded)

    console.log("user ID: "+ decoded.id)  
    const id = decoded.id

    if (!id) {
        return res.status(400).json({ message: "Invalid token: ID not found" });
    }
    
    try{
        const user = await findById(id)
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
}