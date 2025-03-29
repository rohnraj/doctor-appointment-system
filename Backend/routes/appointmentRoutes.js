import express from "express";
import { bookAppointmentController, bookedSlotController, approveSlotController, rejectSlotController } from "../controllers/appointmentController.js";

const router = express.Router();

router.put("/book", bookAppointmentController); // Book an appointment
router.get('/bookedslot', bookedSlotController)
// router.get('/isSlotAvailable', isSlotAvailableController)
router.patch('/approveSlot', approveSlotController)
router.patch('/rejectSlot', rejectSlotController)
export default router;
