import express from "express";
import { getTopDoctorsController, searchDoctorsController, getDoctorProfileController, createDoctorController, getAllDoctorsController, deleteDoctorController, getAvailableSlotController } from "../controllers/doctorController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";
// import { isAdmin } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/getAllDoc', getAllDoctorsController)
router.post("/create", authenticateJWT, createDoctorController);
router.delete('/deleteDoc/:id', authenticateJWT, deleteDoctorController)
router.get("/top", getTopDoctorsController); // Fetch top 6 doctors
router.get("/search", searchDoctorsController); // Search doctors
router.get("/:id", getDoctorProfileController); // Fetch doctor details by ID
router.get("/Appointments/:id/slotAvailable", getAvailableSlotController)

export default router;
