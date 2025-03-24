import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import "./config/passport.js"; // Google OAuth configuration
import authRoutes from "./routes/authRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import { authenticateJWT } from "./middlewares/authMiddleware.js";
import reviewRoutes from "./routes/reviewRoutes.js"
import cookieParser from "cookie-parser";
import * as multer from 'multer';
// import * as upload from 'express-fileupload';

dotenv.config();

const app = express();


// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000" ,  'http://localhost:3002'], // Allow requests from frontend
    credentials: true, // Allow cookies and authentication headers
  })
);

app.use(cookieParser())

app.use(express.json());

// Session for Passport.js -- sign it with google 
app.use(
  session({
    secret: process.env.SESSION_SECRET || "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);


app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", authenticateJWT, appointmentRoutes);
app.use("/api/reviews", reviewRoutes); 

// Default Route
app.get("/", (req, res) => {
  res.send("Doctor Appointment Backend is Running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
