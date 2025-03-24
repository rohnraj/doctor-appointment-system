import express from "express";
import { addReviewController, getReviewsByDoctorController } from "../controllers/reviewController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js"; // Ensure user is authenticated


const router = express.Router();

// Route to add a review (Protected)
router.post("/add", authenticateJWT, addReviewController);

// Route to get reviews for a specific doctor
router.get("/doctor/:doctorId", getReviewsByDoctorController);

export default router;
