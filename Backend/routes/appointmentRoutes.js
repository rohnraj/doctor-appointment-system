import express from "express";
import { bookAppointmentController, bookedSlotController } from "../controllers/appointmentController.js";

const router = express.Router();

router.put("/book", bookAppointmentController); // Book an appointment
router.get('/bookedslot', bookedSlotController)

export default router;
