import express from "express";
import { getTopDoctorsController, searchDoctorsController, getDoctorProfileController, createDoctorController, getAllDoctorsController, deleteDoctorController, getAvailableSlotController, updateDoctorController} from "../controllers/doctorController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

import multer from 'multer';
import storage from '../config/cloudinary.js';

const upload = multer({ storage });


const router = express.Router();

router.get('/getAllDoc', getAllDoctorsController)
router.post("/create", authenticateJWT, upload.single('photo'), createDoctorController);
router.delete('/deleteDoc/:id', authenticateJWT, deleteDoctorController)
router.get("/top", getTopDoctorsController); // Fetch top 6 doctors
router.get("/search", searchDoctorsController); // Search doctors
router.get("/:id", getDoctorProfileController); // Fetch doctor details by ID
router.patch('/:id', authenticateJWT, updateDoctorController)
router.get("/Appointments/:id/slotAvailable", getAvailableSlotController)

export default router;
