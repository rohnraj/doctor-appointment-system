import express from "express";
import { bookAppointmentController } from "../controllers/appointmentController.js";

const router = express.Router();

router.put("/book", bookAppointmentController); // Book an appointment

export default router;
