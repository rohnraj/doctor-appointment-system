import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { authenticateJWT } from "./middlewares/authMiddleware.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js"
import passport from './config/passport.js';

dotenv.config();

const app = express();


// Middleware
app.use(
  cors({
    origin: ["https://doctor-appointment-system-q8td.vercel.app", 
      "https://doctor-appointment-system-ingv.vercel.app/", 
      "http://localhost:3000" ,  
      'http://localhost:3002', 
      'http://localhost:3001'
    ], // Allow requests from frontend
    credentials: true, // Allow cookies and authentication headers
  })
);
app.use(passport.initialize());
app.use(cookieParser())

app.use(express.json());


// Routes

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", authenticateJWT, appointmentRoutes);
app.use("/api/user", userRoutes) 

// Default Route
app.get("/", (req, res) => {
  res.send("Doctor Appointment Backend is Running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
